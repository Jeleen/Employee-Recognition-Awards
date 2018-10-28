var express = require('express');
var router = express.Router();


router.get('/createUser', function(req, res, next){
  	appRepo.createUser(req.body.name, req.body.email, req.body.password, req.body.region, req.body.creation_time)
    .then((data) => console.log('Succesfully created User'))
	.catch((error) => console.log('Joe problems', error));
	res.render('adminMain',  {users: users, title: "Accounts" });
});


module.exports = router;
