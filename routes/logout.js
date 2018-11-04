var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  if (req.session) {
    delete req.session.loggedInId;
    delete req.session.isAdmin;
  }
  res.redirect('/login');
});

module.exports = router;
