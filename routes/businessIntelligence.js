var express = require('express');
var router = express.Router();

const AwardDao = require('../dao');
const AppRepository = require('../app_repository');
const dao = new AwardDao('./mydb.db3');
const appRepo = new AppRepository(dao);

router.get('/businessIntelligence', function(req, res, next){
	res.render('businessIntelligence',  {title: "BI Reports"});
});

module.exports = router;
