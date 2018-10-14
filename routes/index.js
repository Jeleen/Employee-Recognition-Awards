var express = require('express');
var router = express.Router();
var adminCtrl = require('./admins');
const AwardDao = require('../dao');
const AppRepository = require('../app_repository');
// const dao = new AwardDao('./newdb.db');
const dao = new AwardDao(':memory:');
const appRepo = new AppRepository(dao);
appRepo.createRepo();

/* GET home page. */
router.get('/', function(req, res, next) {
  appRepo.createUser('Joe', 'joe@joe.joe', 'joePass', 'joe world', 'joe time')
    .then((data) => console.log('Succesfully created Joe'))
    .catch((error) => console.log('Joe problems', error));
appRepo.createAdmin('anAdmin@admin.com', 'adminPass', 'admin creation time')
    .then((data) => console.log('Succesfully created anAdmin'))
    .catch((error) => console.log('anAdmin problems', error));
//  appRepo.getUserByName('Joe').then((user) => {
    res.render('index', { title: "Employee Recognition Awards"});
  //}).catch(error => console.log('Error getting Joe: ', error))
  //res.render('index', { title: 'OK OK' });
});


/* Login as user or admin, go to their home page. */
router.post('/login', function(req, res) {
	if(req.body['loginType'] == "admin"){
  appRepo.getAllAdmins().then((admins) => {
  	 res.render('admins',  {admins: admins, title: "Admin Accounts" });
  	 console.log(admins);
    }).catch(error => console.log('Error getting all admin: ', error));
	}
if(req.body['loginType'] == "user"){
  appRepo.getAllUsers().then((users) => {
  	 res.render('users',  {users: users, title: "User Accounts" });
  	 console.log(admins);
    }).catch(error => console.log('Error getting all users: ', error));
	}
});


router.get('/adminsEdit', adminCtrl);
router.get('/adminsProfile', adminCtrl);
router.get('/adminsUsers', adminCtrl);
router.get('/googleTestChart', adminCtrl);


//router.use(function(req, res, next) {
//});

//router.get('/adminsEdit', function(req, res, next) {
//});
//module.exports.router = router;


module.exports = router;

