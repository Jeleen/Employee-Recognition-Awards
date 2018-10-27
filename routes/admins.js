var express = require('express');
var router = express.Router();

const AppRepository = require('../app_repository');
const AwardDao = require('./dao');
// const dao = new AwardDao('./newdb.db');
const dao = new AwardDao(':memory:');

const appRepo = new AppRepository(dao);
appRepo.createRepo();
appRepo.createAdmin('anAdmin@admin.com', 'adminPass', 'admin creation time')
    .then((data) => console.log('Successfully created anAdmin'))
    .catch((error) => console.log('anAdmin problems', error));

router.get('/adminsEdit', function(req, res, next){
	appRepo.createAdmin('editedAdmin@admin.com', 'adminPass', 'admin creation time')
    .then((data) => console.log('Successfully created editedanAdmin'))
    .catch((error) => console.log('editedanAdmin problems', error));
appRepo.getAllAdmins().then((admins) => {
    	 console.log(admins);
    	 res.render('admins',  {admins: admins, title: "Admin Accounts" });
    }).catch(error => console.log('Error getting all admin: ', error));
});


router.get('/adminsProfile', function(req, res, next){
	appRepo.createAdmin('anAdmin@admin.com', 'adminPass', 'admin creation time')
    .then((data) => console.log('Successfully created anAdmin'))
    .catch((error) => console.log('anAdmin problems', error));
appRepo.getAllAdmins().then((admins) => {
    	 console.log(admins);
    	 res.render('adminsProfile',  {admins: admins, title: "My Admin Profile" });
    }).catch(error => console.log('Error getting all admin: ', error));
});


router.get('/adminsUsers', function(req, res, next){
	appRepo.createUser('newUser@user.com', 'userP', 'user creation time')
    .then((data) => console.log('Successfully created newUser'))
    .catch((error) => console.log('newUser problems', error));
appRepo.getAllAdmins().then((admins) => {
    	 console.log(admins);
    	 res.render('adminsUsers',  {admins: admins, title: "User Accounts" });
    }).catch(error => console.log('Error getting all users: ', error));
});


router.get('/googleTestChart', function(req, res, next){

    	 res.render('googleTestChart', {title: "Google Test Chart" });
});
module.exports = router;