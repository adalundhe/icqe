import graphene
import uuid

class ReturnAddressType(graphene.ObjectType):
    def __init__(self, address):
        self.addressId = address['addressid']
        self.userId = address['userid']
        self.city = address['city']
        self.state = address['state']
        self.zip_code = address['zip']
        self.distance = address['dist']

    addressId = graphene.UUID(required=True)
    userId = graphene.UUID(required=True)
    city = graphene.String(required=True)
    state = graphene.String(required=True)
    zip_code = graphene.String(required=True)
    distance = graphene.Float(required=True)
