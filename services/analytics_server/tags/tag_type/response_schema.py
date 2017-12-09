import graphene
import uuid

class TagResponseType(graphene.ObjectType):
    def __init__(self, tag):
        self.similarity = tag['similarity']
        self.body = tag['body']
        self.userid = tag['userid']
        self.tagid = tag['tagid']
        self.questionid = tag['questionid']

    similarity = graphene.Float(required=True)
    body = graphene.String(required=True)
    userid = graphene.UUID(required=True)
    tagid = graphene.UUID(required=True)
    questionid = graphene.UUID(required=True)
