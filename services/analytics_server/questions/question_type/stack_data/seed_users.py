from cassandra.cluster import Cluster
from cassandra.encoder import Encoder

# , str(document['title']), str(document['url'])[7:], int(document['score']), self.sys_id, str()

class MongoCassPipe:
    def __init__(self):
        cluster = Cluster()

        self.session = cluster.connect('graphql')
        self.session.row_factory = dict_factory
        self.encoder = Encoder()

    def pipe_to_cassandra(self):
        questions = self.session.execute("""SELECT * FROM question""")
        for question in questions:
            insert_user = "INSERT INTO user (userid, firstname, lastname) VALUES ({}, {}, {})".format(self.encoder.cql_encode_all_types(question['userid']), self.encoder.cql_encode_all_types(" "), self.encoder.cql_encode_all_types(" "))
            self.session.execute(insert_user)


pipe = MongoCassPipe()
pipe.pipe_to_cassandra()
