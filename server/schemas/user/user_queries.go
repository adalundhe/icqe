package user

import (
	"github.com/gocql/gocql"
	"github.com/graphql-go/graphql"
)

var getUserInfo = graphql.NewObject(graphql.ObjectConfig{
  Name: "GetUserInfo",
  Description: "Get all of user's data",
  Fields: graphql.Fields{
      "User": &graphql.Field{
          Type: UserType,
					Args: graphql.FieldConfigArgument{
						"UserId": &graphql.ArgumentConfig{
								Type: graphql.NewNonNull(graphql.ID),
						},
					},
          Resolve: func(p graphql.ResolveParams)(interface{}, error){
						userId, _ := gocql.ParseUUID(p.Args["UserId"].(string))
            user, err := GetUser(userId)
            return user, err
          },
      },
  },
})

var RootUserQuery = graphql.NewObject(graphql.ObjectConfig{
	Name: "RootUserQuery",
	Fields: graphql.Fields{
		"GetUserInfo": &graphql.Field{
			Type: getUserInfo,
			Resolve: func(p graphql.ResolveParams)(interface{}, error){
				var errorNew error
				return User{}, errorNew
			},
		},
	},
})
