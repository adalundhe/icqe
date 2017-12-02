import graphene
import uuid

class ResponseType(graphene.ObjectType):
    def __init__(self, question):
        self.similarity = question['similarity']
        self.body = question['body']
        self.linkto = str(question['linkto'])

    similarity = graphene.Float(required=True)
    body = graphene.String(required=True)
    linkto = graphene.String(required=True)
