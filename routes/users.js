var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var sql = require('../db/sql');
var uuid = require('node-uuid');
var moment = require('moment');
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

function handleData(result) {
    var data = [], tempData;
    tempData = JSON.parse(JSON.stringify(result));
    if (tempData && tempData.length > 0) {
        tempData.forEach(function (value, index) {
            data.push({
                id: value.id,
                code: value.code,
                name: value.name,
                password: value.password,
                email: value.email,
                add_time: value.add_time ? moment(value.add_time).format('YYYY-MM-DD HH:mm:ss') : '1970-01-01'
            });
        });
    }

    return data;
}

/* GET users listing. */
router.get('/queryAll', function (req, res, next) {
    handleDisconnect();
    connection.query(sql.queryAll, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }
        var data = handleData(result);
        res.render('user', {users: data});
        console.log("QUERY SUCCEED --" + JSON.stringify(data));
    });
    //web请求中可以不断连接
    connection.end();
});

router.post('/add', function (req, res, next) {
    handleDisconnect();
    console.log('=================req================');
    console.log(req.body)

    connection.query(sql.insert, [uuid.v4(), req.body.code, req.body.name, req.body.password, req.body.email, new Date()], function (err, result) {
        if (err) {
            console.log('[INSERT ERROR] -- ', err.message);
            res.json("添加数据失败");
            return;
        }
        console.log(result);
        res.json("添加数据成功");
    });
    //web请求中可以不断连接
    connection.end();
});

router.post('/update', function (req, res, next) {
    handleDisconnect();
    console.log('=================req================');
    console.log(req.body)
    //id,name,age,sex,birth
    connection.query(sql.updatePerson, [req.body.code, req.body.name, req.body.email, req.body.id], function (err, result) {
        if (err) {
            console.log('[UPDATE ERROR] - ', err.message);
            res.json("编辑数据失败");
            return;
        }
        console.log(result);
        res.json("编辑数据成功");
    });
    //web请求中可以不断连接
    connection.end();
});

router.post('/delete', function (req, res, next) {
    handleDisconnect();
    console.log('=================req================');
    console.log(req.body)
    connection.query(sql.deleteById, [req.body.id], function (err, result) {
        if (err) {
            console.log('[DELETE ERROR] - ', err.message);
            res.json("删除数据失败");
            return;
        }
        console.log(result);
        res.json("删除数据成功");
    });
    //web请求中可以不断连接
    connection.end();
});

router.get('/search', function (req, res, next) {
    handleDisconnect();
    console.log('=================req================');
    console.log(req.param('name'));
    connection.query(sql.getPersonByName, ['%' + req.param('name') + '%'], function (err, result) {
        if (err) {
            console.log('[查询 ERROR] - ', err.message);
            return;
        }
        var data = handleData(result);
        res.render('user', {users: data});
        console.log("查询 SUCCEED--" + data);
    });
    //web请求中可以不断连接
    connection.end();
});

module.exports = router;
