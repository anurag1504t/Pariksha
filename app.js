var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
var passport = require('passport');
var config = require('./config');
var cors = require('cors');
var compression = require('compression');

// Mounting Express Routes
var usersRouter = require('./routes/users');
var uploadRouter = require('./routes/uploadRouter');
var examRouter = require('./routes/examRouter');
var commentRouter = require('./routes/commentRouter');

// Establishing Database Connection
const url = config.mongoUrl;
const connect = mongoose.connect(url, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true 
});

connect.then((db) => {
    console.log("Connected correctly to Database server");
}, (err) => { console.log(err); });

var app = express();

app.use(express.static(path.join(__dirname, "client", "build")));

app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
app.use(compression());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', usersRouter);
app.use('/imageUpload',uploadRouter);
app.use('/exams', examRouter);
app.use('/comments',commentRouter);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

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