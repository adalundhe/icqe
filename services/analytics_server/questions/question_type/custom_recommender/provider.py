import numpy as np
from cassandra.cluster import Cluster
from cassandra.encoder import Encoder
from cassandra.query import dict_factory, ordered_dict_factory
import collections
import uuid


class Provider:
    def __init__(self,buildDB):
        cluster = Cluster()
        self.session = cluster.connect('graphql')
        self.session.row_factory = dict_factory
        self.encoder = Encoder()

        if buildDB == "build":
            tags = self.session.execute("""SELECT * FROM tag""")
            self.refs, self.questions, self.tags = self.init_data(tags)
            self.save_to_db()

        elif buildDB == "load":
            state = self.session.execute("""SELECT * FROM tagmtx""")
            self.refs, self.questions = self.load_state(state)


    def init_data(self, data):
        tags, all_questions, all_ref = {}, [], {}
        for i,tag in enumerate(data):
            _id = tag['questionid']
            try:
                tags[tag['body']].append(_id)
            except:
                tags[tag['body']] = [_id]

            all_questions.append(_id)

        all_questions = np.unique(all_questions)
        print("CREATING REFS.")
        for i,tag in enumerate(tags):
            search_array = np.asarray(tags[tag])
            all_ref[tag] = {'row': i, 'cols': all_questions.searchsorted(search_array), 'questions': tags[tag]}

        all_tags = np.unique(list(tags.keys()))
        print("DONE!")
        return all_ref, all_questions, all_tags


    def load_state(self, data):
        all_ref, all_questions = {}, []

        for tag in data:
            tag['cols'], tag['questions'] = list(tag['cols']), list(tag['questions'])
            all_ref[tag['body']] = {'row': tag['row'], 'cols': tag['cols'], 'ids': tag['questions']}
            all_questions += tag['questions']

        return all_ref, np.unique(all_questions)

    def construct_mtx(self):
        question_tag_mtx = np.ndarray(shape=(len(self.refs), self.questions.size))
        for i, tag in enumerate(self.refs):
            question_tag_mtx[i,self.refs[tag]['cols']] = np.ones(self.refs[tag]['cols'].size)
        return question_tag_mtx


    def save_to_db(self):
        print("SEEDING DB.")
        for tag in self.refs:
            insert_tag = "INSERT INTO tagmtx (body, row, cols, questions) VALUES ({}, {}, {}, {})".format(self.encoder.cql_encode_all_types(tag), self.refs[tag]['row'], self.encoder.cql_encode_set_collection(self.refs[tag]['cols']), self.encoder.cql_encode_set_collection(self.refs[tag]['questions']))
            self.session.execute(insert_tag)
        print("DONE!")
        return

    def get_questions(self, ids_array):
        questions = []
        for _id in ids_array:
            query = "SELECT * FROM question WHERE questionid={}".format(_id)
            try:
              questions.append(list(self.session.execute(query))[0])
            except:
              pass
        return questions
