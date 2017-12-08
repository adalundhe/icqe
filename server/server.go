package main

import (
  "github.com/scorbettUM/server/routes/callback"
  "github.com/scorbettUM/server/routes/middlewares"
  "github.com/scorbettUM/server/routes/home"
  "github.com/scorbettUM/server/routes/user"
  "github.com/scorbettUM/server/routes/proxy"
  "github.com/mnmtanish/go-graphiql"
  userPkg"github.com/scorbettUM/server/schemas/user"
  addressPkg"github.com/scorbettUM/server/schemas/address"
  questionPkg"github.com/scorbettUM/server/schemas/question"
  tagPkg"github.com/scorbettUM/server/schemas/tag"
	"github.com/codegangsta/negroni"
	"github.com/gorilla/mux"
	"net/http"
  "fmt"
)

func StartServer() {
	r := mux.NewRouter()
  loginRoutes := mux.NewRouter().PathPrefix("/user-profile").Subrouter().StrictSlash(true)

  loginRoutes.Handle("/", negroni.New(
    negroni.Wrap(http.HandlerFunc(user.UserHandler)),
  ))
  loginRoutes.Handle("/userql", userPkg.UserQlHandler)
  loginRoutes.Handle("/addressql", addressPkg.AddressQlHandler)
  loginRoutes.Handle("/questionql", questionPkg.QuestionQlHandler)
  loginRoutes.Handle("/tagql", tagPkg.TagQlHandler)
  loginRoutes.HandleFunc("/graphiql", graphiql.ServeGraphiQL)
  loginRoutes.HandleFunc("/ask", proxy.ProxyQuestion)
  loginRoutes.HandleFunc("/meta", proxy.ProxyMeta)

  r.HandleFunc("/", home.HomeHandler)
	r.HandleFunc("/callback", callback.CallbackHandler)
  r.PathPrefix("/user-profile").Handler(negroni.New(
    negroni.Wrap(middlewares.AuthMiddleware(middlewares.CorsHandler(loginRoutes))),
  ))

	fmt.Println(http.ListenAndServe(":3000",middlewares.CorsHandler(r)))
}
