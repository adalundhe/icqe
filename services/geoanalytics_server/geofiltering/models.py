import uuid
from cassandra.cqlengine import columns
from django_cassandra_engine.models import DjangoCassandraModel

class AddressModel(DjangoCassandraModel):
    addressId = columns.UUID(primary_key=True, default=uuid.uuid4)
    userId = columns.UUID(default=uuid.uuid4)
    city = columns.Text(required=True)
    state = columns.Text(required=True)
    zip = columns.Text(required=True)
