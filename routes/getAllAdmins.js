var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/getAllAdmins', function(req, res, next) {
appRepo.getAllAdmins().then((admins) => {
	res.render('adminMain',  {admins: admins, title: "Accounts", layout: "layoutAccounts.hbs"});
  }).catch(error => console.log('Error getting all admin: ', error));
});
module.exports = router;
