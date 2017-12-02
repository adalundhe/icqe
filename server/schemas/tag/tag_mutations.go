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
	},
})
