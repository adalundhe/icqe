package question

import (
  "github.com/graphql-go/handler"
)

var QuestionQlHandler = handler.New(&handler.Config{
  Schema: &QuestionSchema,
  Pretty: true,
})
