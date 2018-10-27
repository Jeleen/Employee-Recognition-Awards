var express = require('express');
var router = express.Router();

router.get('/businessIntelligence', function(req, res, next){
	res.render('businessIntelligence',  {title: "BI Reports", layout: "layout.DM" });
});

module.exports = router;
