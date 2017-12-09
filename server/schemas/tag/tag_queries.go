package tag

import (
	"fmt"
	"github.com/gocql/gocql"
	"github.com/graphql-go/graphql"
)

var getAllTags = graphql.NewObject(graphql.ObjectConfig{
	Name: "GetAllTags",
	Description: "Get all tags.",
	Fields: graphql.Fields{
		"Tags": &graphql.Field{
			Type: graphql.NewList(TagType),
			Resolve: func(p graphql.ResolveParams)(interface{}, error){
				tags, err := GetAll()
				fmt.Println("Returning query",tags,err)
				return tags, err
			},
		},
	},
})

var getUserTags = graphql.NewObject(graphql.ObjectConfig{
  Name: "GetUserTags",
  Description: "Get all of user's tags",
  Fields: graphql.Fields{
    "Tags": &graphql.Field{
      Type: graphql.NewList(TagType),
      Args: graphql.FieldConfigArgument{
        "UserId": &graphql.ArgumentConfig{
          Type: graphql.NewNonNull(graphql.ID),
        },
      },
      Resolve: func(p graphql.ResolveParams)(interface{}, error){
        userId, _ := gocql.ParseUUID(p.Args["UserId"].(string))
        tags, err := GetTagsByUserId(userId)
				return tags, err
      },
    },
  },
})

var getQuestionTags = graphql.NewObject(graphql.ObjectConfig{
	Name: "GetQuestionTags",
	Description: "Get all of question's tags",
	Fields: graphql.Fields{
		"Tags": &graphql.Field{
			Type: graphql.NewList(TagType),
			Args: graphql.FieldConfigArgument{
				"QuestionId": &graphql.ArgumentConfig{
					Type: graphql.NewNonNull(graphql.ID),
				},
			},
			Resolve : func(p graphql.ResolveParams)(interface{}, error){
				questionId, _ := gocql.ParseUUID(p.Args["QuestionId"].(string))
				tags, err := GetTagsByQuestionId(questionId)
				return tags, err
			},
		},
	},
})

var getTagById = graphql.NewObject(graphql.ObjectConfig{
	Name: "GetTagById",
	Description: "Get a given tag by it's id.",
	Fields: graphql.Fields{
		"Tag": &graphql.Field{
			Type: TagType,
			Args: graphql.FieldConfigArgument{
				"TagId": &graphql.ArgumentConfig{
					Type: graphql.NewNonNull(graphql.ID),
				},
			},
			Resolve: func(p graphql.ResolveParams)(interface{}, error){
				tagId, _ := gocql.ParseUUID(p.Args["TagId"].(string))
				tag, err := GetTagById(tagId)
				return tag, err
			},
		},
	},
})

var getTagsByBody = graphql.NewObject(graphql.ObjectConfig{
	Name: "GetTagsByBody",
	Description: "Get all tags with matching body.",
	Fields: graphql.Fields{
		"Tags": &graphql.Field{
			Type: graphql.NewList(TagType),
			Args: graphql.FieldConfigArgument{
				"Body": &graphql.ArgumentConfig{
					Type: graphql.NewNonNull(graphql.String),
				},
			},
			Resolve: func(p graphql.ResolveParams)(interface{}, error){
				tagBody, _ := p.Args["Body"].(string)
				tags, err := GetTagsByBody(tagBody)
				return tags, err
			},
		},
	},
})

var RootTagQuery = graphql.NewObject(graphql.ObjectConfig{
	Name: "RootTagQuery",
	Fields: graphql.Fields{
		"GetAllTags": &graphql.Field{
			Type: getAllTags,
			Resolve: func(p graphql.ResolveParams)(interface{}, error){
				var errorNew error
				return []Tag{}, errorNew
			},
		},
		"GetUserTags": &graphql.Field{
			Type: getUserTags,
			Resolve: func(p graphql.ResolveParams)(interface{}, error){
				var errorNew error
				return []Tag{}, errorNew
			},
		},
		"GetQuestionTags": &graphql.Field{
			Type: getQuestionTags,
			Resolve: func(p graphql.ResolveParams)(interface{}, error){
				var errorNew error
				return []Tag{}, errorNew
			},
		},
		"GetTagById": &graphql.Field{
			Type: getTagById,
			Resolve: func(p graphql.ResolveParams)(interface{}, error){
				var errorNew error
				return Tag{}, errorNew
			},
		},
		"GetTagsByBody": &graphql.Field{
			Type: getTagsByBody,
			Resolve: func(p graphql.ResolveParams)(interface{}, error){
				var errorNew error
				return []Tag{}, errorNew
			},
		},
	},
})
