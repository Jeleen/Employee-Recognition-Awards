var express = require('express');
var router = express.Router();

const AwardDao = require('../dao');
const AppRepository = require('../app_repository');
const dao = new AwardDao('../mydb.db3');
const appRepo = new AppRepository(dao);

router.get('/adminMain', function(req, res, next){
	res.render('adminMain',  {title: "Accounts" });
  });

router.get('/getAllAdmins', function(req, res, next){
	appRepo.getAllAdmins().then((admins) => {
	res.render('adminMain',  {admins: admins, title: "Accounts" });
  }).catch(error => console.log('Error getting all admin: ', error));
});

router.get('/getAllUsers', function(req, res, next){
	appRepo.getAllUsers().then((users) => {
    	 res.render('adminMain',  {users: users, title: "Accounts" });
    }).catch(error => console.log('Error getting all admin: ', error));
});

router.get('/usersEdit', function(req, res, next){
  	appRepo.getAllUsers().then((usersAdd) => {
	    	 res.render('adminMain',  {usersAdd: usersAdd, title: "Accounts" });
    }).catch(error => console.log('Error getting all admin: ', error));
});

router.get('/createUser', function(req, res, next){
  	appRepo.createUser(req.body.name, req.body.email, req.body.password, req.body.region, req.body.creation_time)
    .then((data) => console.log('Succesfully created User'))
	.catch((error) => console.log('Joe problems', error));
	res.render('adminMain',  {users: users, title: "Accounts" });
});


module.exports = router;
