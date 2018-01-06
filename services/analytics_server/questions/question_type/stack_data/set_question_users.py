from tokenmaker import Tokenizer
from cassandra.query import dict_factory
from cassandra.util import datetime_from_timestamp
import numpy as np
from cassandra.cluster import Cluster
from cassandra.encoder import Encoder
from cassandra.query import dict_factory, ordered_dict_factory
import collections
import uuid
from operator import itemgetter
from random import randint, shuffle, random
import os
from math import log
from datetime import datetime
import sys
import time


class SetQuestions:
    def __init__(self):
        cluster = Cluster()
        self.session = cluster.connect('graphql')
        self.session.row_factory = dict_factory
        self.encoder = Encoder()
        self.tokenizer = Tokenizer()

    def delete_id(self, _id):
        CQLselect = "SELECT * FROM question WHERE userid = {} ALLOW FILTERING;".format(_id)
        CQLselectall = "SELECT * FROM question;"
        same_id = list(self.session.execute(CQLselect))
        all_q = list(self.session.execute(CQLselectall))
        diff = [question for question in all_q if question['userid'].urn[9:] != _id]

        self.reload_to_db(diff)




    def seed_questions_db(self):
        CQLstring = "SELECT * FROM tag;"
        CQLQUESTIONstring = "SELECT * FROM question;"
        tags = list(self.session.execute(CQLstring))
        questions = list(self.session.execute(CQLQUESTIONstring))
        print("LOADED",len(tags),len(questions))

        recent = []
        min_range = int(log(len(questions)))
        max_range = 2**int(min_range)
        range_set = randint(min_range,max_range)
        tag_ids = [tag['userid'].urn[9:] for tag in tags]
        matches = np.unique(np.asarray(tag_ids))
        np.random.shuffle(matches)
        matches = matches.tolist()
        for question in questions:
            for i, _id in enumerate(matches):
                if question['questionid'].urn[9:] == _id and question['userid'] not in recent:
                    question['userid'] = _id

                    if len(recent) < range_set:
                        recent.append(_id)
                        del matches[i]
                    else:
                        recent = []
                        range_set = randint(min_range,max_range)
                        matches = np.unique(np.asarray(tag_ids))
                        np.random.shuffle(matches)
                        matches = matches.tolist()
                    break
                else:
                    continue

        print("BUILT LIBRARY:",len(questions))

        return questions


    def strTimeProp(self,start, end, format, prop):
        """Get a time at a proportion of a range of two formatted times.

        start and end should be strings specifying times formated in the
        given format (strftime-style), giving an interval [start, end].
        prop specifies how a proportion of the interval to be taken after
        start.  The returned time will be in the specified format.
        """

        stime = time.mktime(time.strptime(start, format))
        etime = time.mktime(time.strptime(end, format))

        ptime = stime + prop * (etime - stime)

        return datetime.strptime(time.strftime(format, time.localtime(ptime)), '%m/%d/%Y %I:%M %p')


    def randomDate(self,start, end, prop):
        return self.strTimeProp(start, end, '%m/%d/%Y %I:%M %p', prop)


    def insert_to_db(self):
        questions = self.seed_questions_db()
        for question in questions:
            rndDate = self.encoder.cql_encode_datetime(self.randomDate("1/1/2010 1:30 PM", "11/30/2017 4:50 AM", random()))

            CQLstring = "SELECT * FROM question WHERE questionid = {};".format(question['questionid'])
            q = list(self.session.execute(CQLstring))[0]

            answer_id = self.encoder.cql_encode_all_types(q['answerid'])
            body = self.encoder.cql_encode_all_types(q['body'])
            score = self.encoder.cql_encode_all_types(q['score'])
            url = self.encoder.cql_encode_all_types(q['url'])

            CQLdelete = "DELETE FROM question WHERE questionid = {};".format(question['questionid'])
            self.session.execute(CQLdelete)
            CQLinsert = "INSERT INTO question (questionid, userid, answerid, body, score, url, created, modified) VALUES ({}, {}, {}, {}, {}, {}, {}, {});".format(q['questionid'], question['userid'], answer_id, body, score, url, rndDate, rndDate)
            self.session.execute(CQLinsert)

    def reload_to_db(self, questions):
        print("QUESTIONS",questions[0])

        for q in questions:
            rndDate = self.encoder.cql_encode_datetime(self.randomDate("1/1/2010 1:30 PM", "11/30/2017 4:50 AM", random()))

            answer_id = self.encoder.cql_encode_all_types(q['answerid'])
            body = self.encoder.cql_encode_all_types(q['body'])
            score = self.encoder.cql_encode_all_types(q['score'])
            url = self.encoder.cql_encode_all_types(q['url'])

            CQLdelete = "DELETE FROM question WHERE questionid = {};".format(q['questionid'])
            self.session.execute(CQLdelete)
            CQLinsert = "INSERT INTO question (questionid, userid, answerid, body, score, url, created, modified) VALUES ({}, {}, {}, {}, {}, {}, {}, {});".format(q['questionid'], q['userid'], answer_id, body, score, url, rndDate, rndDate)
            self.session.execute(CQLinsert)


questionSeeder = SetQuestions()
questionSeeder.delete_id("1af6282a-562a-4a2d-83d0-4a3136041bef")
