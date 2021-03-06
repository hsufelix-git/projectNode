var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

/**
 * 配置数据库链接模块
 */
var mongoose = require('mongoose');
console.info("============run mongoose========");
console.info(mongoose);
var session = require('express-session');
console.info("============run session========");
console.info(session);
var MongoStore = require('connect-mongo')(session);
console.info("============run MongoStore========");
console.info(MongoStore);

// 自行配置一个路由（新建了一个文件夹和routes.js）
// 配置对应的routes(app);
var routes = require('./config/routes');
// 自行配置数据库数据
var DBsetting = require('./config/DBsetting');
/**
 * 屏蔽掉原先新建项目时，项目自新建的路由，保证路由模块化
 */
//var routes = require('./routes/index');
//var users = require('./routes/users');

var app = express();
// 添加链接的数据库
mongoose.connect('mongodb://localhost/blog');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
var ejs =  require('ejs');
app.engine('.ejs',ejs.__express);
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', routes);
// app.use('/users', users);

// app.use(session({
//   secret:"45454",
//   store:new MongoStore({
//     cookieSecret:DBsetting.cookieSecret,
//     db:DBsetting.db,
//     host:DBsetting.host
//   })
// }));

app.use(session({
  secret: DBsetting.cookieSecret,
  key: DBsetting.db,//cookie name
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({
    /*db: settings.db,
    host: settings.host,
    port: settings.port*/
    url: 'mongodb://localhost/blog'
  })}));


routes(app);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
/**
 * 安装数据库的时候，需要使用到的模块
 * express-session
 * connect-mongo
 * 
 */
module.exports = app;
