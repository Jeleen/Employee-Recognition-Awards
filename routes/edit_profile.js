var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  appRepo.getUserById(req.session.loggedInId)
    .then(user => res.render('edit_profile', { existing: user.email }))
    .catch(() => res.render('edit_profile', { existing: '(error no user found)' }));
});

router.post('/', function(req, res, next) {
  var newEmail = req.body.new_email;
  appRepo.editUser(req.session.loggedInId, newEmail)
    .then(() => res.render('edit_profile', { existing: newEmail }))
    .catch((error) => console.log("Error editing user email: " + error));
});

module.exports = router;
