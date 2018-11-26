var express = require('express');
var router = express.Router();

/***************************************************
* Route for Accounts "Users" gets all User accounts
***************************************************/
router.get('/', function(req, res, next) {
appRepo.getAllUsers().then((users) => {
	res.render('accountsMain',  {users: users, title: "Accounts" });
  }).catch(error => console.log('Error getting all admin: ', error));
});

module.exports = router;
