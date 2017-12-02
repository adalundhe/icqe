package user

import (
	"github.com/graphql-go/graphql"
)

var userFromId = graphql.NewObject(graphql.ObjectConfig{
	Name: "UserFromId",
	Fields: graphql.Fields{
		"User": &graphql.Field{
			Type: UserType,
			Args: graphql.FieldConfigArgument{
				"TokenId": &graphql.ArgumentConfig{
					Type: graphql.NewNonNull(graphql.String),
				},
			},
			Resolve: func(p graphql.ResolveParams)(interface{}, error){
				newUser, err := UserFromId(p)
				return newUser, err
			},
		},
	},
})

var addNewUser = graphql.NewObject(graphql.ObjectConfig{
		Name: "AddNewUser",
		Fields: graphql.Fields{
			"User": &graphql.Field{
				Type: UserType, // the return type for this field
				Args: graphql.FieldConfigArgument{
					"FirstName": &graphql.ArgumentConfig{
						Type: graphql.NewNonNull(graphql.String),
					},
					"LastName": &graphql.ArgumentConfig{
						Type: graphql.NewNonNull(graphql.String),
					},
				},
				Resolve: func(p graphql.ResolveParams)(interface{}, error) {
          newUser, err := AddUser(p)
					return newUser, err
				},
			},
		},
	})

var updateUserById = graphql.NewObject(graphql.ObjectConfig{
	Name: "UpdateUserById",
	Fields: graphql.Fields{
		"User": &graphql.Field{
			Type: UserType,
			Args: graphql.FieldConfigArgument{
				"UserId": &graphql.ArgumentConfig{
					Type: graphql.NewNonNull(graphql.ID),
				},
				"FirstName": &graphql.ArgumentConfig{
					Type: graphql.NewNonNull(graphql.String),
				},
				"LastName": &graphql.ArgumentConfig{
					Type: graphql.NewNonNull(graphql.String),
				},
			},
			Resolve: func(p graphql.ResolveParams)(interface{}, error){
				updatedUser, err := UpdateUserById(p)
				return updatedUser, err
			},
		},
	},
})

var RootUserMutation = graphql.NewObject(graphql.ObjectConfig{
	Name: "RootUserMutation",
	Fields: graphql.Fields{
		"UserFromId": &graphql.Field{
			Type: userFromId,
			Resolve: func(p graphql.ResolveParams)(interface{}, error){
				var errorNew error
				return User{}, errorNew
			},
		},
		"AddNewUser": &graphql.Field{
			Type: addNewUser,
			Resolve: func(p graphql.ResolveParams)(interface{}, error){
				var errorNew error
				return User{}, errorNew
			},
		},
		"UpdateUserById": &graphql.Field{
			Type: updateUserById,
			Resolve: func(p graphql.ResolveParams)(interface{}, error){
				var errorNew error
				return User{}, errorNew
			},
		},
	},
})
