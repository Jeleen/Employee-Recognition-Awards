var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
appRepo.getAllAdmins().then((admins) => {
	res.render('accountsMain',  {admins: admins, title: "Accounts"});
  }).catch(error => console.log('Error getting all admin: ', error));
});
module.exports = router;
