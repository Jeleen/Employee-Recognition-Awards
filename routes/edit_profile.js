var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // FIXME: update hardcoded email with that of logged in user
  res.render('edit_profile', { existing: 'oldEmail@oldEmail.com' });
});

module.exports = router;
