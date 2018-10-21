var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // FIXME: Logged in user's name
  res.render('user_dashboard', { name: 'Joe'});
});

module.exports = router;
