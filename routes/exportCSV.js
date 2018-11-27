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
		appRepo.getAllAdminsMinusPasswords().then((admins) => {
	        //convert dates
            for (var i = 0; i < admins.length; i++) {
                admins[i].creation_time = convertDate(admins[i].creation_time);
   	            admins[i].last_login = convertDate(admins[i].last_login);
            }
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
		appRepo.getAllUsersMinusPasswords().then((users) => {
			for (var i = 0; i < users.length; i++) {
                users[i].creation_time = convertDate(users[i].creation_time);
   	            users[i].last_login = convertDate(users[i].last_login);
            }
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
			for (var i = 0; i < awards.length; i++) {
                awards[i].creation_time = convertDate(awards[i].creation_time);
            }
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
	        id: 'name',
	        title: 'NAME'
	      }, {
            id: 'email',
            title: 'EMAIL'
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

/****************************************************
 *    Convert Dates for last login and login attempts
 ***************************************************/
function convertDate(myDate){
    var date1 = new Date(myDate);
    var year = date1.getFullYear();
    var month = ('0' + (date1.getMonth() + 1)).slice(-2);
    var date = ('0' + date1.getDate()).slice(-2);
    var hours = ('0' + date1.getUTCHours()).slice(-2);
    var minutes = ('0' + date1.getUTCMinutes()).slice(-2);
    var seconds = ('0' + date1.getUTCSeconds()).slice(-2);
    var shortDate = month + '/' + date + '/' + year + ' ' + hours + ':' + minutes + ':' + seconds + ' UTC';
    return shortDate;
}

module.exports = router;
