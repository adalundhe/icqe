package tag

import (
	"github.com/gocql/gocql"
	"github.com/graphql-go/graphql"
)

type Tag struct {
  Body string `json:"body"`
	QuestionId gocql.UUID `json:"questionId"`
	UserId gocql.UUID `json:"userId"`
	TagId gocql.UUID `json:"tagId"`
}

var TagType = graphql.NewObject(graphql.ObjectConfig{
  Name: "Tag",
  Description: "Tag applied to a question.",
  Fields: graphql.Fields{
    "Body": &graphql.Field{
      Type: graphql.NewNonNull(graphql.String),
      Description: "Tag body.",
    },
		"QuestionId": &graphql.Field{
			Type: graphql.NewNonNull(graphql.ID),
			Description: "Question associated with tag.",
		},
		"UserId": &graphql.Field{
			Type: graphql.NewNonNull(graphql.ID),
			Description: "User associated with tag.",
		},
		"TagId": &graphql.Field{
			Type: graphql.NewNonNull(graphql.ID),
			Description: "Unique tag identifier.",
		},
  },
})

var TagSchema, err = graphql.NewSchema(graphql.SchemaConfig{
	Query: RootTagQuery,
	Mutation: RootTagMutation,
})
