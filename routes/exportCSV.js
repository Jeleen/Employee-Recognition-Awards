var express = require('express');
var router = express.Router();
var _ = require('lodash');
var http = require('http'),
    fileSystem = require('fs'),
    path = require('path');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

/*****************************************************
* Route for exporting Business Intelligence CSV files
*****************************************************/
router.post('/', function(req, res, next) {
	if(req.body.thisReport == "allAdmins"){
		appRepo.getAllAdmins().then((admins) => {
 			writeToCSVadmin(admins);
			var filePath = path.join(__dirname, '../data.csv');
		    var stat = fileSystem.statSync(filePath);
            res.writeHead(200, {
  			        'Content-Type': 'text/csv',
  			        'Content-Disposition': 'attachment;filename=data.csv'
     	    });
			var readStream = fileSystem.createReadStream(filePath);
   			readStream.pipe(res);
	    }).catch(error => console.log('Error getting all admins: ', error));
	}

	if(req.body.thisReport == "allUsers"){
		appRepo.getAllUsers().then((users) => {
			writeToCSVuser(users);
		  	var filePath = path.join(__dirname, '../data.csv');
		  	var stat = fileSystem.statSync(filePath);
		  	res.writeHead(200, {
		  	      'Content-Type': 'text/csv',
		  	      'Content-Disposition': 'attachment;filename=data.csv'
		  	});

		  	var readStream = fileSystem.createReadStream(filePath);
   			readStream.pipe(res);
	    }).catch(error => console.log('Error getting all users: ', error));
	}

	if(req.body.thisReport == "allAwards"){
		appRepo.getAllAwards().then((awards) => {
			writeToCSVaward(awards);
  			var filePath = path.join(__dirname, '../data.csv');
		    var stat = fileSystem.statSync(filePath);
            res.writeHead(200, {
		        'Content-Type': 'text/csv',
		        'Content-Disposition': 'attachment;filename=data.csv'
		    });
			var readStream = fileSystem.createReadStream(filePath);
   			readStream.pipe(res);
	    }).catch(error => console.log('Error getting all awards: ', error));
	}

});

// writes Admin report to csv file
function writeToCSVadmin(admins){
	const csvWriter = createCsvWriter({
          path: './data.csv',
          header: [{
            id: 'id',
            title: 'ID'
          }, {
            id: 'email',
            title: 'EMAIL'
          }, {
            id: 'password',
            title: 'PASSWORD'
          }, {
            id: 'last_login',
            title: 'LAST LOGIN'
          }, {
            id: 'login_attempts',
            title: 'LOGIN ATTEMPTS'
          }, {
            id: 'creation_time',
            title: 'CREATION TIME'
          }, {
            id: 'creator_id',
            title: 'CREATOR ID'
          }]
	});
    csvWriter.writeRecords(admins)
       .then(() => {
       console.log('...Done');
    });
}

// writes user report to CSV file
function writeToCSVuser(users){
	const csvWriter = createCsvWriter({
	          path: './data.csv',
	          header: [{
	            id: 'id',
	            title: 'ID'
	          }, {
	            id: 'name',
	            title: 'NAME'
	          }, {
	            id: 'email',
	            title: 'EMAIL'
	          }, {
	            id: 'password',
	            title: 'PASSWORD'
	          }, {
	            id: 'region',
	            title: 'REGION'
	          }, {
	            id: 'last_login',
	            title: 'LAST LOGIN'
	          }, {
	            id: 'login_attempts',
	            title: 'LOGIN ATTEMPTS'
	          }, {
	            id: 'sig_image',
	            title: 'SIGNATURE'
	          }, {
	            id: 'creation_time',
	            title: 'CREATION TIME'
	          }, {
	            id: 'creator_id',
	            title: 'CREATOR ID'
	          }]
	    });
	 csvWriter.writeRecords(users)
	     .then(() => {
	      console.log('...Done');
     });
}

// writes Awards report to csv file
function writeToCSVaward(awards){
	const csvWriter = createCsvWriter({
		path: './data.csv',
	    header: [{
	    		id: 'id',
	    		title: 'ID'
	    	}, {
	    	    id: 'recipient_name',
	    	    title: 'RECIPIENT NAME'
	        }, {
	            id: 'recipient_email',
	            title: 'RECIPIENT EMAIL'
	          }, {
	            id: 'creation_time',
	            title: 'CREATION TIME'
	          }, {
	            id: 'award_type',
	            title: 'AWARD TYPE'
	          }, {
	            id: 'creator_id',
	            title: 'CREATOR ID'
	    }]
	});
	csvWriter.writeRecords(awards)
	    .then(() => {
	    console.log('...Done');
    });
}

module.exports = router;
