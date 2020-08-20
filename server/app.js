var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var authenticate = require('./authenticate');
var config = require('./config');

// Mounting Express Routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var uploadRouter = require('./routes/uploadRouter');
var examRouter = require('./routes/examRouter');

// Establishing Database Connection
const url = config.mongoUrl;
const connect = mongoose.connect(url, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true 
});

connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');

app.use('/imageUpload',uploadRouter);
app.use('/exams', examRouter);

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