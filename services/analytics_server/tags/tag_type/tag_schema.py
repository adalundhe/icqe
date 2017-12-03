import graphene
from graphene.types import datetime
import uuid

class TagType(graphene.ObjectType):
    def __init__(self, tag):
        self.body = tag['body']
        self.tagid = tag['tagid']
        self.questionid = tag['questionid']
        self.userid = tag['userid']
        self.created = tag['created']
        self.modified = tag['modified']

        try:
            self.count = tag['count']

        except Exception as e:
            self.count = 0


        try:
            self.dates = tag['dates']
        except Exception as e:
            self.dates = []


    body = graphene.String(required=True)
    tagid = graphene.UUID(required=True)
    questionid = graphene.UUID(required=True)
    userid = graphene.UUID(required=True)
    created = datetime.DateTime(required=True)
    modified = datetime.DateTime(required=True)
    count = graphene.Int(required=False)
    dates = graphene.List(datetime.DateTime, required=False)
