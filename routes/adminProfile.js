var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
	 // appRepo.getUserById(req.session.loggedInId).then((admin) => {
		  appRepo.getUserById(1).then((admin) => {
	res.render('adminProfile',  {admin: admin, title: "My Profile" });
    }).catch(error => console.log('Error getting admin: ', error));
});

router.post('/', function(req, res, next){
	appRepo.updateAdminEmail(req.body.email, req.body.id)
  .then((data) => console.log('Succesfully updated admin email'))
.catch((error) => console.log('Error updating admin email', error));

	appRepo.getAdminById(req.body.id).then((admin) => {
	res.render('adminProfile',  {admin: admin, title: "My Profile" });
    }).catch(error => console.log('Error getting admin: ', error));
});
module.exports = router;
