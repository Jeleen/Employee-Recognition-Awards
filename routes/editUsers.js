var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
	if(req.body.delete == "delete"){
	   appRepo.removeUser(req.body.id)
       .then((data) => console.log('Succesfully removed user'))
	   .catch((error) => console.log('Error removing user', error));
    }
     else{
       appRepo.updateUserEmail(req.body.email, req.body.id)
 	  .then((data) => console.log('Succesfully updated user email'))
      .catch((error) => console.log('Error updating user email', error));
     }
     appRepo.getAllUsers().then((users) => {
		res.render('accountsMain',  {users: users, title: "Accounts" });
     }).catch(error => console.log('Error getting all users: ', error));
});

module.exports = router;

