var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  appRepo.getUserById(req.session.loggedInId)
    .then((user) => res.render('user_dashboard', { name: user.name}))
    .catch((error) => {
      console.log('Error looking up logged in user', error);
      res.render('user_dashboard', { name: '(error: user name not found)'});
    });
});

module.exports = router;
