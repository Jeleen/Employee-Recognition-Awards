var express = require('express');
var router = express.Router();

const AwardDao = require('../dao');
const AppRepository = require('../app_repository');
const dao = new AwardDao('./mydb.db3');
const appRepo = new AppRepository(dao);


/* GET home page. */
router.get('/getAllUsers', function(req, res, next) {
appRepo.getAllUsers().then((users) => {
	res.render('adminMain',  {users: users, title: "Accounts" });
  }).catch(error => console.log('Error getting all admin: ', error));
});
module.exports = router;
