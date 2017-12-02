import numpy as np
from cassandra.cluster import Cluster
from cassandra.encoder import Encoder
from cassandra.query import dict_factory, ordered_dict_factory
from scipy import sparse
import collections
import uuid

class UserTagMtx:
    def __init__(self,buildDB):
        cluster = Cluster()
        self.session = cluster.connect('graphql')
        self.session.row_factory = dict_factory
        self.encoder = Encoder()

        if buildDB == "build":
            tags = list(self.session.execute("""SELECT * FROM usertags"""))
            self.refs, self.tags, self.users = self.init_data(tags)
            self.save_to_db()

        elif buildDB == "load":
            state = self.session.execute("""SELECT * FROM usertagmtx""")
            self.refs, self.tags = self.load_state(state)


    def init_data(self, data):
        users, all_tags, all_ref = {}, [], {}
        for i,tag in enumerate(data):
            text = tag['body']
            try:
                users[tag['userid']].append(text)
            except:
                users[tag['userid']] = [text]

            all_tags.append(text)

        all_tags= np.unique(all_tags)
        for i,user in enumerate(users):
            search_array = np.asarray(users[user])
            all_ref[user] = {'row': i, 'cols': all_tags.searchsorted(search_array), 'tags': users[user]}

        all_users = np.unique(list(users.keys()))
        return all_ref, all_tags, all_users


    def load_state(self, data):
        all_ref, all_tags = {}, []

        for user in data:
            user['cols'], user['tags'] = list(user['cols']), list(user['tags'])
            all_ref[user['userid']] = {'row': user['row'], 'cols': np.asarray(user['cols']), 'tags': np.asarray(user['tags'])}
            all_tags += user['tags']

        return all_ref, np.unique(all_tags)


    def construct_mtx(self):
        user_tag_mtx = np.ndarray(shape=(len(self.refs), self.tags.size))
        for i,user in enumerate(self.refs):
            user_tag_mtx[i, self.refs[user]['cols']] = np.ones(self.refs[user]['cols'].size)
        print(user_tag_mtx.shape)
        return sparse.csr_matrix(user_tag_mtx)

    def save_to_db(self):
        for user in self.refs:
            insert_tag = "INSERT INTO usertagmtx (userid, row, cols, tags) VALUES ({}, {}, {}, {})".format(user, self.refs[user]['row'], self.encoder.cql_encode_set_collection(self.refs[user]['cols']),  self.encoder.cql_encode_set_collection(self.refs[user]['tags']))
            self.session.execute(insert_tag)
        return
