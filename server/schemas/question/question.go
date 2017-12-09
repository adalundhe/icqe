package question

import (
	"github.com/gocql/gocql"
	"github.com/graphql-go/graphql"
)

type Question struct {
  Body string `json:"body"`
	UserId gocql.UUID `json:"userId"`
	QuestionId gocql.UUID `json:"questionId"`
	AnswerId string `json:"answerId"`
}

var QuestionType = graphql.NewObject(graphql.ObjectConfig{
  Name: "Question",
  Description: "Coding question.",
  Fields: graphql.Fields{
    "Body": & graphql.Field{
      Type: graphql.NewNonNull(graphql.String),
      Description: "Main question text.",
    },
		"UserId": &graphql.Field{
			Type: graphql.NewNonNull(graphql.ID),
			Description: "User associated w/ question",
		},
		"QuestionId": &graphql.Field{
			Type: graphql.NewNonNull(graphql.ID),
			Description: "Unique identifier for question.",
		},
		"AnswerId": &graphql.Field{
			Type: graphql.NewNonNull(graphql.ID),
			Description: "Identifier for top answer to question",
		},
  },
})

var QuestionSchema, err = graphql.NewSchema(graphql.SchemaConfig{
	Query: RootQuestionQuery,
	Mutation: RootQuestionMutation,
})
