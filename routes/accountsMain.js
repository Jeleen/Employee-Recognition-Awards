var express = require('express');
var router = express.Router();

/**************************************
* Route for 'Accounts' main page
**************************************/
router.get('/', function(req, res, next){
	res.render('accountsMain', {title: "Accounts", main: "main" });
  });

module.exports = router;
