import uuid
from cassandra.cqlengine import columns
from django_cassandra_engine.models import DjangoCassandraModel

class QuestionModel(DjangoCassandraModel):
    questionId = columns.UUID(primary_key=True, default=uuid.uuid4)
    userId = columns.UUID(default=uuid.uuid4)
    body = columns.Text(required=True)
