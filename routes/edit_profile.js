var express = require('express');
var router = express.Router();
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './images' });
var fs = require('fs');

/* GET users listing. */
router.get('/', function(req, res, next) {
  if (req.session.isAdmin) {
    res.redirect('/login');
  }
  appRepo.getAllAwardsCreatedBy(req.session.loggedInId)
    .then((usersAwards) => {
      console.log(usersAwards);
      appRepo.getUserById(req.session.loggedInId)
        .then(user => res.render('edit_profile', { existing: user.email, awards: usersAwards }))
        .catch(() => res.render('edit_profile', { existing: '(error no user found)' }));
    });
});

router.post('/', function(req, res, next) {
  var newEmail = req.body.new_email;
  appRepo.editUser(req.session.loggedInId, newEmail)
    .then(() => res.render('edit_profile', { existing: newEmail }))
    .catch((error) => console.log("Error editing user email: " + error));
});

router.post('/upload', multipartMiddleware, function(req, res) {
  appRepo.getUserById(req.session.loggedInId)
    .then(user => {
      var file = req.files.upload;
      var sigImagePath = 'images/' + user.email + '_' + file.name;
      fs.renameSync(file.path, sigImagePath);
      appRepo.editUserImage(req.session.loggedInId, sigImagePath).then(() => {
        res.render('edit_profile', { existing: user.email, info: "Successfully uploaded image"})
      });
    })
    .catch(error => console.log("Error uploading user image: ", error));
});

router.post('/delete', function(req, res) {
  appRepo.removeAwardsOfUser(req.session.loggedInId)
  .then(() => {
    res.render('edit_profile', { info: "Awards Successfully Deleted"})
  })
  .catch(error => console.log("Error deleting user's awards: ", error));
});

module.exports = router;
