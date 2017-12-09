import graphene
from questions.question_type.question_schema import QuestionType
from questions.question_type.response_schema import ResponseType
from questions.question_type.question_funcs import QuestionFuncs as qf
from questions import RECOMMENDER

class SubmitQuestion(graphene.Mutation):
    class Arguments:
        query = graphene.String(required=True)

    response = graphene.List(
        ResponseType
    )
    responseTime = graphene.Float()
    responseLength = graphene.Int()

    def mutate(self, info, query):
        res = RECOMMENDER.ask_question(query)
        return SubmitQuestion(response=[ResponseType(response) for response in res['responses']], responseTime=res['response-time'], responseLength=res['response-length'])


class QuestionMutation(graphene.ObjectType):
    submit_question = SubmitQuestion.Field()
