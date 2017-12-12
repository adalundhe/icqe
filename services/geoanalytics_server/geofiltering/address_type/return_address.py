import graphene
import uuid

class ReturnAddressType(graphene.ObjectType):
    def __init__(self, address):
        self.addressid = address['addressid'].urn
        self.userId = address['userid'].urn
        self.city = address['city']
        self.state = address['state']
        self.zip_code = address['zip']
        self.distanceFromUser = address['dist']

    addressId = graphene.UUID(required=True)
    userId = graphene.UUID(required=True)
    city = graphene.String(required=True)
    state = graphene.String(required=True)
    zip_code = graphene.String(required=True)
    distanceFromUser = graphene.Float(required=True)
