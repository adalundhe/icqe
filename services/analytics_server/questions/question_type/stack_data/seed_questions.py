from pymongo import MongoClient
from cassandra.cluster import Cluster
from cassandra.encoder import Encoder
import datetime as datetime
import tokenmaker
import uuid
import sys

# , str(document['title']), str(document['url'])[7:], int(document['score']), self.sys_id, str()

class MongoCassPipe:
    def __init__(self, collection):
        client = MongoClient()
        client = MongoClient('localhost', 27017)
        cluster = Cluster()


        self.mongo_db = client['stack-questions']
        self.mongo_collection = self.mongo_db[collection]
        self.session = cluster.connect('graphql')
        self.sys_id = uuid.uuid4()
        self.encoder = Encoder()

    def pipe_to_cassandra(self):
        cursor = self.mongo_collection.find({})
        tokenizer = tokenmaker.Tokenizer()

        for document in cursor:
            question_id = uuid.uuid4()

            # Ugly string line to insert into DB
            insert_question = ""
            currentTime = datetime.datetime.today()
            bucket = currentTime.strftime("%Y%m")

            try:
                insert_question = "INSERT INTO question (questionId, userId, answerId, body, url, score, created, modified) VALUES ({}, {}, {}, {}, {}, {}, {}, {})".format(question_id, uuid., self.encoder.cql_encode_all_types("ANS"+str(document['acceted_answer_id'])), self.encoder.cql_encode_all_types(document['title']), self.encoder.cql_encode_all_types(document['url']), document['score'], bucket, bucket)
            except:
                insert_question = "INSERT INTO question (questionId, userId, answerId, body, url, score, created, modified) VALUES ({}, {}, {}, {}, {}, {}, {}, {})".format(question_id, self.sys_id, self.encoder.cql_encode_all_types("ANS"+str(document['accepted_answer_id'])), self.encoder.cql_encode_all_types(document['title']), self.encoder.cql_encode_all_types(document['url']), document['score'], bucket, bucket)
            self.session.execute(insert_question)
            tags = tokenizer.tokenize(document['title']) + document['tags']
            for tag in tags:
                tag_id = uuid.uuid4()
                insert_tag = "INSERT INTO tag (body, tagId, questionId, userId, created, modified) VALUES ({}, {}, {}, {}, {}, {})".format(self.encoder.cql_encode_all_types(tag), tag_id, question_id, self.sys_id, bucket, bucket)
                self.session.execute(insert_tag)


pipe = MongoCassPipe(sys.argv[1])
pipe.pipe_to_cassandra()
