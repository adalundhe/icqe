import graphene
import uuid

class ResponseType(graphene.ObjectType):
    def __init__(self, question):
        self.questionid = question['questionid']
        self.userid = question['userid']
        self.similarity = question['similarity']
        self.body = question['body']
        self.linkto = str(question['linkto'])
        self.answerid = question['answerid']

    questionid = graphene.UUID(required=True)
    userid = graphene.UUID(required=True)
    answerid = graphene.String(required=True)
    similarity = graphene.Float(required=True)
    body = graphene.String(required=True)
    linkto = graphene.String(required=True)
