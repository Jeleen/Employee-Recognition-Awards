var express = require('express');
var router = express.Router();

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

  appRepo.createAdmin('admin@admin.com', 'adminPass', 'admin creation time')
    .then((data) => console.log('Succesfully created admin'))
    .catch((error) => console.log('admin creation problems', error));  
  
    res.render('index', { title: "Employee Recognition Awards"});
});

module.exports = router;
