# api.py
import time
import platform
import subprocess
import threading
from flask_cors import CORS
from flask import Flask, request, jsonify,make_response,render_template
import json
from datetime import datetime
from pprint import pprint

app = Flask(__name__)
CORS(app)
json_file_path = 'config.json'

def proxy():
    if platform.system() == "Windows":
        subprocess.run("./proxy.exe")
        print(datetime.today().strftime("%Y/%m/%d"), datetime.now().strftime("%H:%M:%S"), "Servers have stopped.")
    elif platform.system() == "Linux":
        subprocess.run("./proxy")
        print(datetime.today().strftime("%Y/%m/%d"), datetime.now().strftime("%H:%M:%S"), "Servers have stopped.")
    else:
        print("OS")
    
def read_json_to_list(file_path):
    with open(file_path, 'r') as file:
        data = json.load(file)
        return data['proxies']

def write_list_to_json(proxies_list):
    data = {'proxies': proxies_list}
    with open(json_file_path, 'w') as file:
        json.dump(data, file, indent=4)

def find_available_port(proxies_list):
    used_ports = {int(proxy['port']) for proxy in proxies_list}
    available_port = next((port for port in range(8081, 8100) if port not in used_ports), None)
    return available_port

@app.route('/')
def home():
   return render_template('./view/index.html')

@app.route('/restart/', methods=['GET'])
def restart():
    with open("tmp/thread", "w") as f:
        f.write("0")
    time.sleep(0.5)
    with open("tmp/thread", "w") as f:
        f.write("1")
    proxy_t = threading.Thread(target=proxy)
    proxy_t.start()
    return 'Proxy restarted', 200

@app.route("/add", methods=['GET'])
def add():
    url = request.args.get('url')
    description = request.args.get('description')
    if not url.startswith("https://"):
        return 'URL must start with https://', 400

    proxies_list = read_json_to_list(json_file_path)
    available_port = find_available_port(proxies_list)
    if available_port is None:
        return 'no available port for the new proxy', 503

    proxy = {'port': str(available_port), 'target': url, 'description': description}
    proxies_list.append(proxy)
    proxies_list = sorted(proxies_list, key=lambda x: int(x['port']))
    write_list_to_json(proxies_list)
    res = make_response('proxy added', 201)

    return res

@app.route("/delete", methods=['GET'])
def delete():
    delete_port_str = request.args.get('port')
    # print(delete_port_str)
    delete_port_arr= delete_port_str.split(',')
    print(delete_port_arr)
    
    proxies_list = read_json_to_list(json_file_path)
    updated_proxies_list = proxies_list
    
    for port in delete_port_arr:
        updated_proxies_list = [proxy for proxy in updated_proxies_list if proxy["port"] != port]

        if len(updated_proxies_list) == len(proxies_list):
            return 'port not found', 406
        
        updated_proxies_list = sorted(updated_proxies_list, key=lambda x: int(x['port']))

    pprint(updated_proxies_list)
    write_list_to_json(updated_proxies_list)

    return 'proxy deleted', 200

@app.route("/status", methods=['GET'])
def status():
    with open(json_file_path, 'r') as file:
        config_data = json.load(file)
    return jsonify(config_data)

if __name__ == '__main__':
    # from waitress import serve
    # serve(app, host="0.0.0.0", port=8080)
    app.run(debug=True)