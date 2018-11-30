var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
const bodyParser = require('body-parser');
const latex = require('node-latex');
const fs = require('fs');
var hbs = require('hbs');

var sessionConfig = {
  secret: 'so secretive',
  saveUninitialized: true,
  resave: true,
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
var adminProfileRouter = require('./routes/adminProfile');
var addUserRouter = require('./routes/addUser');
var addAdminRouter = require('./routes/addAdmin');
var businessIntelligenceAdminRouter = require('./routes/businessIntelligenceAdmin');
var businessIntelligenceUserRouter = require('./routes/businessIntelligenceUser');
var businessIntelligenceAwardRouter = require('./routes/businessIntelligenceAward');
var editUsersRouter = require('./routes/editUsers');
var editAdminsRouter = require('./routes/editAdmins');
var getAllAdminsRouter = require('./routes/getAllAdmins');
var getAllUsersRouter = require('./routes/getAllUsers');
var awardRouter = require('./routes/award');
var exportCSVRouter = require('./routes/exportCSV');
var customBIRouter = require('./routes/customBI');
var forgotPasswordRouter = require('./routes/forgotPassword');
var adminProfileChangePasswordRouter = require('./routes/adminProfileChangePassword');
var adminProfileEditRouter = require('./routes/adminProfileEdit');
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

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/forgotPassword', forgotPasswordRouter);
// Check if user is logged in for every route except ones above this line (like login)
app.use(function(req, res, next) {
  if (!req.session || !req.session.loggedInId) {
    res.redirect('/login');
  } else {
    next();
  }
});
app.use('/logout', logoutRouter);
app.use('/user_dashboard', userDashboardRouter);
app.use('/create_award', createAwardRouter);
app.use('/edit_profile', editProfileRouter);
app.use('/award', awardRouter);

// Admin pages
app.use(function(req, res, next) {
  if (!req.session.isAdmin) {
    res.redirect('/login');
  } else {
    next();
  }
})
app.use('/adminProfile', adminProfileRouter);
app.use('/adminProfileEdit', adminProfileEditRouter);
app.use('/adminProfileChangePassword', adminProfileChangePasswordRouter);
app.use('/getAllAdmins', getAllAdminsRouter);
app.use('/getAllUsers', getAllUsersRouter);
app.use('/editAdmins', editAdminsRouter);
app.use('/editUsers', editUsersRouter);
app.use('/businessIntelligenceAdmin', businessIntelligenceAdminRouter);
app.use('/businessIntelligenceUser', businessIntelligenceUserRouter);
app.use('/businessIntelligenceAward', businessIntelligenceAwardRouter);
app.use('/addUser', addUserRouter);
app.use('/addAdmin', addAdminRouter);
app.use('/exportCSV', exportCSVRouter);
app.use('/customBI', customBIRouter);

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

// helper function to convert dates to shorter format UTC time
hbs.registerHelper('convertDate', function(myDate){
	var date1 = new Date(myDate);
	var year = date1.getFullYear();
	var month = ('0' + (date1.getMonth() + 1)).slice(-2);
	var date = ('0' + date1.getDate()).slice(-2);
	var hours = ('0' + date1.getUTCHours()).slice(-2);
	var minutes = ('0' + date1.getUTCMinutes()).slice(-2);
	var seconds = ('0' + date1.getUTCSeconds()).slice(-2);
	var shortDate = month + '/' + date + '/' + year + ' ' + hours + ':' + minutes + ':' + seconds + ' UTC';
	return shortDate;
});


module.exports = app;
