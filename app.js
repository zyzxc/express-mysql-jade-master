var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var register = require('./routes/register');
var login = require('./routes/login');
var app = express();
app.listen(8200, function () {
    console.log("Server Start!");
    console.log('Server running at http://localhost:3100/');

});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//index page
app.get('/', function (req, res) {
    res.render('index', {
        title: '首页'
    })
})
//register page
app.get('/reg/page', function (req, res) {
    res.render('register', {
        title: '注册页面'
    })
})
//login page
app.get('/login/page', function (req, res) {
    res.render('login', {title: '登录'})
})
// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/register', register);
app.use('/login', login);

//托管静态文件
app.use(express.static('public'));
//静态资源挂载一个虚拟路径
//app.use('/static',express.static('public'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
