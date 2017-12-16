import graphene
from geofiltering.address_type.address_queries import AddressQuery
from graphene_django.debug import DjangoDebug

# class Query(QuestionQuery, TagQuery, graphene.ObjectType):
#     debug = graphene.Field(DjangoDebug, name='__debug')
#
#
# class Mutation(QuestionMutation, TagMutation, graphene.ObjectType):
#     debug = graphene.Field(DjangoDebug, name='__debug')

schema = graphene.Schema(query=AddressQuery)
