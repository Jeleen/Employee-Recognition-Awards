var express = require('express');
var router = express.Router();

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
