import graphene
import uuid

class QuestionType(graphene.ObjectType):
    def __init__(self, question):
        self.questionId = question['questionid']
        self.body = question['body']
        self.userId = question['userid'].urn

    questionId = graphene.UUID(required=True)
    body = graphene.String(required=True)
    userId = graphene.UUID(required=True)
