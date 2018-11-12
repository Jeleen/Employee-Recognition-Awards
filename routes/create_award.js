var express = require('express');
var router = express.Router();
var awardCreate = require('../award/awardObject.js');
/* GET users listing. */

router.get('/', function(req, res, next) {
	if (req.session.isAdmin) {
    res.redirect('/login');
  }
	console.log("Inside the get route for award");
	//awardCreate();
	res.render('create_award');

});


router.post('/', function(req, res, next) {
  var award = req.body;
  console.log(award);
	var date = new Date();
  appRepo.createAward(award.recipient_name, award.recipient_email, date.getTime(), award.type, req.session.loggedInId)
    .then((data) => {
      var awardId = data.id;
      console.log("Award Created with DB id: " + awardId);

      // User has submitted form, Award now exists in database.
      // We have the id and can look it up from the database and generate a PDF from it
			awardCreate.awardObject(awardId);
			res.redirect('/award?id=' + awardId);

    }).catch((error) => console.warn("Error creating award: ", error));
});

module.exports = router;
