import graphene
from geofiltering.address_type.address_schema import AddressType
from geofiltering.address_type.return_address import ReturnAddressType
from geofiltering.address_type.address_funcs import AddressFuncs as af
from geofiltering import SERVICE
import json


class AddressQuery(graphene.ObjectType):
    address_by_id = graphene.Field(
        UserAddressType,
        user_id = graphene.ID()
    )

    users_near_user = graphene.List(
        ReturnAddressType,
        user_id = graphene.ID()
    )

    def resolve_address_by_id(self, type, user_id):
        return AddressType(user_id)

    def resolve_users_near_user(self, type, user_id):
        results = SERVICE.nearestUsers(user_id)
        return [ReturnAddressType(result) for result in results]
