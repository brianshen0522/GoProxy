from curses import flash
from imghdr import what
import json
import threading
import os

from flask import Flask
app = Flask(__name__)

def killport(port):
    out = os.popen("sudo netstat -ltpn |grep " + port).read()
    out = out[80:out.find("/")]
    if out:
        os.system(f"sudo kill -9 {out}")

def proxy (port, targeturl):
    print(port, targeturl)
    killport(port)
    os.system("./proxy " + port + " " + targeturl)

def restart():
    activateport = []
    with open("activateport.json", "r") as outfile:
        activateport = json.load(outfile)
    print(activateport)
    for x in activateport:
        killport(str(x))
    with open("activateport.json", "w") as outfile:
        activateport = []
        json.dump(activateport, outfile)
    with open("list.json", "r") as outfile:
        json_array = json.load(outfile)
    for item in json_array:
        port = item["port"]
        targeturl = item["target"]
        enable = item["enable"]
        if enable == 1:
            activateport.append(int(port))
            t = threading.Thread(target = proxy, args = (port, targeturl))
            t.name = port + " ==> " + targeturl
            try:
                t.start()
            except:
                print("[!ERROR!]proxy failed to start")
        with open("activateport.json", "w") as outfile:
            outfile.write(str(activateport))

@app.route("/restart")
def restartapi():
    restart()
    return "restart successful!!!"

@app.route("/status")
def statusapi():
    threadslist = []
    for thread in threading.enumerate(): 
        threads = ""
        print(thread.name)
        threadslist.append(thread.name)
        for x in threadslist[2:-1]:
            threads += x + "\n"
    
    return threads.replace('\n', '<br>')

print(os.getpid())
try:
    if __name__ == "__main__":
    # Port 監聽8088，並啟動除錯模式。
        app.run(host="0.0.0.0", port=1111, debug=True)
except:
    killport("1111")