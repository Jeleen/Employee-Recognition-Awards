var express = require('express');
var router = express.Router();
const moment =require('../node_modules/moment')

/* GET users listing. */
router.get('/', function(req, res, next) {
  if (req.session.isAdmin) {
    res.redirect('/login');
  }
  renderPage(req,res);
});

router.post('/delete', function(req, res) {
  var awardId = req.body.awardId;
  appRepo.removeAward(awardId)
    .then(() => renderPage(req,res, "Award Successfully Deleted"))
    .catch((error) => console.log("Error Deleting Award", error));
});

function renderPage(req, res, infoMessage) {
  appRepo.getAllAwardsCreatedBy(req.session.loggedInId)
    .then((usersAwards) => {
      usersAwards.forEach( (award) => {
        award.creation_time = moment(award.creation_time).format('YYYY-MM-DD hh:mm a')
      })
      appRepo.getUserById(req.session.loggedInId)
        .then(user => {
          console.log(user);
          var handleVars = { name: user.email, awards: usersAwards};
          if (infoMessage) {
            handleVars.info = infoMessage;
          }
          res.render('user_dashboard', handleVars);
        }).catch(() => res.render('user_dashboard', { name: '(error no user found)' }));
    });
}

module.exports = router;
