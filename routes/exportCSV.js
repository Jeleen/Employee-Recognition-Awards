var express = require('express');
var router = express.Router();
var _ = require('lodash');
var http = require('http'),
    fileSystem = require('fs'),
    path = require('path');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;



router.post('/', function(req, res, next) {

	if(req.body.thisReport == "allAdmins"){

			appRepo.getAllAdmins().then((admins) => {
			//if CSV report, get report and export to csv file 'data.csv'

				writeToCSVadmin(admins);
  			var filePath = path.join(__dirname, '../data.csv');
  			    var stat = fileSystem.statSync(filePath);
  			     res.writeHead(200, {
  			        'Content-Type': 'text/csv',
  			        'Content-Disposition': 'attachment;filename=data.csv'
  			    });

  				var readStream = fileSystem.createReadStream(filePath);
      			// We replaced all the event handlers with a simple call to readStream.pipe()



    			readStream.pipe(res);
	    }).catch(error => console.log('Error getting all admins: ', error));
	}

	if(req.body.thisReport == "allUsers"){
		appRepo.getAllUsers().then((users) => {
					//if CSV report, get report and export to csv file 'data.csv'

						writeToCSVuser(users);
		  			var filePath = path.join(__dirname, '../data.csv');
		  			    var stat = fileSystem.statSync(filePath);
		  			     res.writeHead(200, {
		  			        'Content-Type': 'text/csv',
		  			        'Content-Disposition': 'attachment;filename=data.csv'
		  			    });

		  				var readStream = fileSystem.createReadStream(filePath);
		      			// We replaced all the event handlers with a simple call to readStream.pipe()
		    			readStream.pipe(res);
	    }).catch(error => console.log('Error getting all users: ', error));
	}

	if(req.body.thisReport == "allUsersByAdmin"){
	    appRepo.getAllUsersCreatedBy(req.body.adminIdText).then((usersA) => {
						//if CSV report, get report and export to csv file 'data.csv'

							writeToCSVuser(usersA);
			  			var filePath = path.join(__dirname, '../data.csv');
			  			    var stat = fileSystem.statSync(filePath);
			  			     res.writeHead(200, {
			  			        'Content-Type': 'text/csv',
			  			        'Content-Disposition': 'attachment;filename=data.csv'
			  			    });

			  				var readStream = fileSystem.createReadStream(filePath);
			      			// We replaced all the event handlers with a simple call to readStream.pipe()
			    			readStream.pipe(res);
		    }).catch(error => console.log('Error getting all usersCreatedByAdmin: ', error));
	}

if(req.body.thisReport == "allAwards"){
		appRepo.getAllAwards().then((awards) => {
						//if CSV report, get report and export to csv file 'data.csv'

							writeToCSVaward(awards);
			  			var filePath = path.join(__dirname, '../data.csv');
			  			    var stat = fileSystem.statSync(filePath);
			  			     res.writeHead(200, {
			  			        'Content-Type': 'text/csv',
			  			        'Content-Disposition': 'attachment;filename=data.csv'
			  			    });

			  				var readStream = fileSystem.createReadStream(filePath);
			      			// We replaced all the event handlers with a simple call to readStream.pipe()
			    			readStream.pipe(res);
		    }).catch(error => console.log('Error getting all awards: ', error));
	}
if(req.body.thisReport == "allAwardsByUser"){
		appRepo.getAllAwardsCreatedBy(req.body.userIdText).then((awards) => {
						//if CSV report, get report and export to csv file 'data.csv'

							writeToCSVaward(awards);
			  			var filePath = path.join(__dirname, '../data.csv');
			  			    var stat = fileSystem.statSync(filePath);
			  			     res.writeHead(200, {
			  			        'Content-Type': 'text/csv',
			  			        'Content-Disposition': 'attachment;filename=data.csv'
			  			    });

			  				var readStream = fileSystem.createReadStream(filePath);
			      			// We replaced all the event handlers with a simple call to readStream.pipe()
			    			readStream.pipe(res);
		    }).catch(error => console.log('Error getting all awards created by user: ', error));
	}



});



//ADMIN: writes report to csv file for Admins
function writeToCSVadmin(admins)
{
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
    csvWriter.writeRecords(admins) // returns a promise
       .then(() => {
       console.log('...Done');
    });
}

//USERS:  writes report to CSV file for users
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
	 csvWriter.writeRecords(users) // returns a promise
	     .then(() => {
	      console.log('...Done');
     });
}

//AWARDS:  writes report to csv file for awards
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
	csvWriter.writeRecords(awards) // returns a promise
	    .then(() => {
	    console.log('...Done');
    });
}


module.exports = router;
