package question

import (
	"github.com/gocql/gocql"
	"github.com/graphql-go/graphql"
)

var getAllQuestions = graphql.NewObject(graphql.ObjectConfig{
	Name: "GetAllQuestions",
	Description: "Get all questions.",
	Fields: graphql.Fields{
		"Questions": &graphql.Field{
			Type: graphql.NewList(QuestionType),
			Resolve: func(p graphql.ResolveParams)(interface{}, error){
				questions, err := GetAll()
				return questions, err
			},
		},
	},
})

var getUserQuestions = graphql.NewObject(graphql.ObjectConfig{
  Name: "GetUserQuestions",
  Description: "Get all of user's questions",
  Fields: graphql.Fields{
    "Questions": &graphql.Field{
      Type: graphql.NewList(QuestionType),
      Args: graphql.FieldConfigArgument{
        "UserId": &graphql.ArgumentConfig{
          Type: graphql.NewNonNull(graphql.ID),
        },
      },
      Resolve: func(p graphql.ResolveParams)(interface{}, error){
				userId, _ := gocql.ParseUUID(p.Args["UserId"].(string))
        questions, err := GetQuestionsByUser(userId)
        return questions, err
      },
    },
  },
})

var getUserQuestion = graphql.NewObject(graphql.ObjectConfig{
	Name: "GetUserQuestion",
	Description: "Get single question given user.",
	Fields: graphql.Fields{
		"Question": &graphql.Field{
			Type: QuestionType,
			Args: graphql.FieldConfigArgument{
				"QuestionId": &graphql.ArgumentConfig{
					Type:graphql.NewNonNull(graphql.ID),
				},
				"UserId": &graphql.ArgumentConfig{
					Type: graphql.NewNonNull(graphql.ID),
				},
			},
			Resolve: func(p graphql.ResolveParams)(interface{}, error){
				questionId, _ := gocql.ParseUUID(p.Args["QuestionId"].(string))
				userId, _ := gocql.ParseUUID(p.Args["UserId"].(string))
				question, err := GetQuestionByUser(userId, questionId)
				return question, err
			},
		},
	},
})

var getQuestionsByIds = graphql.NewObject(graphql.ObjectConfig{
	Name: "GetQuestionsByIds",
	Description: "Get questions given set of ids.",
	Fields: graphql.Fields{
		"Questions": &graphql.Field{
			Type: graphql.NewList(QuestionType),
			Args: graphql.FieldConfigArgument{
				"QuestionIds": &graphql.ArgumentConfig{
					Type: graphql.NewList(graphql.ID),
				},
			},
			Resolve: func(p graphql.ResolveParams)(interface{}, error){
				idsIn := p.Args["QuestionIds"].([]interface{})
				var questionIds []gocql.UUID

				for _, id := range idsIn{
					convertedId, _ := gocql.ParseUUID(id.(string))
					questionIds = append(questionIds, convertedId)
				}

				questions, err := GetQuestionsByIds(questionIds)
				return questions, err
			},
		},
	},
})

var getQuestionById = graphql.NewObject(graphql.ObjectConfig{
	Name: "GetByQuestionId",
	Description: "Get given question gy id.",
	Fields: graphql.Fields{
		"Question": &graphql.Field{
			Type: QuestionType,
			Args: graphql.FieldConfigArgument{
				"QuestionId": &graphql.ArgumentConfig{
					Type: graphql.NewNonNull(graphql.ID),
				},
			},
			Resolve: func(p graphql.ResolveParams)(interface{}, error){
				questionId, _ := gocql.ParseUUID(p.Args["QuestionId"].(string))
				question, err := GetQuestionById(questionId)
				return question, err
			},
		},
	},
})

var RootQuestionQuery = graphql.NewObject(graphql.ObjectConfig{
	Name: "RootQuestionQuery",
	Fields: graphql.Fields{
		"GetAllQuestions": &graphql.Field{
			Type: getAllQuestions,
			Resolve: func(p graphql.ResolveParams)(interface{}, error){
				var errorNew error
				return []Question{}, errorNew
			},
		},
		"GetUserQuestions": &graphql.Field{
			Type: getUserQuestions,
			Resolve: func(p graphql.ResolveParams)(interface{}, error){
				var errorNew error
				return []Question{}, errorNew
			},
		},
		"GetUserQuestion": &graphql.Field{
			Type: getUserQuestion,
			Resolve: func(p graphql.ResolveParams)(interface{}, error){
				var errorNew error
				return Question{}, errorNew
			},
		},
		"GetQuestionById": &graphql.Field{
			Type: getQuestionById,
			Resolve: func(p graphql.ResolveParams)(interface{}, error){
				var errorNew error
				return Question{}, errorNew
			},
		},
		"GetQuestionsByIds": &graphql.Field{
			Type: getQuestionsByIds,
			Resolve: func(p graphql.ResolveParams)(interface{}, error){
				var errorNew error
				return []Question{}, errorNew
			},
		},
	},
})
