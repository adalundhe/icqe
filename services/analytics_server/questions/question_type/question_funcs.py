from django.db import connection
import uuid
from questions.models import QuestionModel as qm

class QuestionFuncs:
    def __init__(self):
        return
    def getAllQuestions():
        cursor = connection.cursor()
        return cursor.execute("SELECT questionId, body, userId FROM question;")

    def getQuestionById(questionId):
        cursor = connection.cursor()
        CQLstring = "SELECT questionId, body, userId FROM question WHERE questionId = %s ALLOW FILTERING;" % questionId
        return list(cursor.execute(CQLstring))

    def getQuestionsByUserId(userId):
        cursor = connection.cursor()
        CQLstring = "SELECT questionId, body, userId FROM question WHERE userId = %s ALLOW FILTERING;" % userId
        return list(cursor.execute(CQLstring))

    def getQuestionByUserId(questionId, userId):
        cursor = connection.cursor()
        CQLstring = "SELECT questionId, body, userId FROM question WHERE questionId = {} AND userId = {}".format(questionId, userId)
        return list(cursor.execute(CQLstring))
