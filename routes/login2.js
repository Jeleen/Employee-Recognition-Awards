var express = require('express');
var router = express.Router();

router.post('/login2', function(req, res, next) {
	if(req.body.loginType == "admin"){
  appRepo.getAdminById(1).then((admin) => {
  	 res.render('adminProfile',  {admin: admin, title: "My Profile", layout: "adminProfileLayout.hbs"});
   }).catch(error => console.log('Error getting admin: ', error));
	}
if(req.body.loginType == "user"){
  //appRepo.getUserById(1).then((user) => {
  	 res.render('user_dashboard',  {name: req.body.user, title: "My Profile"});
 // 	 console.log(users);
 //   }).catch(error => console.log('Error getting all users: ', error));
	}
});



module.exports = router;