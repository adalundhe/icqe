package address

import (
  "github.com/gocql/gocql"
  "github.com/graphql-go/graphql"
)

var getUserAddress = graphql.NewObject(graphql.ObjectConfig{
  Name: "GetUserAddress",
  Description: "Get a given user's addres",
  Fields: graphql.Fields{
    "Address": &graphql.Field{
      Type: AddressType,
      Args: graphql.FieldConfigArgument{
        "UserId": &graphql.ArgumentConfig{
          Type: graphql.NewNonNull(graphql.ID),
        },
      },
      Resolve: func(p graphql.ResolveParams)(interface{}, error){
        userId, _ := gocql.ParseUUID(p.Args["UserId"].(string))
        address, err := GetAddressByUser(userId)
        return address, err
      },
    },
  },
})


var RootAddressQuery = graphql.NewObject(graphql.ObjectConfig{
  Name: "RootAddressQuery",
  Fields: graphql.Fields{
    "GetUserAddress": &graphql.Field{
      Type: getUserAddress,
      Resolve: func(p graphql.ResolveParams)(interface{}, error){
        var errorNew error
        return Address{}, errorNew
      },
    },
  },
})
