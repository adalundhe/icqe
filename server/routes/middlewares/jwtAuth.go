package middlewares

import (
  "github.com/auth0/go-jwt-middleware"
  "github.com/dgrijalva/jwt-go"
)

var JwtMiddleware = jwtmiddleware.New(jwtmiddleware.Options{
    ValidationKeyGetter: func(token *jwt.Token) (interface{}, error) {
      return []byte("My Secret"), nil
    },
    SigningMethod: jwt.SigningMethodHS256,
})
