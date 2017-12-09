package tag

import (
	"github.com/graphql-go/graphql"
)

var addNewTag = graphql.NewObject(graphql.ObjectConfig{
	Name: "AddNewTag",
	Description: "Add new tag.",
	Fields: graphql.Fields{
		"Tag": &graphql.Field{
      Type: TagType,
			Args: graphql.FieldConfigArgument{
				"Body": &graphql.ArgumentConfig{
					Type: graphql.NewNonNull(graphql.String),
				},
				"QuestionId": &graphql.ArgumentConfig{
					Type: graphql.NewNonNull(graphql.ID),
				},
				"UserId": &graphql.ArgumentConfig{
					Type: graphql.NewNonNull(graphql.ID),
				},
			},
      Resolve: func(p graphql.ResolveParams)(interface{}, error){
        newTag, err := AddNewTag(p)
        return newTag, err
      },
    },
	},
})

var addNewTags = graphql.NewObject(graphql.ObjectConfig{
	Name: "AddNewTags",
	Description: "Add new tags.",
	Fields: graphql.Fields{
		"Tags": &graphql.Field{
			Type: graphql.NewList(TagType),
			Args: graphql.FieldConfigArgument{
				"Tags": &graphql.ArgumentConfig{
					Type: graphql.NewList(graphql.String),
				},
				"QuestionId": & graphql.ArgumentConfig{
					Type: graphql.NewNonNull(graphql.ID),
				},
				"UserId": &graphql.ArgumentConfig{
					Type: graphql.NewNonNull(graphql.ID),
				},
			},
			Resolve: func(p graphql.ResolveParams)(interface{}, error){
				newTags, err := AddNewTags(p)
				return newTags, err
			},
		},
	},
})


var RootTagMutation = graphql.NewObject(graphql.ObjectConfig{
	Name: "RootTagMutation",
	Fields: graphql.Fields{
		"AddNewTag": &graphql.Field{
			Type: addNewTag,
			Resolve: func(p graphql.ResolveParams)(interface{}, error){
				var errorNew error
				return  Tag{}, errorNew
			},
		},
		"AddNewTags": &graphql.Field{
			Type: addNewTags,
			Resolve: func(p graphql.ResolveParams)(interface{}, error){
				var errorNew error
				return []Tag{}, errorNew
			},
		},
	},
})
