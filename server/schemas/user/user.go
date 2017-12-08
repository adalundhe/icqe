package user

import (
	"github.com/gocql/gocql"
	"github.com/graphql-go/graphql"
)

type User struct {
	UserId gocql.UUID `json:"userId"`
  FirstName string `json:"firstName"`
  LastName string `json:"LastName"`
}

var UserType = graphql.NewObject(graphql.ObjectConfig{
  Name: "User",
  Description: "QDB User",
  Fields: graphql.Fields{
		"UserId": &graphql.Field{
			Type: graphql.NewNonNull(graphql.ID),
			Description: "Unique ID",
		},
    "FirstName": &graphql.Field{
      Type: graphql.NewNonNull(graphql.String),
      Description: "User first name.",
    },
    "LastName": &graphql.Field{
      Type: graphql.NewNonNull(graphql.String),
      Description: "User last name.",
    },
  },
})

var UserSchema, err = graphql.NewSchema(graphql.SchemaConfig{
	Query: RootUserQuery,
	Mutation: RootUserMutation,
})
