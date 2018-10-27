var express = require('express');
var router = express.Router();

// FIXME: handle this when support exists for logged in user
const loggedInUserId = 1;

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('new stuff');
  // FIXME: update hardcoded email with that of logged in user
  appRepo.getUserById(loggedInUserId)
    .then(user => res.render('edit_profile', { existing: user.email }))
    .catch(() => res.render('edit_profile', { existing: 'noUserSo@exampleEmail.com' }));
});

router.post('/', function(req, res, next) {
  var newEmail = req.body.new_email;
  appRepo.editUser(loggedInUserId, newEmail)
    .then(() => res.render('edit_profile', { existing: newEmail }))
    .catch((error) => console.log("Error editing user email: " + error));
});

module.exports = router;
