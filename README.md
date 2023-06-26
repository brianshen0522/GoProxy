# proxy
this project allows access to an HTTPS server using an HTTP connection. By setting up the reverse proxy, the project enables clients to send HTTP requests to the proxy, which then forwards those requests to the HTTPS server.

## info
The proxy.go file is responsible for implementing the reverse proxy functionality. It listens on a specified port and receives incoming HTTP requests. The requests are then forwarded to the target URL specified in the command-line arguments. The reverse proxy modifies the requests by setting the Host header to match the host of the target URL. Additionally, it adds a custom header, X-Ben: Rad, to the response before forwarding it back to the client.

The start.py file serves as a management script that provides an API for controlling and monitoring the reverse proxy instances. It uses the Flask framework to create a simple API with two endpoints: /restart and /status. The /restart endpoint triggers the restart process, which involves stopping any active proxies and starting new proxy instances based on the configurations provided in a JSON file. The /status endpoint returns the status of the running threads, which corresponds to the active proxy instances.

## INSTALLATION
clone this repo and install python3, make the file "proxy" executable, and run start.py.

- This project was inspired by the need for a simple and dynamic proxy server implementation.
- The Flask and Go programming languages were used to build the proxy server.
- Special thanks to the contributors and maintainers of the Flask and Go communities.