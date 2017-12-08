package proxy

import(
  http"net/http"
  "fmt"
  "bytes"
  "io/ioutil"
)

var proxy = "localhost:8000"


func ProxyQuestion(w http.ResponseWriter, r *http.Request) {
    body, err := ioutil.ReadAll(r.Body)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    query := r.URL.Query().Encode()
    // you can reassign the body if you need to parse it as multipart
    r.Body = ioutil.NopCloser(bytes.NewReader(body))
    //+ query.Encode()
    url := fmt.Sprintf("%s://%s%s?%s", "http", proxy, "/learn/questionql", query)

    proxyReq, err := http.NewRequest("POST", url, bytes.NewReader(body))
    if err != nil{
      panic(err)
    }

    proxyReq.Header.Set("Host", r.Host)
    proxyReq.Header.Set("X-Forwarded-For", r.RemoteAddr)

    for header, values := range r.Header {
        for _, value := range values {
            proxyReq.Header.Add(header, value)
        }
    }

    client := &http.Client{}
    proxyRes, err := client.Do(proxyReq)
    bodyBytes, err2 := ioutil.ReadAll(proxyRes.Body)
    if err2 != nil{
      panic(err2)
    }
    bodyString := string(bodyBytes)
    w.Header().Set("Content-Type", "application/json")
    w.Write([]byte(bodyString))

}

func ProxyMeta(w http.ResponseWriter, r *http.Request) {
    body, err := ioutil.ReadAll(r.Body)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    query := r.URL.Query().Encode()
    // you can reassign the body if you need to parse it as multipart
    r.Body = ioutil.NopCloser(bytes.NewReader(body))
    //+ query.Encode()
    url := fmt.Sprintf("%s://%s%s?%s", "http", proxy, "/learn/tagql", query)

    proxyReq, err := http.NewRequest("POST", url, bytes.NewReader(body))
    if err != nil{
      panic(err)
    }

    proxyReq.Header.Set("Host", r.Host)
    proxyReq.Header.Set("X-Forwarded-For", r.RemoteAddr)

    for header, values := range r.Header {
        for _, value := range values {
            proxyReq.Header.Add(header, value)
        }
    }

    client := &http.Client{}
    proxyRes, err := client.Do(proxyReq)
    bodyBytes, err2 := ioutil.ReadAll(proxyRes.Body)
    if err2 != nil{
      panic(err2)
    }
    bodyString := string(bodyBytes)
    w.Header().Set("Content-Type", "application/json")
    w.Write([]byte(bodyString))

}
