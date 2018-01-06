import graphene
from geofiltering.address_type.address_schema import AddressType
from geofiltering.address_type.return_address import ReturnAddressType
from geofiltering.address_type.address_funcs import AddressFuncs as af

class SubmitAddress(graphene.Mutation):
    class Arguments:
        userid = graphene.UUID(required=True)
        city = graphene.String(required=True)
        state = graphene.String(required=True)
        zip_code = graphene.String(required=True)

    response = graphene.List(
        ReturnAddressType
    )


    def mutate(self, info, userid, city, state, zip_code):
        res = []
        return SubmitAddress(response=[ReturnAddressType(response) for response in res])


class AddressMutation(graphene.ObjectType):
    submit_question = SubmitAddress.Field()
