package question

import (
	"github.com/graphql-go/graphql"
)

var addNewQuestion = graphql.NewObject(graphql.ObjectConfig{
  Name: "AddNewQuestion",
  Fields: graphql.Fields{
    "Question": &graphql.Field{
      Type: QuestionType,
      Args: graphql.FieldConfigArgument{
				"Body": &graphql.ArgumentConfig{
					Type: graphql.NewNonNull(graphql.String),
				},
        "UserId": &graphql.ArgumentConfig{
          Type: graphql.NewNonNull(graphql.ID),
        },
				"AnswerId": &graphql.ArgumentConfig{
					Type: graphql.NewNonNull(graphql.ID),
				},
      },
      Resolve: func(p graphql.ResolveParams)(interface{}, error){
          question, err := AddNewQuestion(p)
          return question, err
      },
    },
  },
})

var RootQuestionMutation = graphql.NewObject(graphql.ObjectConfig{
  Name: "RootQuestionMutation",
  Fields: graphql.Fields{
    "AddNewQuestion": &graphql.Field{
      Type: addNewQuestion,
			Resolve: func(p graphql.ResolveParams)(interface{}, error){
				var errorNew error
				return Question{}, errorNew
			},
    },
  },
})
