package middlewares

import(
  "net/http"
)

func CorsHandler(h http.Handler) http.HandlerFunc {
  return func(w http.ResponseWriter, r *http.Request) {
    if (r.Method == "OPTIONS") {
<<<<<<< HEAD
      w.Header().Set("Access-Control-Allow-Origin", "http://192.168.1.2")
      w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")
    } else {
      w.Header().Set("Access-Control-Allow-Origin", "http://192.168.1.2")
=======
      w.Header().Set("Access-Control-Allow-Origin", "http://192.168.1.2")
      w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")
    } else {
      w.Header().Set("Access-Control-Allow-Origin", "http://192.167.1.1")
>>>>>>> 749f8454046dee811daa962e806c2e2fe0a81b38
      w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")
      h.ServeHTTP(w,r)
    }
  }
}
