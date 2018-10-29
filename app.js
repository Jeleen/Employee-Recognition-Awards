/*// Include the cluster module
var cluster = require('cluster');

// Code to run if we're in the master process
if (cluster.isMaster) {

    // Count the machine's CPUs
    var cpuCount = require('os').cpus().length;

    // Create a worker for each CPU
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }

    // Listen for terminating workers
    cluster.on('exit', function (worker) {

        // Replace the terminated workers
        console.log('Worker ' + worker.id + ' died :(');
        cluster.fork();

    });

// Code to run if we're in a worker process
} else {*/
  //  var AWS = require('aws-sdk');
    var createError = require('http-errors');
	var express = require('express');
	var path = require('path');
	var cookieParser = require('cookie-parser');
	var logger = require('morgan');
  //  AWS.config.region = process.env.REGION
	//var sns = new AWS.SNS();
    //var ddb = new AWS.DynamoDB();
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
	var addAdminRouter = require('./routes/addAdmin');
	var preAddAdminRouter = require('./routes/preAddAdmin');
	var getAllAdminsRouter = require('./routes/getAllAdmins');
	var getAllUsersRouter = require('./routes/getAllUsers');

	var usersRouter = require('./routes/users');
	var userDashboardRouter = require('./routes/user_dashboard');
	var createAwardRouter = require('./routes/create_award');
	var editProfileRouter = require('./routes/edit_profile');
	var awardRouter = require('./routes/award');

	var app = express();

	// view engine setup
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'hbs');
	//app.use(logger('dev'));
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	app.use(cookieParser());
	app.use(express.static(path.join(__dirname, 'public')));

	app.get('/', indexRouter);
	app.post('/login2', login2Router);
	app.get('/accountsMain', accountsMainRouter);
	app.get('/adminProfile', adminProfileRouter);
	app.post('/adminProfileEdit', adminProfileEditRouter);
	app.get('/getAllAdmins', getAllAdminsRouter);
	app.get('/getAllUsers', getAllUsersRouter);
	app.post('/editAdmins', editAdminsRouter);
	app.post('/editUsers', editUsersRouter);
	app.get('/businessIntelligence', businessIntelligenceRouter);
	app.post('/addUser', addUserRouter);
	app.get('/preAddUser', preAddUserRouter);
	app.post('/addAdmin', addAdminRouter);
	app.get('/preAddAdmin', preAddAdminRouter);
	app.get('/users', usersRouter);
	app.use('/user_dashboard', userDashboardRouter);
	app.use('/create_award', createAwardRouter);
	app.use('/create_award', createAwardRouter);
	app.use('/edit_profile', editProfileRouter);
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
// 	var port = process.env.PORT || 3000;
//    var server = app.listen(port, function () {
//        console.log('Server running at http://127.0.0.1:' + port + '/');
//    });
//}