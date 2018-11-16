var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
	res.render('accountsMain', {title: "Accounts", main: "main" });
  });

module.exports = router;
