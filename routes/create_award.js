var express = require('express');
var router = express.Router();
var awardCreate = require('../award/createPDF.js');
/* GET users listing. */

router.get('/', function(req, res, next) {
	console.log("Inside the get route for award");
	awardCreate();  
	res.render('create_award')

});

router.post('/', function(req, res, next){
//input sql query and given input into a csv creator
//then input csv into a pdf generator



});



module.exports = router;
