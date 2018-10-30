var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
	if(req.body.delete == "delete"){
	   appRepo.removeAdmin(req.body.id)
       .then((data) => console.log('Succesfully removed admin'))
	   .catch((error) => console.log('Error removing admin', error));

      appRepo.getAllAdmins().then((admins) => {
		res.render('accountsMain',  {admins: admins, title: "Accounts" });
     }).catch(error => console.log('Error getting all admin: ', error));
     }
     else{
       appRepo.updateAdminEmail(req.body.email, req.body.id)
 	  .then((data) => console.log('Succesfully updated admin email'))
      .catch((error) => console.log('Error updating admin email', error));

      appRepo.getAllAdmins().then((admins) => {
		res.render('accountsMain',  {admins: admins, title: "Accounts" });
     }).catch(error => console.log('Error getting all admin: ', error));
     }
});

module.exports = router;

