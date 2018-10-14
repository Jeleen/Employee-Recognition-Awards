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

  appRepo.getAllUsers()
  .then((users) => console.log('Number of users: ' + users.length))
  .catch(error => console.log('Error getting all users: ', error));

  appRepo.getUser('Joe').then((user) => {
    res.render('index', { title: user.name });
  }).catch(error => console.log('Error getting Joe: ', error))
  //res.render('index', { title: 'OK OK' });
});

module.exports = router;
