package home

import (
	"net/http"
  "fmt"
)

func HomeHandler(w http.ResponseWriter, r *http.Request) {
  fmt.Fprintf(w, "HELLO!")
}
