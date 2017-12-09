from cassandra.cluster import Cluster
from cassandra.encoder import Encoder
from cassandra.cluster import Cluster
from cassandra.encoder import Encoder
from cassandra.query import dict_factory, ordered_dict_factory
from datetime import datetime
import sys
import random
import time


class DatePipe:
    def __init__(self):
        cluster = Cluster()
        self.session = cluster.connect('graphql')
        self.session.row_factory = dict_factory
        self.encoder = Encoder()

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


    def set_dates(self,check):
        CQLstring = "SELECT * FROM tag;"
        data = list(self.session.execute(CQLstring))

        if check:
            for tag in data:
                rndDate = self.encoder.cql_encode_datetime(self.randomDate("1/1/2010 1:30 PM", "11/30/2017 4:50 AM", random.random()))
                insert_tag = "UPDATE tag SET created={}, modified={} WHERE body = {} AND tagId = {} AND questionId = {} AND userId={};".format(rndDate, rndDate, self.encoder.cql_encode_all_types(tag['body']), tag['tagid'], tag['userid'], tag['questionid'])
                self.session.execute(insert_tag)

        else:
            for tag in data:
                if not tag['created']:
                    rndDate = self.encoder.cql_encode_datetime(self.randomDate("1/1/2010 1:30 PM", "11/30/2017 4:50 AM", random.random()))
                    insert_tag = "UPDATE tag SET created={}, modified={} WHERE body = {} AND tagId = {} AND questionId = {} AND userId={};".format(rndDate, rndDate, self.encoder.cql_encode_all_types(tag['body']), tag['tagid'], tag['userid'], tag['questionid'])
                    self.session.execute(insert_tag)

        return self

    def check_set(self):
        self.set_dates(True)


SetDate = DatePipe()
SetDate.set_dates(False).check_set()
