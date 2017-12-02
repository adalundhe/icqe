import graphene
from questions.question_type.question_schema import QuestionType
from questions.question_type.question_funcs import QuestionFuncs as qf
import json

class QuestionQuery(graphene.ObjectType):
    questions_all = graphene.List(lambda: QuestionType)

    questions_by_ids = graphene.List(
        QuestionType
    )

    question_by_id = graphene.Field(
        QuestionType,
        question_id = graphene.ID()
    )

    questions_by_user = graphene.List(
        QuestionType,
        user_id = graphene.ID()
    )

    question_by_user = graphene.Field(
        QuestionType,
        question_id = graphene.ID(),
        user_id = graphene.ID()
    )

    def resolve_questions_all(self, type):
        return [QuestionType(question) for question in  qf.getAllQuestions()]

    def resolve_questions_by_ids(self, type, question_ids):
        return [QuestionType(qf.getQuestionById(_id)) for _id in question_ids]

    def resolve_question_by_id(self, type, question_id):
        return QuestionType(qf.getQuestionById(question_id)[0])

    def resolve_questions_by_user(self, type, user_id):
        return [QuestionType(question) for question in qf.getQuestionsByUserId(user_id)]

    def resolve_question_by_user(self, type, question_id, user_id):
        return QuestionType(qf.getQuestionByUserId(question_id, user_id)[0])
