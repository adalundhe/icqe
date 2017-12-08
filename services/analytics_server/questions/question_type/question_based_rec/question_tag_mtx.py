import numpy as np
from cassandra.cluster import Cluster
from cassandra.encoder import Encoder
from cassandra.query import dict_factory, ordered_dict_factory
from scipy import sparse
import collections
import uuid


class QuestionTagMtx:
    def __init__(self,buildDB):
        cluster = Cluster()
        self.session = cluster.connect('graphql')
        self.session.row_factory = dict_factory
        self.encoder = Encoder()

        if buildDB == "build":
            tags = self.session.execute("""SELECT * FROM usertags""")
            self.refs, self.questions, self.tags = self.init_data(tags)
            self.save_to_db()

        elif buildDB == "load":
            state = self.session.execute("""SELECT * FROM questiontagmtx""")
            self.refs, self.tags = self.load_state(state)


    def init_data(self, data):
        tags, all_tags, all_ref = {}, [], {}
        for i,tag in enumerate(data):
            text = tag['body']
            try:
                tags[tag['questionid']].append(text)
            except:
                tags[tag['questionid']] = [text]

            all_tags.append(text)

        all_tags = np.unique(all_tags)
        print("CREATING REFS.")
        for i,question in enumerate(tags):
            search_array = np.asarray(tags[question])
            all_ref[question] = {'row': i, 'cols': all_tags.searchsorted(search_array), 'tags': tags[question]}

        all_questions = np.unique(list(tags.keys()))
        print("DONE!")
        return all_ref, all_questions, all_tags


    def load_state(self, data):
        all_ref, all_tags = {}, []

        for question in data:
            question['cols'], question['tags'] = list(question['cols']), list(question['tags'])
            all_ref[question['questionid']] = {'row': question['row'], 'cols': np.asarray(question['cols']), 'tags': np.asarray(question['tags'])}
            all_tags += question['tags']

        return all_ref, np.unique(all_tags)

    def construct_mtx(self):
        question_tag_mtx = np.ndarray(shape=(len(self.refs), self.tags.size))
        for i, question in enumerate(self.refs):
            question_tag_mtx[i, self.refs[question]['cols']] = np.ones(self.refs[question]['cols'].size)

        return sparse.csr_matrix(question_tag_mtx)


    def save_to_db(self):
        for question in self.refs:
            insert_tag = "INSERT INTO questiontagmtx (questionid, row, cols, tags) VALUES ({}, {}, {}, {})".format(question, self.refs[question]['row'], self.encoder.cql_encode_set_collection(self.refs[question]['cols']), self.encoder.cql_encode_set_collection(self.refs[question]['tags']))
            self.session.execute(insert_tag)
        return

    def get_questions(self, ids_array):
        questions = []
        for _id in ids_array:
            query = "SELECT * FROM userquestions WHERE questionid={}".format(_id)
            try:
              questions.append(list(self.session.execute(query))[0])
            except:
              pass
        return questions
