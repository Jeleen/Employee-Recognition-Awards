var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('addAdmin',  { title: "Accounts" });
});

router.post('/', function(req, res, next) {
	if(req.body.cancel == "cancel"){
		appRepo.getAllAdmins().then((admins) => {
			res.render('accountsMain',  {admins: admins, title: "Accounts"});
	  }).catch(error => console.log('Error getting all admin: ', error));
	}
	else{
		var d = new Date();
		var b = d.toString();
		appRepo.createAdmin(req.body.email, "12345", b)
		.then((data) => console.log('Succesfully created admin'))
		.catch((error) => console.log('Error creating admin', error));

		appRepo.getAllAdmins().then((admins) => {
		res.render('accountsMain',  {admins: admins, title: "Accounts"});
	  }).catch(error => console.log('Error getting all admin: ', error));
	}
});

module.exports = router;
