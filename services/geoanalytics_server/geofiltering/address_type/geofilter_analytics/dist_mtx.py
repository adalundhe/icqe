from geofiltering.address_type.address_funcs import AddressFuncs as af
from geofiltering.address_type.stack_data.tokenmaker import Tokenizer
from cassandra.query import dict_factory
from cassandra.util import datetime_from_timestamp
import numpy as np
from cassandra.cluster import Cluster
from cassandra.encoder import Encoder
from cassandra.query import dict_factory, ordered_dict_factory
import collections
import uuid
from operator import itemgetter
import googlemaps
import os

class DistanceMatrix:
    def __init__(self):
        cluster = Cluster()
        self.session = cluster.connect('graphql')
        self.session.row_factory = dict_factory
        self.encoder = Encoder()
        self.tokenizer = Tokenizer()
        self.init_thresh = 0
        self.gmclient = googlemaps.Client(key=os.environ['MAPS_KEY'])

    def address_str(self, user):
        return user['city'] + ", " + user['state'] + ", " + user['zip']

    def urn_uuid(self, item):
        item['userid'] = item['userid'].urn[9:]
        item['addressid'] = item['addressid'].urn[9:]

        return item

    def strdist_to_floatdist(self, items):
        results = []
        for item in items:
            if item['dist']['status'] != 'NOT_FOUND':
                self.urn_uuid(item)
                item['dist'] = float(item['dist']['distance']['text'][0:len(item['dist']['distance']['text'])-2])
                results.append(item)
        return results


    def nearestUsers(self,user_id):
        user_address = self.urn_uuid(af.getAddressByUserId(user_id))
        nearest_by_city = af.getAddressesByCity(self.encoder.cql_encode_all_types(user_address['city']))
        nearest_by_state = af.getAddressesByState(self.encoder.cql_encode_all_types(user_address['state']))
        nearest_by_zip = af.getAddressesByZip(self.encoder.cql_encode_all_types(user_address['zip']))



        all_found = nearest_by_city  + nearest_by_state + nearest_by_zip

        for address in all_found:
            address['dist'] = self.gmclient.distance_matrix(origins=self.address_str(user_address), destinations=self.address_str(address))['rows'][0]['elements'][0]



        all_found = self.strdist_to_floatdist(all_found)

        return sorted(all_found, key=lambda x: x['dist'])
