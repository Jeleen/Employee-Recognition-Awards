var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/getAllUsers', function(req, res, next) {
appRepo.getAllUsers().then((users) => {
	res.render('adminMain',  {users: users, title: "Accounts", layout: "layoutAccounts.hbs"});
  }).catch(error => console.log('Error getting all admin: ', error));
});

module.exports = router;
