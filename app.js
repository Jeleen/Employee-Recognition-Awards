var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
const bodyParser = require('body-parser');
const latex = require('node-latex');
const fs = require('fs');

var sessionConfig = {
  secret: 'so secretive',
  cookie: { }
};

const AwardDao = require('./dao');
const AppRepository = require('./app_repository');
const dao = new AwardDao('./mydb.db3');
appRepo = new AppRepository(dao);
appRepo.createRepo();

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
var userDashboardRouter = require('./routes/user_dashboard');
var createAwardRouter = require('./routes/create_award');
var editProfileRouter = require('./routes/edit_profile');
var accountsMainRouter = require('./routes/accountsMain');
var adminProfileRouter = require('./routes/adminProfile');
var addUserRouter = require('./routes/addUser');
var addAdminRouter = require('./routes/addAdmin');
var businessIntelligenceRouter = require('./routes/businessIntelligence');
var editUsersRouter = require('./routes/editUsers');
var editAdminsRouter = require('./routes/editAdmins');

var getAllAdminsRouter = require('./routes/getAllAdmins');
var getAllUsersRouter = require('./routes/getAllUsers');
var awardRouter = require('./routes/award');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sessionConfig));


app.use('/login', loginRouter);
// Check if user is logged in for ever route except ones above this line (like login)
app.use(function(req, res, next) {
  if (!req.session || !req.session.loggedInId) {
    res.redirect('/login');
  } else {
    next();
  }
});
app.use('/', indexRouter);
app.use('/logout', logoutRouter);
app.use('/user_dashboard', userDashboardRouter);
app.use('/create_award', createAwardRouter);
app.use('/edit_profile', editProfileRouter);
app.use('/accountsMain', accountsMainRouter);
app.use('/adminProfile', adminProfileRouter);
app.use('/getAllAdmins', getAllAdminsRouter);
app.use('/getAllUsers', getAllUsersRouter);
app.use('/editAdmins', editAdminsRouter);
app.use('/editUsers', editUsersRouter);
app.use('/businessIntelligence', businessIntelligenceRouter);
app.use('/addUser', addUserRouter);
app.use('/addAdmin', addAdminRouter);
app.use('/award', awardRouter);

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
