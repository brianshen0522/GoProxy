module.exports = {
  apps : [{
    name   : "GoProxy",
    cwd: "/home/user/GoProxy",
    script : "./api.py",
    interpreter: "/home/user/goproxy/bin/python3",
    out_file: "/home/user/GoProxy/pm2-log/log.log",
    error_file: "/home/user/GoProxy/pm2-log/error.log",
    autorestart: false
  }]
}
