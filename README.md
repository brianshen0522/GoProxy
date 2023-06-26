# GoProxy

GoProxy is a simple proxy server implementation using Flask in Python and Go programming language. It allows you to dynamically add, delete, and restart proxy instances.

## Features

- Add new proxy instances by providing the URL and description.
- Delete existing proxy instances by specifying the port.
- Restart the proxy server to apply changes or reset the proxy instances.
- Retrieve the current status of the proxy instances.

## Prerequisites

To run the GoProxy project, ensure that you have the following prerequisites installed:

- Python 3.x
- Go 1.16 or higher

## Installation

1. Clone the repository:
```
git clone https://github.com/your-username/GoProxy.git
cd GoProxy
```

2. Install the required Python packages:
```
pip install -r requirements.txt
```

3. Build the Go executable:
```
go build proxy.go
```

## Configuration

The proxy instances are defined in the `config.json` file. You can modify this file to add or remove proxy instances. Each proxy instance requires the following properties:

- `port`: The port on which the proxy will listen.
- `target`: The target URL to which the proxy will forward requests.
- `description`: An optional description for the proxy instance.

## Usage

1. Start the proxy server:
```
python api.py
```

2. Interact with the proxy server using the following endpoints:

- `GET /add?url=<target-url>&description=<description>`: Add a new proxy instance.
- `GET /delete?port=<port-number>`: Delete an existing proxy instance.
- `GET /restart/`: Restart the proxy server.
- `GET /status`: Get the current status of the proxy instances.

## Example

To add a new proxy instance that proxies requests to `https://example.com` on port 8084:
```
curl "http://localhost:8080/add?url=https://example.com&description=Example+Proxy"
```

To delete the proxy instance running on port 8084:
```
curl "http://localhost:8080/delete?port=8084"
```

To restart the proxy server:
```
curl "http://localhost:8080/restart/"
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for bug fixes, improvements, or new features.

## Acknowledgements

- This project was inspired by the need for a simple and dynamic proxy server implementation.
- The Flask and Go programming languages were used to build the proxy server.
- Special thanks to the contributors and maintainers of the Flask and Go communities.