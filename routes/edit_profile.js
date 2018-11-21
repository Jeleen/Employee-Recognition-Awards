var express = require('express');
var router = express.Router();
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './images' });
var fs = require('fs');
const moment =require('../node_modules/moment')

/* GET users listing. */
router.get('/', function(req, res, next) {
  if (req.session.isAdmin) {
    res.redirect('/login');
  }
  appRepo.getUserById(req.session.loggedInId)
    .then(user => res.render('edit_profile', { existing: user.email }))
    .catch(() => res.render('edit_profile', { existing: '(error no user found)' }));
});

router.post('/', function(req, res, next) {
  var newEmail = req.body.new_email;
  if (!newEmail) {
    res.render('edit_profile', { existing: newEmail, error: "Must specify an email" })
  }
  appRepo.editUser(req.session.loggedInId, newEmail)
    .then(() => res.render('edit_profile', { existing: newEmail, info: "Email successfully updated" }))
    .catch((error) => console.log("Error editing user email: " + error));
});

router.post('/upload', multipartMiddleware, function(req, res) {
  appRepo.getUserById(req.session.loggedInId)
    .then(user => {
      var file = req.files.upload;
      if (file.size == 0) {
        res.render('edit_profile', { existing: user.email, error: "Must Specify a File"});
        return;
      }
      var sigImagePath = 'award/data/image/' + user.id + '_' + file.name;
      fs.renameSync(file.path, sigImagePath);
      appRepo.editUserImage(req.session.loggedInId, sigImagePath).then(() => {
        res.render('edit_profile', { existing: user.email, info: "Successfully uploaded image"})
      });
    })
    .catch(error => console.log("Error uploading user image: ", error));
});

router.post('/password', function(req, res, next) {
  var existing = req.body.old;
  var newPassword = req.body.new;
  appRepo.getUserById(req.session.loggedInId)
    .then(user => {
      if (user.password == existing) {
        appRepo.editUserPassword(req.session.loggedInId, newPassword)
          .then(() => res.render('edit_profile', { existing: user.email, info: "Password successfully updated" }));
      } else {
        res.render('edit_profile', { existing: user.email, error: "Incorrect password" });
      }
    })
    .catch((error) => console.log(error));
});

module.exports = router;
