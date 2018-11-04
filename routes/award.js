var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  if (req.session.isAdmin) {
    res.redirect('/login');
  }
  var awardId = req.query.id;
  console.log('Award page: ' + awardId);
  appRepo.getAward(awardId).then(lookup => {
    appRepo.getUserById(lookup.creator_id).then(userLookup => {
      console.log(lookup.creation_time);
      var date = new Date(lookup.creation_time);
      res.render('award', { award: lookup, createdTime: date, creator: userLookup });
    })
  }).catch(error => console.log("Error looking up award with id: " + awardId));
});

module.exports = router;
