var express = require('express');
var router = express.Router();

const AwardDao = require('../dao');
const AppRepository = require('../app_repository');
const dao = new AwardDao('./mydb.db3');
const appRepo = new AppRepository(dao);

/* GET home page. */
router.post('/', function(req, res, next) {
	console.log(req.body.delete);
		console.log(req.body);


	if(req.body.delete == "delete"){


	appRepo.removeUser(req.body.id)
    .then((data) => console.log('Succesfully removed user'))
	.catch((error) => console.log('Error creating user', error));
}
else{
	appRepo.updateUserEmail(req.body.email, req.body.id)
	  .then((data) => console.log('Succesfully updated user email'))
.catch((error) => console.log('Error updating user email', error));
}


    appRepo.getAllUsers().then((users) => {
	res.render('adminMain',  {users: users, title: "Accounts" });
  }).catch(error => console.log('Error getting all admin: ', error));
});

module.exports = router;

