package address

import (
  "github.com/graphql-go/handler"
)

var AddressQlHandler = handler.New(&handler.Config{
  Schema: &AddressSchema,
  Pretty: true,
})
