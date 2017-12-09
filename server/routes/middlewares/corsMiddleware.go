package middlewares

import(
  "net/http"
)

func CorsHandler(h http.Handler) http.HandlerFunc {
  return func(w http.ResponseWriter, r *http.Request) {
    if (r.Method == "OPTIONS") {
      w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3001")
      w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")
    } else {
      w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3001")
      w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")
      h.ServeHTTP(w,r)
    }
  }
}
