from django.db import connection
import uuid


class TagFuncs:
    def __init__(self):
        return
    def getAllTags():
        cursor = connection.cursor()
        return list(cursor.execute("SELECT * FROM tag;"))

    def getTagById(tagId):
        cursor = connection.cursor()
        CQLstring = "SELECT * FROM tag WHERE tagId = %s ALLOW FILTERING;" % tagId
        return list(cursor.execute(CQLstring))

    def getTagsByUserId(userId):
        print("GOT", userId)
        cursor = connection.cursor()
        CQLstring = "SELECT * FROM tag WHERE userId = {} ALLOW FILTERING;".format(userId)
        print(CQLstring)
        return list(cursor.execute(CQLstring))

    def getTagByUserId(tagId, userId):
        cursor = connection.cursor()
        CQLstring = "SELECT * FROM tag WHERE tagId = {} AND userId = {}".format(tagId, userId)
        return list(cursor.execute(CQLstring))

    def getTagsSortedByTime(limit):
        cursor = connection.cursor()
        CQLstring = "SELECT * FROM last_created_tags LIMIT {};".format(limit)
        return list(cursor.execute(CQLstring))
