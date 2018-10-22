var express = require('express');
var router = express.Router();

const AwardDao = require('../dao');
const AppRepository = require('../app_repository');
const dao = new AwardDao('./mydb.db3');
const appRepo = new AppRepository(dao);

/* GET home page. */
router.get('/getAllAdmins', function(req, res, next) {
appRepo.getAllAdmins().then((admins) => {
	res.render('adminMain',  {admins: admins, title: "Accounts" });
  }).catch(error => console.log('Error getting all admin: ', error));
});