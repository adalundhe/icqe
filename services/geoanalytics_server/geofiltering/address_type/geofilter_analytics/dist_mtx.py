from geofiltering.address_type.address_funcs import AddressFuncs as af
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

class DistanceMatrix:
    def __init__(self):
        self.session = cluster.connect('graphql')
        self.session.row_factory = dict_factory
        self.encoder = Encoder()
        self.tokenizer = Tokenizer()
        self.init_thresh = 0
        self.gmclient = googlemaps.Client(key=os.environ['MAPS_KEY'])

    def address_str(self, user):
        return user['city'] + ", " + user['state'] + ", " + user['zip']


    def nearestUsers(self,user_id):
        user_address = af.getAddressByUserId(user_id)
        nearest_by_city = af.getAddressesByCity(user_address['city'])
        nearest_by_state = af.getAddressesByState(user_address['state'])
        nearest_by_zip = af.getAddressesByZip(user_address['zip'])

        all_found = nearest_by_city + nearest_by_state + nearest_by_zip

        for address in all_found:
            address['dist'] = googlemaps.dist_mtx(origins=self.address_str(user_address), destinations=self.address_str(address))


        return sorted(all_found, key=lambda x: x['dist'])
