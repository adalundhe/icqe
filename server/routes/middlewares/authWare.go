package middlewares

import(
  "github.com/auth0-community/go-auth0"
  jose "gopkg.in/square/go-jose.v2"
  "net/http"
)

const JWKS_URI = "https://stackbotp.auth0.com/.well-known/jwks.json"
const AUTH0_API_ISSUER = "https://stackbotp.auth0.com"

var AUTH0_API_AUDIENCE = []string{"go-icql"}

func AuthMiddleware(next http.Handler) http.Handler {
  return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
    client := auth0.NewJWKClient(auth0.JWKClientOptions{URI: JWKS_URI})
    audience := AUTH0_API_AUDIENCE

    configuration := auth0.NewConfiguration(client, audience, AUTH0_API_ISSUER, jose.RS256)
    validator := auth0.NewValidator(configuration)

    _, err := validator.ValidateRequest(r)

    if err != nil {
      next.ServeHTTP(w, r)

    } else {
      next.ServeHTTP(w, r)
    }
  })
}
