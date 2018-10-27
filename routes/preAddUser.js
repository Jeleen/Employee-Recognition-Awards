var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/preAddUser', function(req, res, next) {
	res.render('preAddUser', { title: "Accounts" , layout: "preAddUserLayout.hbs" });
});
module.exports = router;
