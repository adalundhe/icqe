package user

import (
  "github.com/graphql-go/handler"
)

var UserQlHandler = handler.New(&handler.Config{
  Schema: &UserSchema,
  Pretty: true,
})
