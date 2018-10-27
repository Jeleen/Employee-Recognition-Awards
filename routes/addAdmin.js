var express = require('express');
var router = express.Router();

/* GET home page. */
var d = new Date();
var b = d.toString();
router.post('/addAdmin', function(req, res, next) {
	appRepo.createAdmin(req.body.email, "*****", b)
	  .then((data) => console.log('Successfully created admin'))
.catch((error) => console.log('Error creating admin', error));

appRepo.getAllAdmins().then((admins) => {
	res.render('accountsMain',  {admins: admins, title: "Accounts", layout: "layoutAccounts.hbs"});
  }).catch(error => console.log('Error getting all admin: ', error));
});

module.exports = router;

