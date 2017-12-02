from tags.tag_type.stack_data.tokenmaker import Tokenizer
from tags.tag_type.tag_funcs import TagFuncs as tf
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

class QueryAnalytics:
    def __init__(self):
        cluster = Cluster()
        self.session = cluster.connect('graphql')
        self.session.row_factory = dict_factory
        self.encoder = Encoder()
        self.tokenizer = Tokenizer()

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

        print("FINALLY",results)
        return results[0:limit]


    def parseAndSort(self, search_results):
        values, counts = np.unique(np.asarray(search_results), return_counts=True)

        idx = np.argsort(counts)[::-1]
        sorted_vals = values[idx]
        counts = counts[idx]
        return sorted_vals.tolist(), counts.tolist(), idx

    def sortByDate(self, search_results, limit):
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
        results = [tag for tag in user_tags if tag['body'] in sort_array]
        return self.sortByDate(results, limit)

    def getTopNewestTags(self, limit):
        newest_tags = tf.getAllTags()
        sort_array, counts,idx = self.parseAndSort([tag['body'] for tag in newest_tags])
        results = [tag for tag in user_tags if tag['body'] in sort_array]
        return self.sortByDate(self.uniquify(results), limit)
