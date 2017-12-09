import graphene
from tags.tag_type.tag_schema import TagType
from tags.tag_type.response_schema import TagResponseType
from tags.tag_type.tag_funcs import TagFuncs as tf

class InsertTags(graphene.Mutation):
    class Arguments:
        query = graphene.String(required=True)

    response = graphene.List(
        TagResponseType
    )
    responseTime = graphene.Float()
    responseLength = graphene.Int()

    def mutate(self, info, query):
        print(query)
        return InsertTags(response=[], responseTime=1.00, responseLength=0)

class TagMutation(graphene.ObjectType):
    insert_tag = InsertTags.Field()
