var express = require('express');
var router = express.Router();

/********************************************
* Route for saving and deleting user accounts
********************************************/
router.post('/', function(req, res, next) {
	if(req.body['Delete'] == "Delete"){
		   appRepo.removeUser(req.body.id)
	       .then((data) => console.log('Succesfully removed user'))
		   .catch((error) => console.log('Error removing user', error));
	      	appRepo.getAllUsers().then((users) => {
				res.render('accountsMain',  {users: users, title: "Accounts" });
	     	}).catch(error => console.log('Error getting all users: ', error));
	     }
	     else if(req.body['Edit'] == "Edit"){
			appRepo.getUserById(req.body.id).then((userToEdit) => {
	   			res.render('accountsMain',  {userToEdit: userToEdit, title: "Accounts", subTitle: "Edit User" });
		  }).catch((error) => console.log('Error editing user', error));
		 }
		 else if(req.body['Save'] == "Save"){
		 		appRepo.updateUserNameAndEmail(req.body.id, req.body.name, req.body.email).then((user) => {
		    	 }).catch((error) => console.log('Error updating user', error));
			      appRepo.getAllUsers().then((users) => {
					res.render('accountsMain',  {users: users, title: "Accounts" });
		 	   }).catch((error) => console.log('Error updating user', error));
		 }

	     else{
	     	appRepo.updateUserEmail(req.body.email, req.body.id)
	 	 		.then((data) => console.log('Succesfully updated user email'))
	     	.catch((error) => console.log('Error updating user email', error));

	     	appRepo.getAllUsers().then((users) => {
				res.render('accountsMain',  {users: users, title: "Accounts" });
	     	}).catch(error => console.log('Error getting all users: ', error));
	     }
});

module.exports = router;

