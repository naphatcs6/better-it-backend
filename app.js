const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose')
const intents = require('./routes/intents')
const words = require('./routes/words')
const cors = require('cors')


mongoose.Promise = global.Promise

mongoose.connect('mongodb://admin:1234@ac-gywl8rj-shard-00-00.jw9s3wu.mongodb.net:27017,ac-gywl8rj-shard-00-01.jw9s3wu.mongodb.net:27017,ac-gywl8rj-shard-00-02.jw9s3wu.mongodb.net:27017/?ssl=true&replicaSet=atlas-l91i28-shard-0&authSource=admin&retryWrites=true&w=majority')
.then(()=>console.log('Connect Success'))
.catch((err)=>console.error(err))

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/intents', intents);
app.use('/words', words);

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
