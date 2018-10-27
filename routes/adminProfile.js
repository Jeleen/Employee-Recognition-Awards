var express = require('express');
var router = express.Router();

router.get('/adminProfile', function(req, res, next){
	//until we save current admin logged in, just return 1st admin to my profile
	//appRepo.getAdminById(req.body.id).then((admin) => {
	appRepo.getAdminById(1).then((admin) => {
	res.render('adminProfile',  {admin: admin, title: "My Profile", layout: "adminProfileLayout.hbs" });
    }).catch(error => console.log('Error getting admin: ', error));
});

module.exports = router;
