from tags.tag_type.stack_data.tokenmaker import Tokenizer
from tags.tag_type.tag_funcs import TagFuncs as tf
from cassandra.query import dict_factory
from cassandra.util import datetime_from_timestamp
from datetime import timedelta, datetime
from dateutil import tz
import numpy as np
from cassandra.cluster import Cluster
from cassandra.encoder import Encoder
from cassandra.query import dict_factory, ordered_dict_factory
import collections
import uuid
from operator import itemgetter


class QueryAnalytics:
    def __init__(self):
        cluster = Cluster()
        self.session = cluster.connect('graphql')
        self.session.row_factory = dict_factory
        self.encoder = Encoder()
        self.tokenizer = Tokenizer()
        self.init_thresh = 0

    def parseQuery(self, query):
        return np.asarray(self.tokenizer.tokenize(query))

    def uniquify(self, tags):
        unique_tags = []
        results = []

        for tag in tags:
            if not tag['body'] in unique_tags:
                results.append(tag)
                unique_tags.append(tag['body'])

        print("UNIQUE",len(unique_tags))
        return results

    def append_to(self,tags,sort_by,counts, limit=None):
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

    def sortByDate(self, search_results, limit=None):
        from_zone = tz.tzutc()
        to_zone = tz.tzlocal()
        return sorted(search_results, key=lambda x: x['created'].replace(tzinfo=from_zone).astimezone(to_zone), reverse=True)[0:limit]

    def getSimilarUserTags(self, query, userId, limit):
        tokenized_query = self.parseQuery(query)
        searched = [tag for tag in tf.getTagsByUserId(userId) if tag['body'] in tokenized_query]
        sort_array = self.parseAndSort([tag['body'] for tag in searched], limit)
        return self.append_to(self.uniquify(user_tags), sort_array, counts, limit)

    def getTopUserTags(self, userId, limit):
        user_tags = tf.getTagsByUserId(userId)
        sort_array, counts, idx = self.parseAndSort([tag['body'] for tag in user_tags])
        return self.append_to(self.uniquify(user_tags), sort_array, counts, limit)

    def getTopLatestTags(self, userId, limit):
        user_tags = tf.getTagsByUserId(userId)
        sort_array, counts, idx = self.parseAndSort([tag['body'] for tag in user_tags])
        return self.sortByDate(self.append_to(user_tags, sort_array, counts, None), limit)[::-1]

    def getTopNewestTags(self, limit):
        date = self.encoder.cql_encode_datetime(datetime.now() - timedelta(days=7))
        newest_tags = tf.getTagsAfterDate(date)
        sort_array, counts,idx = self.parseAndSort([tag['body'] for tag in newest_tags])
        results = [tag for tag in newest_tags if tag['body'] in sort_array]
        return self.sortByDate(sorted(self.append_to(self.uniquify(results), sort_array, counts), key=lambda x: x['count'], reverse=True)[0:limit])[::-1]

    def getTopCommunityTags(self, limit):
        init_limit = self.init_thresh
        print("PASSING",init_limit,type(init_limit))
        all_tags = tf.getTopNTags(init_limit)
        query_limit = limit**2
        query_size = len(all_tags)
        while(query_size > query_limit):
            print("PASSING",init_limit,type(init_limit))
            init_limit += query_limit
            all_tags = tf.getTopNTags(init_limit)
            query_size = len(all_tags)
        return sorted(self.uniquify(all_tags), key=lambda x: x['count'], reverse=True)[0:limit]
