//TODO: AuthO,
//track current user,
//add users,
//connect to our actual server,
//track attempted logins, reset when login correctly
// reconfig the tables and visible data
var mysql = require('./dbcon.js');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
var session = require('express-session');
var currentUser = 0;
var sleep = require('system-sleep');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({secret:'Super', saveUninitialized: true, resave: true}));
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 5642);


app.get('/', function(req, res, next){
	var context = {};

		res.render('adminLoginPage', context);

});

app.post('/adminLogin', function(req, res){
	var context = {};
	mysql.pool.query('SELECT * FROM admin WHERE email=?', [req.body.email], function(err, result){
		if(err){
			res.render('adminLoginPage');
			return;
		}
		//if invalid login, reload page
		if(result.length == 0){
			res.render('adminLoginPage');
			return;
		}				//mysql.pool.query('UPDATE admin SET login_attempts=login_attempts+1 WHERE email=?', [req.body.email], function(err, result){
//TODO: update last login, sign in attempts

		//
		context.results = result;
		//if(context.results[0].password == req.body.password){
			//context.results = result;
			currentUser = context.results.admin_id;
			console.log(context.results[0].admin_id);

			res.render('displayMyAdmin', context);
		//}

		//else{
		//	res.render('adminLoginPage', context);
		//}
	});
});

app.post('/myAdmin', function(req, res){
	var context = {};
	console.log(currentUser);
	mysql.pool.query('SELECT * FROM admin WHERE admin_id=?', [currentUser], function(err, result){
		if(err){
			next(err);
			return;
		}
		context.results = result;
			//later i will need to stringify data, mess with parsing when
			//interacting with a server
			console.log(result);
			context.results = result;
		console.log(context.results[0].admin_id);

			res.render('displayMyAdmin', context);

	});
});



app.get('/getAllAdminAccounts', function(req, res, next){
	var context = {};
	mysql.pool.query('SELECT * FROM `admin`', function(err, ret, fields){
		if(err){
			next(err);
			return;
		}
		//later i will need to stringify data, mess with parsing when
		//interacting with a server
		console.log(ret);
		context.results = ret;
		res.render('displayOtherAdmin', context);
	});
});


app.post('/updateMyAdmin', function(req, res){
	var context = {};
	console.log(req.body);

	if(req.body['Save']){
		mysql.pool.query('UPDATE admin SET email=? WHERE admin_id=?', [req.body.email, req.body.admin_id], function(err, ret){
			if(err){
				throw(err);
				return;
			}
			var context2 = {};
				mysql.pool.query('SELECT * FROM admin WHERE admin_id=?', [req.body.admin_id],
				 function(err, ret2, fields){
					if(err){
						next(err);
						return;
					}
					context2.results2 = ret2;
					console.log(context2.results2);
					res.render('displayMyAdmin', context2);
	});
		});



	}
	if(req.body['Edit']){
			mysql.pool.query('DELETE FROM `admin` where admin_id = ?', [req.body.admin_id],
			function(err, ret){
				if(err){
					next(err);
					return;
				}
			});
	}

});





app.post('/updateOtherAdmin', function(req, res){
	var context = {};
	console.log(req.body);

	if(req.body['Save']){
		mysql.pool.query('UPDATE admin SET email=? WHERE admin_id=?', [req.body.email, req.body.admin_id], function(err, ret){
			if(err){
				throw(err);
				return;
			}
			var context2 = {};
				mysql.pool.query('SELECT * FROM admin',
				 function(err, ret2, fields){
					if(err){
						next(err);
						return;
					}
					context2.results2 = ret2;
							console.log(context2.results2);

					res.render('displayOtherAdmin', context2);
	});
		});



	}
	if(req.body['Edit']){
			mysql.pool.query('DELETE FROM `admin` where admin_id = ?', [req.body.admin_id],
			function(err, ret){
				if(err){
					next(err);
					return;
				}
			});
	}

});


app.listen(app.get('port'), function(){
	console.log('Express started on ' + app.get('port'));
});
