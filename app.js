var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const AwardDao = require('./dao');
const AppRepository = require('./app_repository');
const dao = new AwardDao('./mydb.db3');
appRepo = new AppRepository(dao);
appRepo.createRepo();

var indexRouter = require('./routes/index');
var login2Router = require('./routes/login2');
var accountsMainRouter = require('./routes/accountsMain');
var adminProfileRouter = require('./routes/adminProfile');
var adminProfileEditRouter = require('./routes/adminProfileEdit');
var addUserRouter = require('./routes/addUser');
var businessIntelligenceRouter = require('./routes/businessIntelligence');
var preAddUserRouter = require('./routes/preAddUser');
var editUsersRouter = require('./routes/editUsers');
var editAdminsRouter = require('./routes/editAdmins');

var getAllAdminsRouter = require('./routes/getAllAdmins');
var getAllUsersRouter = require('./routes/getAllUsers');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', indexRouter);
app.get('/login2', login2Router);
app.get('/accountsMain', accountsMainRouter);
app.get('/adminProfile', adminProfileRouter);
app.post('/adminProfileEdit', adminProfileEditRouter);
app.get('/getAllAdmins', getAllAdminsRouter);
app.get('/getAllUsers', getAllUsersRouter);
app.post('/editAdmins', editAdminsRouter);
app.post('/editUsers', editUsersRouter);
app.get('/businessIntelligence', businessIntelligenceRouter);
app.get('/addUser', addUserRouter);
app.get('/preAddUser', preAddUserRouter);

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
