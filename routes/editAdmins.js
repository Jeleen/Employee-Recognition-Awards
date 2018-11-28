var express = require('express');
var router = express.Router();

/**********************************************
* Route for saving edits or deleting accounts.
**********************************************/
router.post('/', function(req, res, next) {
	console.log(req.body);
	if(req.body['Delete'] == "Delete"){
	   appRepo.removeAdmin(req.body.id)
       .then((data) => console.log('Succesfully removed admin'))
	   .catch((error) => console.log('Error removing admin', error));
      	appRepo.getAllAdmins().then((admins) => {
			res.render('accountsMain',  {admins: admins, title: "Accounts" });
     	}).catch(error => console.log('Error getting all admin: ', error));
     }
     else if(req.body['Edit'] == "Edit"){
		appRepo.getAdminById(req.body.id).then((adminToEdit) => {
   			res.render('accountsMain',  {adminToEdit: adminToEdit, title: "Accounts", subTitle: "Edit Admin" });
	  }).catch((error) => console.log('Error editing admin', error));
	 }
	 else if(req.body['Save'] == "Save"){
	 		appRepo.updateAdminNameAndEmail(req.body.id, req.body.name, req.body.email).then((admin) => {
				console.log(admin);
	    	 }).catch((error) => console.log('Error updating admin', error));
		      appRepo.getAllAdmins().then((admins) => {
				res.render('accountsMain',  {admins: admins, title: "Accounts" });
	 	   }).catch((error) => console.log('Error updating admin', error));
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

