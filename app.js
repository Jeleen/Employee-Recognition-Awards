var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var login2Router = require('./routes/login2');
var adminMainRouter = require('./routes/adminMain');
var adminProfileRouter = require('./routes/adminProfile');
var adminProfileEditRouter = require('./routes/adminProfileEdit');
var addUserRouter = require('./routes/addUser');
var businessIntelligenceRouter = require('./routes/businessIntelligence');
var preAddUserRouter = require('./routes/preAddUser');
var editUserRouter = require('./routes/editUser');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login2', login2Router);
app.use('/adminMain', adminMainRouter);
app.use('/adminProfile', adminProfileRouter);
app.use('/adminProfileEdit', adminProfileEditRouter);
app.use('/businessIntelligence', businessIntelligenceRouter);
app.use('/addUser', addUserRouter);
app.use('/preAddUser', preAddUserRouter);
app.use('/editUser', editUserRouter);

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
