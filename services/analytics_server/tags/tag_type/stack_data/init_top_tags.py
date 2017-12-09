from cassandra.query import dict_factory
from cassandra.util import datetime_from_timestamp
from dateutil import tz
import numpy as np
from cassandra.cluster import Cluster
from cassandra.encoder import Encoder
from cassandra.query import dict_factory, ordered_dict_factory
import collections
import uuid
from operator import itemgetter

class InitTopTags:
    def __init__(self):
        cluster = Cluster()
        self.session = cluster.connect('graphql')
        self.session.row_factory = dict_factory
        self.encoder = Encoder()

    def parseQuery(self, query):
        return np.asarray(self.tokenizer.tokenize(query))

    def uniquify(self, tags):
        unique_tags = []
        results = []

        for tag in tags:
            if not tag['body'] in unique_tags:
                results.append(tag)
                unique_tags.append(tag['body'])

        return results

    def append_to(self,tags,sort_by,counts, limit):
        results = []
        for idx, keyword in enumerate(sort_by):
            for tag in tags:
                if keyword == tag['body']:
                    tag['count'] = counts[idx]
                    results.append(tag)

        return results[0:limit]

    def getEachDate(self, tags, userId):
        results = []
        for tag in tags:
            count = 1
            encoded_body = self.encoder.cql_encode_all_types(tag['body'])
            found = tf.getTagsByUserIdAndBody(userId, encoded_body)

            for tag in found:
                tag['count'] = count
                count += 1

            results +=  found

        return results


    def parseAndSort(self, search_results):
        values, counts = np.unique(np.asarray(search_results), return_counts=True)

        idx = np.argsort(counts)[::-1]
        sorted_vals = values[idx]
        counts = counts[idx]
        return sorted_vals.tolist(), counts.tolist(), idx


    def getAllTags(self):
        return list(self.session.execute("SELECT * FROM tag;"))

    def calcInitThresh(self):
        results = self.getAllTags()
        sort_array, counts,idx = self.parseAndSort([tag['body'] for tag in results])
        results = sorted(self.append_to(self.uniquify([tag for tag in results if tag['body'] in sort_array]), sort_array, counts, None), key=lambda x: x['count'], reverse=True)[0:500]
        return results[len(results)-1]


    def seed_db(self):
        results = self.getAllTags()
        sort_array, counts,idx = self.parseAndSort([tag['body'] for tag in results])
        results = self.append_to(self.uniquify([tag for tag in results if tag['body'] in sort_array]), sort_array, counts, None)

        for tag in results:
            tag['body'] = self.encoder.cql_encode_all_types(tag['body'])
            tag['userid'] = self.encoder.cql_encode_all_types(tag['userid'])
            tag['tagid'] = self.encoder.cql_encode_all_types(tag['tagid'])
            tag['questionid'] = self.encoder.cql_encode_all_types(tag['questionid'])
            tag['created'] = self.encoder.cql_encode_all_types(tag['created'])
            tag['modified'] = self.encoder.cql_encode_all_types(tag['modified'])
            CQLstring = "INSERT INTO popular_tags (body, userid, tagid, questionid, created, modified, count) VALUES ({},{},{},{},{},{},{});".format(tag['body'], tag['userid'], tag['tagid'], tag['questionid'], tag['created'],  tag['modified'], tag['count'])
            self.session.execute(CQLstring)


class InitLatestTags:
    def __init__(self):
        cluster = Cluster()
        self.session = cluster.connect('graphql')
        self.session.row_factory = dict_factory
        self.encoder = Encoder()

    def parseQuery(self, query):
        return np.asarray(self.tokenizer.tokenize(query))

    def uniquify(self, tags):
        unique_tags = []
        results = []

        for tag in tags:
            if not tag['body'] in unique_tags:
                results.append(tag)
                unique_tags.append(tag['body'])

        print(len(unique_tags))
        return results

    def append_to(self,tags,sort_by,counts, limit):
        results = []
        for idx, keyword in enumerate(sort_by):
            for tag in tags:
                if keyword == tag['body']:
                    tag['count'] = counts[idx]
                    results.append(tag)

        return results[0:limit]

    def getEachDate(self, tags, userId):
        results = []
        for tag in tags:
            count = 1
            encoded_body = self.encoder.cql_encode_all_types(tag['body'])
            found = tf.getTagsByUserIdAndBody(userId, encoded_body)

            for tag in found:
                tag['count'] = count
                count += 1

            results +=  found

        return results


    def parseAndSort(self, search_results):
        values, counts = np.unique(np.asarray(search_results), return_counts=True)

        idx = np.argsort(counts)[::-1]
        sorted_vals = values[idx]
        counts = counts[idx]
        return sorted_vals.tolist(), counts.tolist(), idx


    def getAllTags(self):
        return list(self.session.execute("SELECT * FROM tag;"))


    def seed_db(self):
        results = self.getAllTags()
        sort_array, counts,idx = self.parseAndSort([tag['body'] for tag in results])
        results = self.append_to(self.uniquify([tag for tag in results if tag['body'] in sort_array]), sort_array, counts, None)

        for tag in results:
            tag['body'] = self.encoder.cql_encode_all_types(tag['body'])
            tag['userid'] = self.encoder.cql_encode_all_types(tag['userid'])
            tag['tagid'] = self.encoder.cql_encode_all_types(tag['tagid'])
            tag['questionid'] = self.encoder.cql_encode_all_types(tag['questionid'])
            tag['created'] = self.encoder.cql_encode_all_types(tag['created'])
            tag['modified'] = self.encoder.cql_encode_all_types(tag['modified'])
            CQLstring = "INSERT INTO latest_tags (body, userid, tagid, questionid, created, modified, count) VALUES ({},{},{},{},{},{},{});".format(tag['body'], tag['userid'], tag['tagid'], tag['questionid'], tag['created'],  tag['modified'], tag['count'])
            self.session.execute(CQLstring)
