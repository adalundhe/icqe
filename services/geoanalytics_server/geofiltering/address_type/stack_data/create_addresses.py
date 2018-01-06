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
import os


class CreateAddresses:
    def __init__(self):
        cluster = Cluster()
        self.session = cluster.connect('graphql')
        self.session.row_factory = dict_factory
        self.encoder = Encoder()
        self.tokenizer = Tokenizer()

    def load_data_file(self, limit):
        data = []

        with open('address_data.csv','r') as address_data:
            count = 0
            for line in address_data:
                line = line.split(",")

                if count >= limit:
                    break

                if count > 0:
                    line = [item.strip('"') for item in line]
                    data.append({'city': line[3], 'state': line[4], 'zip': line[0]})

                count += 1

            return data

    def seed_address_db(self):
        CQLstring = "SELECT * FROM question;"
        CQLUSERstring = "SELECT * FROM user;"
        questions = list(self.session.execute(CQLstring))

        unique_users = list(set([question['userid'].urn[9:] for question in questions]))
        addresses = self.load_data_file(len(unique_users))

        print("GOT",len(addresses))

        for i, address in enumerate(addresses):
            address['userid'] = unique_users[i]

        return addresses

    def insert_to_db(self):
        addresses = self.seed_address_db()

        for address in addresses:
            address_id = uuid.uuid4()
            CQLstring = "INSERT INTO address (addressid, userid, city, state, zip) VALUES ({}, {}, {}, {}, {});".format(address_id, address['userid'], self.encoder.cql_encode_all_types(address['city']), self.encoder.cql_encode_all_types(address['state']), self.encoder.cql_encode_all_types(address['zip']))
            self.session.execute(CQLstring)

addressSeeder = CreateAddresses()
addressSeeder.insert_to_db()
