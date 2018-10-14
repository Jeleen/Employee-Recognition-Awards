var express = require('express');
var router = express.Router();

/* EDIT/SAVE admin */
router.get('/adminsEdit', function(req, res) {

	//console.log("request" + util.inspect(req.body.id));
	//console.log("request" + util.inspect(req.body.email));


	appRepo.updateAdminsEmail(req.body.id, req.body.email)
	.then((data) => console.log('Admins email updated.'))
    .catch((error) => console.log('Problem updating admin email', error));

  	appRepo.getAllAdmins().then((admins) => {
	 res.render('allAdminAccounts',  {admins: admins});
  	}).catch(error => console.log('Error getting all admin: ', error));


});


module.exports = router;
