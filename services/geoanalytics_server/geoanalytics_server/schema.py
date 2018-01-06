import graphene
from geofiltering.address_type.address_queries import AddressQuery
from geofiltering.address_type.address_mutation import AddressMutation
from graphene_django.debug import DjangoDebug

class Query(AddressQuery, graphene.ObjectType):
    debug = graphene.Field(DjangoDebug, name='__debug')


class Mutation(AddressMutation, graphene.ObjectType):
    debug = graphene.Field(DjangoDebug, name='__debug')

schema = graphene.Schema(query=Query, mutation=Mutation)
