import graphene
from questions.question_type.question_queries import QuestionQuery
from questions.question_type.question_mutations import QuestionMutation
from tags.tag_type.tag_queries import TagQuery
from tags.tag_type.tag_mutations import TagMutation
from graphene_django.debug import DjangoDebug

class Query(QuestionQuery, TagQuery, graphene.ObjectType):
    debug = graphene.Field(DjangoDebug, name='__debug')


class Mutation(QuestionMutation, TagMutation, graphene.ObjectType):
    debug = graphene.Field(DjangoDebug, name='__debug')

schema = graphene.Schema(query=Query, mutation=Mutation)
