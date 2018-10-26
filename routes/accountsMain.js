var express = require('express');
var router = express.Router();

router.get('/accountsMain', function(req, res, next){
	res.render('accountsMain',  {title: "Accounts" });
  });

module.exports = router;
