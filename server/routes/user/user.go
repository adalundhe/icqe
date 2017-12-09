package user

import (
  "encoding/json"
  "github.com/scorbettUM/server/app"
	"net/http"
)

func UserHandler(w http.ResponseWriter, r *http.Request) {
  w.Header().Set("Content-Type", "application/json")
	session, err := app.Store.Get(r, "auth-session")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

  js, err := json.Marshal(session.Values["profile"])
  if err != nil {
      http.Error(w, err.Error(), http.StatusInternalServerError)
  }

  w.Write(js)
}
