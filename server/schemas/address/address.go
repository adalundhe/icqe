package address

import (
	"github.com/gocql/gocql"
	"github.com/graphql-go/graphql"
)

type Address struct {
	AddressId gocql.UUID `json:"addressId"`
  City string `json:"city"`
  State string `json:"state"`
  Zip string `json:"zip"`
	UserId gocql.UUID `json:"userId"`
}


var AddressType = graphql.NewObject(graphql.ObjectConfig{
  Name: "Address",
  Description: "Address of user.",
  Fields: graphql.Fields{
		"AddressId": &graphql.Field{
			Type: graphql.NewNonNull(graphql.ID),
			Description: "Address Id.",
		},
    "City": &graphql.Field{
      Type: graphql.NewNonNull(graphql.String),
      Description: "User city.",
    },
    "State": &graphql.Field{
      Type: graphql.NewNonNull(graphql.String),
      Description: "User state.",
    },
    "Zip": &graphql.Field{
      Type: graphql.NewNonNull(graphql.String),
      Description: "User zip.",
    },
		"UserId": &graphql.Field{
			Type: graphql.NewNonNull(graphql.ID),
			Description: "Associated userId with this address",
		},
  },
})

var AddressSchema, err = graphql.NewSchema(graphql.SchemaConfig{
	Query: RootAddressQuery,
	Mutation: RootAddressMutation,
})
