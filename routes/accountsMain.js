var express = require('express');
var router = express.Router();

/***************************************************
* Route for 'Accounts' main page defaults to Admins
***************************************************/
router.get('/', function(req, res, next){
	appRepo.getAllAdmins().then((admins) => {
		res.render('accountsMain',  {admins: admins, subTitle: "Admin accounts" });
}).catch(error => console.log('Error getting all admin: ', error));  });

module.exports = router;
