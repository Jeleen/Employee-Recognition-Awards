var express = require('express');
var router = express.Router();

const AwardDao = require('../dao');
const AppRepository = require('../app_repository');
const dao = new AwardDao('./mydb.db3');
const appRepo = new AppRepository(dao);
appRepo.createRepo();

/* GET home page. */
router.get('/', function(req, res, next) {
appRepo.getAllUsers().then((users) => {
	res.render('preAddUser',  { users: users, title: "Accounts" , layout: "preAddUserLayout.hbs" });
  }).catch(error => console.log('Error getting all admin: ', error));
});
module.exports = router;
