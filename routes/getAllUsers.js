var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
appRepo.getAllUsers().then((users) => {
	res.render('accountsMain',  {users: users, title: "Accounts" });
  }).catch(error => console.log('Error getting all admin: ', error));
});

module.exports = router;
