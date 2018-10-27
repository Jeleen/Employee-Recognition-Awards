var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/preAddAdmin', function(req, res, next) {
	res.render('preAddAdmin', { title: "Accounts" , layout: "preAddAdminLayout.hbs" });
});
module.exports = router;
