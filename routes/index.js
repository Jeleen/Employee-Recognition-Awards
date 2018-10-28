var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', { title: "Welcome, please login.", layout: "loginLayout.hbs" });
});

module.exports = router;
