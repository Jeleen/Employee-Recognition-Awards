var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/preAddUser', function(req, res, next) {
appRepo.getAllUsers().then((users) => {
	res.render('preAddUser',  { users: users, title: "Accounts" , layout: "preAddUserLayout.hbs" });
  }).catch(error => console.log('Error getting all admin: ', error));
});
module.exports = router;
