package tag

import (
  "github.com/graphql-go/handler"
)

var TagQlHandler = handler.New(&handler.Config{
  Schema: &TagSchema,
  Pretty: true,
})
