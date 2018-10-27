var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var awardId = req.query.id;
  console.log('Award page: ' + awardId);
  appRepo.getAward(awardId).then(lookup => {
    res.render('award', { award: lookup });
  }).catch(error => console.log("Error looking up award with id: " + awardId));
});

module.exports = router;
