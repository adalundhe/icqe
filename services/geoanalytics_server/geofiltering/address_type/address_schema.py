import graphene
import uuid

class AddressType(graphene.ObjectType):
    def __init__(self, address):
        self.addressid = address['addressid'].urn
        self.userId = address['userid'].urn
        self.city = address['city']
        self.state = address['state']
        self.zip_code = address['zip']

    addressId = graphene.UUID(required=True)
    userId = graphene.UUID(required=True)
    city = graphene.String(required=True)
    state = graphene.String(required=True)
    zip_code = graphene.String(required=True)
