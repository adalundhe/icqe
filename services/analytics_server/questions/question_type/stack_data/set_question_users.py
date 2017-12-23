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
from random import randint
import os


class SetQuestions:
    def __init__(self):
        cluster = Cluster()
        self.session = cluster.connect('graphql')
        self.session.row_factory = dict_factory
        self.encoder = Encoder()
        self.tokenizer = Tokenizer()

    def load_data_file(self):
        data = []

        with open('address_data.csv','r') as address_data:
            count = 0
            for line in address_data:
                line = line.split(",")

                if count > 0:
                    line = [item.strip('"') for item in line]
                    data.append({'city': line[3], 'state': line[4], 'zip': line[0]})

                count += 1

            return data

    def seed_questions_db(self):
        CQLstring = "SELECT * FROM tag;"
        CQLUSERstring = "SELECT * FROM user;"
        tags = list(self.session.execute(CQLstring))
        existing_users = [user['userid'].urn[9:] for user in list(self.session.execute(CQLUSERstring))]

        unique_users = list(set([tag['userid'].urn[9:] for tag in tags if tag['userid'] not in existing_users]))

        CQLQUESTIONstring = "SELECT * FROM question;"

        questions = list(self.session.execute(CQLQUESTIONstring))



        for question in questions:
            question['userid'] = unique_users[question['userid']]

        return questions

    def insert_to_db(self):
        questions = self.seed_questions_db()

        for question in questions:
            CQLstring = "INSERT INTO question (userid) VALUES ({}) WHERE questionid = {};".format(question['userid'], question['questionid'])
            self.session.execute(CQLstring)


questionSeeder = SetQuestions()
questionSeeder.insert_to_db()
