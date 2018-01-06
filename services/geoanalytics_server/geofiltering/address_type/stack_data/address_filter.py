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


class AddressFilter:
    def __init__(self):
        cluster = Cluster()
        self.session = cluster.connect('graphql')
        self.session.row_factory = dict_factory
        self.encoder = Encoder()
        self.tokenizer = Tokenizer()


    def delete_dup(self):
        CQLusers = "SELECT userid FROM question;"
        users = list(self.session.execute(CQLusers))

        CQLaddresses = "SELECT addressid FROM address;"
        addresses = [address['addressid'] for address in list(self.session.execute(CQLaddresses))]

        address_all = []
        for user in users:
            u_id = self.encoder.cql_encode_all_types(user['userid'])
            CQLuser = "SELECT * FROM address WHERE userid={} LIMIT 1 ALLOW FILTERING;".format(u_id)
            address_all += list(self.session.execute(CQLuser))



        uniq_addresses = list({a['userid']: {'addressid': a['addressid'], 'userid': a['userid'], 'city': a['city'], 'state': a['state'], 'zip': a['zip']} for a in address_all}.values())

        self.reload_to_db(uniq_addresses, addresses)



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


    def reload_to_db(self, addresses, all_addresses):

        for a in all_addresses:
            CQLdelete = "DELETE FROM address WHERE addressid = {};".format(a)
            self.session.execute(CQLdelete)

        for a in addresses:
            city = self.encoder.cql_encode_all_types(a['city'])
            state = self.encoder.cql_encode_all_types(a['state'])
            zip_code = self.encoder.cql_encode_all_types(a['zip'])

            CQLinsert = "INSERT INTO question (addressid, userid, city, state, zip) VALUES ({}, {}, {}, {}, {});".format(a['addressid'], a['userid'], city, state, zip_code)
            self.session.execute(CQLinsert)

addressFilter = AddressFilter()
addressFilter.delete_dup()
