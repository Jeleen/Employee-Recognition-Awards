var express = require('express');
var router = express.Router();

/* GET home page. */
var d = Date(Date.now());
var b = d.toString();
router.post('/addUser', function(req, res, next) {
	appRepo.createUser(req.body.name, req.body.email, "******", req.body.region, b)
	  .then((data) => console.log('Successfully created user'))
.catch((error) => console.log('Error creating user', error));

appRepo.getAllUsers().then((users) => {
	res.render('accountsMain',  {users: users, title: "Accounts", layout: "layoutAccounts.hbs"});
  }).catch(error => console.log('Error getting all admin: ', error));
});

module.exports = router;

