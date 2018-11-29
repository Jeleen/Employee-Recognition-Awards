var express = require('express');
var router = express.Router();

/***************************************************
* Route for Accounts "Users" gets all User accounts
***************************************************/
router.get('/', function(req, res, next) {
appRepo.getAllUsers().then((users) => {
	res.render('getAllUsers',  {users: users});
  }).catch(error => console.log('Error getting all admin: ', error));
});

module.exports = router;
