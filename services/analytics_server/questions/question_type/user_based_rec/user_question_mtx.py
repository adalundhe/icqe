import numpy as np
from cassandra.cluster import Cluster
from cassandra.encoder import Encoder
from cassandra.query import dict_factory, ordered_dict_factory
from scipy import sparse
import collections
import uuid

class UserQuestionMtx:
    def __init__(self,buildDB):
        cluster = Cluster()
        self.session = cluster.connect('graphql')
        self.session.row_factory = dict_factory
        self.encoder = Encoder()

        if buildDB == "build":
            questions = list(self.session.execute("""SELECT * FROM userquestions"""))
            self.refs, self.questions, self.users = self.init_data(questions)
            self.save_to_db()

        elif buildDB == "load":
            state = self.session.execute("""SELECT * FROM userquestionmtx""")
            self.refs, self.questions = self.load_state(state)


    def init_data(self, data):
        users, all_questions, all_ref = {}, [], {}
        for i,question in enumerate(data):
            _id = question['questionid']
            try:
                users[question['userid']].append(_id)
            except:
                users[question['userid']] = [_id]

            all_questions.append(_id)

        all_questions= np.unique(all_questions)
        for i,user in enumerate(users):
            search_array = np.asarray(users[user])
            all_ref[user] = {'row': i, 'cols': all_questions.searchsorted(search_array), 'questions': users[user]}

        all_users = np.unique(list(users.keys()))
        return all_ref, all_questions, all_users


    def load_state(self, data):
        all_ref, all_questions = {}, []

        for user in data:
            user['cols'], user['questions'] = list(user['cols']), list(user['questions'])
            all_ref[user['userid']] = {'row': user['row'], 'cols': np.asarray(user['cols']), 'tags': np.asarray(user['questions'])}
            all_questions += user['questions']

        return all_ref, np.unique(all_questions)


    def construct_mtx(self):
        user_question_mtx = np.ndarray(shape=(len(self.refs), self.questions.size))
        for i,user in enumerate(self.refs):
            user_question_mtx[i, self.refs[user]['cols']] = np.ones(self.refs[user]['cols'].size)
        return sparse.csr_matrix(user_question_mtx)

    def save_to_db(self):
        for user in self.refs:
            insert_tag = "INSERT INTO userquestionmtx (userid, row, cols, questions) VALUES ({}, {}, {}, {})".format(user, self.refs[user]['row'], self.encoder.cql_encode_set_collection(self.refs[user]['cols']),  self.encoder.cql_encode_set_collection(self.refs[user]['questions']))
            self.session.execute(insert_tag)
        return
