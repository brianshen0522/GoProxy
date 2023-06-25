package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"
	"os"
)

type ProxyConfig struct {
	Port   string `json:"port"`
	Target string `json:"target"`
}

type Config struct {
	ProxyConfigs []ProxyConfig `json:"proxies"`
}

func proxy() {
	config, err := loadConfig("config.json")
	if err != nil {
		log.Fatal("Error loading config file:", err)
	}

	stop := make(chan struct{}) // Channel for stopping the server

	go func() {
		for {
			select {
			case <-stop:
				return
			default:
				data, err := ioutil.ReadFile("tmp/thread")
				if err != nil {
					log.Println("Error reading thread file:", err)
					continue
				}

				if string(data) == "0" {
					log.Println("Received stop signal, shutting down the server.")
					close(stop)
					return
				}
			}
		}
	}()

	for _, proxyConfig := range config.ProxyConfigs {
		targetURL, err := url.Parse(proxyConfig.Target)
		if err != nil {
			log.Fatal("Error parsing target URL:", err)
		}

		proxy := httputil.NewSingleHostReverseProxy(targetURL)

		mux := http.NewServeMux()

		mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
			r.Host = targetURL.Host
			// log.Printf("Proxying request from port %s to %s", proxyConfig.Port, targetURL.String())
			proxy.ServeHTTP(w, r)
		})

		go func(port string) {
			log.Printf("Starting reverse proxy server on port %s", port)
			log.Fatal(http.ListenAndServe(port, mux))
		}(":" + proxyConfig.Port)
	}

	<-stop
}

func loadConfig(filename string) (*Config, error) {
	file, err := os.Open(filename)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	var config Config
	err = json.NewDecoder(file).Decode(&config)
	if err != nil {
		return nil, err
	}

	return &config, nil
}

func main() {
	proxy()
}
