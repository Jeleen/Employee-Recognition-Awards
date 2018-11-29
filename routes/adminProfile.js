var express = require('express');
var router = express.Router();

/**************************************
* Route for 'adminProfile' main page,
* displays currently logged in admin info
**************************************/
router.get('/', function(req, res, next){
	  appRepo.getAdminById(req.session.loggedInId).then((admin) => {
		res.render('adminProfile',  {admin});
    }).catch(error => console.log('Error getting admin: ', error));
});

module.exports = router;
