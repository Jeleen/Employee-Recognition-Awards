var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/', function(req, res, next) {
  console.log(req.body);
  var submitted = req.body;
  if (submitted.loginType == "user") {
    console.log("User attempting to log in with email address: " + submitted.email);
    appRepo.getUserByEmail(submitted.email)
      .then((existingUser) => {
        console.log("Existing user object: " + existingUser);
        if (existingUser.password == submitted.password) {
          req.session.loggedInId = existingUser.id;
          res.redirect('/user_dashboard');
        } else {
          console.log("User with email found, but password did not match");
          res.redirect('/login');
        }
      }).catch((error) => {
        console.log("No user found when trying to log in with username (email): " + submitted.email, error);
        res.redirect('/login');
      });
  } else {
    console.log("Admin attempting to log in with email address: " + submitted.email);
    appRepo.getAdminByEmail(submitted.email)
      .then((existingAdmin) => {
        if (existingAdmin.password == submitted.password) {
          req.session.loggedInId = existingAdmin.id;
          res.render('adminProfile', {admin: existingAdmin, title: "My Profile" });
        } else {
          console.log("Admin with email found, but password did not match")
          res.redirect('/login');
        }
      }).catch((error) => {
        console.log("No admin found when trying to log in with username (email): " + submitted.email, error);
        res.redirect('/login');
      });
  }
});

module.exports = router;
