var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var sql = require('../db/sql');
var uuid = require('node-uuid');
const dbconfig = {
    host: 'localhost',
    port: '3306',
    user: "root",
    password: "123456",
    database: "db_jvt"
};
var connection;

function handleDisconnect() {
    connection = mysql.createConnection(dbconfig);
    connection.connect(function (err) {
        if (err) {
            console.log("进行断线重连：" + new Date());
            setTimeout(handleDisconnect, 2000);   //2秒重连一次
            return;
        }
        console.log("连接成功");
    });
    connection.on('error', function (err) {
        console.log('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect();
        } else {
            throw err;
        }
    });
}

router.post('/add', function (req, res, next) {
    handleDisconnect();
    console.log('=================req================');
    console.log(req.body)

    connection.query(sql.insert, [uuid.v4(), req.body.code, req.body.name, req.body.password, req.body.email, new Date(), 1, 1], function (err, result) {
        if (err) {
            console.log('[INSERT ERROR] -- ', err.message);
            res.json("注册失败！");
            return;
        }
        console.log(result);
        res.json("注册成功！");
    });
    //web请求中可以不断连接
    connection.end();
});

module.exports = router;
