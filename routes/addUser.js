var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('addUser',  { title: "Accounts" });
});

router.post('/', function(req, res, next) {
	if(req.body.cancel == "cancel"){
		appRepo.getAllUsers().then((users) => {
			res.render('accountsMain',  {users: users, title: "Accounts"});
	  }).catch(error => console.log('Error getting all admin: ', error));
	}
	else{
		var d = new Date();
				console.log(req.body);

		appRepo.createUser(req.body.name, req.body.email, "12345", req.body.region, req.session.loggedInId )
		.then((data) => console.log('Succesfully created user'))
		.catch((error) => console.log('Error creating user', error));

		appRepo.getAllUsers().then((users) => {
		res.render('accountsMain',  {users: users, title: "Accounts"});
	  }).catch(error => console.log('Error getting all admin: ', error));
	}
});

module.exports = router;
