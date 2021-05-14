const mysql = require('mysql');

var pool = mysql.createPool({
    "user": " ",
    "password": " ",
    "database" : " ",
    "host": "",
    "port": 
});

exports.pool = pool;