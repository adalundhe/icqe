package address

import (
  "github.com/graphql-go/graphql"
)

var addNewAddress = graphql.NewObject(graphql.ObjectConfig{
  Name: "AddNewAddress",
  Fields: graphql.Fields{
    "Address": &graphql.Field{
      Type: AddressType,
      Args: graphql.FieldConfigArgument{
				"UserId": &graphql.ArgumentConfig{
					Type: graphql.NewNonNull(graphql.ID),
				},
        "City": &graphql.ArgumentConfig{
          Type: graphql.NewNonNull(graphql.String),
        },
        "State": &graphql.ArgumentConfig{
          Type: graphql.NewNonNull(graphql.String),
        },
        "Zip": &graphql.ArgumentConfig{
          Type: graphql.NewNonNull(graphql.String),
        },
      },
      Resolve: func(p graphql.ResolveParams)(interface{}, error){
        newAddress, err := AddNewAddress(p)
        return newAddress, err
      },
    },
  },
})

var updateAddressById = graphql.NewObject(graphql.ObjectConfig{
  Name: "UpdateAddressById",
  Fields: graphql.Fields{
    "Address": &graphql.Field{
      Type: AddressType,
      Args: graphql.FieldConfigArgument{
        "AddressId": &graphql.ArgumentConfig{
          Type: graphql.NewNonNull(graphql.ID),
        },
        "UserId": &graphql.ArgumentConfig{
          Type: graphql.NewNonNull(graphql.ID),
        },
        "City": &graphql.ArgumentConfig{
          Type: graphql.NewNonNull(graphql.String),
        },
        "State": &graphql.ArgumentConfig{
          Type: graphql.NewNonNull(graphql.String),
        },
        "Zip": &graphql.ArgumentConfig{
          Type: graphql.NewNonNull(graphql.String),
        },
      },
      Resolve: func(p graphql.ResolveParams)(interface{}, error){
        updatedAddress, err := UpdateAddressById(p)
        return updatedAddress, err
      },
    },
  },
})

var RootAddressMutation = graphql.NewObject(graphql.ObjectConfig{
  Name: "RootAddressMutation",
  Fields: graphql.Fields{
    "AddNewAddress": &graphql.Field{
        Type: addNewAddress,
        Resolve: func(p graphql.ResolveParams)(interface{}, error){
          var errorNew error
          return Address{}, errorNew
        },
    },
    "UpdateAddressById": &graphql.Field{
      Type: updateAddressById,
      Resolve: func(p graphql.ResolveParams)(interface{}, error){
        var errorNew error
        return Address{}, errorNew
      },
    },
  },
})
