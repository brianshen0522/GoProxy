package main

import(
        "os"
        "log"
        "net/url"
        "net/http"
        "net/http/httputil"
)
var port = os.Args[1]
var target = os.Args[2]

//var port = "8080"
//var target = "https://google.com"

func main() {
        remote, err := url.Parse(target)
        if err != nil {
                panic(err)
        }

        handler := func(p *httputil.ReverseProxy) func(http.ResponseWriter, *http.Request) {
                return func(w http.ResponseWriter, r *http.Request) {
                        log.Println(port, r.URL)
                        r.Host = remote.Host
                        w.Header().Set("X-Ben", "Rad")
                        p.ServeHTTP(w, r)
                }
        }
        
        proxy := httputil.NewSingleHostReverseProxy(remote)
        http.HandleFunc("/", handler(proxy))
        err = http.ListenAndServe(":"+ port , nil)
        if err != nil {
                panic(err)
		}
}