var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')
const intents = require('./routes/intents')


mongoose.Promise = global.Promise

mongoose.connect('mongodb://admin:1234@ac-gywl8rj-shard-00-00.jw9s3wu.mongodb.net:27017,ac-gywl8rj-shard-00-01.jw9s3wu.mongodb.net:27017,ac-gywl8rj-shard-00-02.jw9s3wu.mongodb.net:27017/?ssl=true&replicaSet=atlas-l91i28-shard-0&authSource=admin&retryWrites=true&w=majority')
.then(()=>console.log('Connect Success'))
.catch((err)=>console.error(err))

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/intents', intents);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
