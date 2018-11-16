var express = require('express');
var router = express.Router();
var _ = require('lodash');

const createCsvWriter = require('csv-writer').createObjectCsvWriter;
router.get('/', function(req, res, next) {
  res.render('businessIntelligence', {
    main: "main", title: "Business Intelligence Reports"
  });
});

/*
Generates BI report dependent upon form request specifications
*/
router.post('/', function(req, res, next) {
	var csv = false;
	if(req.body.thisReport){
		csv = true;
	}
console.log(req.body.thisReport);

	// Request:  All Admins
	if ((req.body.adminRadio == "allAdmins" && !(req.body.userRadio) && !(req.body.awardRadio)) || (req.body.thisReport == "allAdmins")) {
		appRepo.getAllAdmins().then((admins) => {
			//if CSV report, get report and export to csv file 'data.csv'
			if (csv) {
				var exportCSV = "Report exported to CSV file:  data.csv";
				writeToCSVadmin(admins);
				csv = false;
			}else{ var exportCSV = "";}

			//Sort admins and group by time of account creation
			var sortedAdmins = _.orderBy(admins, ['creation_time'], ['asc']);
			var myJSON = JSON.stringify(getCreationTimes(sortedAdmins));
			var myJSONlogin = JSON.stringify(getLoginAttempts(admins));
            //render page
			res.render('businessIntelligence', {
				admins: admins,
		        title: "Business Intelligence",
		        queryTitle: "Admin Report",
		        exportCSV: exportCSV,
		        myJSON: myJSON, myJSONlogin: myJSONlogin,
		        myJSON2: 0, myJSONorgchart: 0,
		        chartTitleAU: "Admin Account Creations By Date",
		        chartTitleLogin: "Admin Login Attempts",
		        chartTitleLastLogin: "Admin Last Login",
		        thisReport: "allAdmins"

		    });
	    }).catch(error => console.log('Error getting all admins: ', error));
	}

  	// Request for: all users
	else if ((req.body.userRadio == "allUsers" && !(req.body.adminRadio) && !(req.body.awardRadio)) || (req.body.thisReport == "allUsers")) {
		appRepo.getAllUsers().then((users) => {
			if (csv) {
				var exportCSV = "Report exported to CSV file:  data.csv";
				writeToCSVuser(users);
				csv = false;
			}
      		else { var exportCSV = "";}
			var myJSONlogin = JSON.stringify(getLoginAttempts(users));

			//Sort and group users by time of account creation
			var sortedUsers = _.orderBy(users, ['creation_time'], ['asc']);
			var myJSON = JSON.stringify(getCreationTimes(sortedUsers));
						var myJSONregions = JSON.stringify(getRegions(users));
console.log(myJSONregions);
		res.render('businessIntelligence', {
		        users: users,
		        myJSON: myJSON,
		        queryTitle: "User Report",

		        myJSON2: 0,
		        myJSONorgchart: 0, myJSONlogin: myJSONlogin, myJSONregions: myJSONregions,
		        title: "Business Intelligence",
		        exportCSV: exportCSV,
		        chartTitleAU: "User Account Creations By Date",
		        chartTitleLogin: "User Login Attempts",
		        chartTitleLastLogin: "User Last Login",
		        thisReport: "allUsers"
			});
	    }).catch(error => console.log('Error getting all users: ', error));
	}

	// Request for: all users created by an admin
	else if ((req.body.userRadio == "allUsers" && !(req.body.awardRadio) && (req.body.adminRadio != "allAdmins")) || (req.body.thisReport == "allUsersByAdmin")) {
	    appRepo.getAllUsersCreatedBy(req.body.adminIdText).then((usersA) => {
			if (csv) {
		  		var exportCSV = "Report exported to CSV file:  data.csv";
				writeToCSVuser(usersA);
				csv = false;
			} else{ var exportCSV = "";}

			var myarray = new Array();
			for (var i = 0; i < usersA.length; i++) {
		        myarray.push([]);
		        myarray[i][0] = usersA[i].id;
		        myarray[i][1] = usersA[i].name;
		        myarray[i][2] = usersA[i].creator_id;
			}
			var myJSONlogin = JSON.stringify(getLoginAttempts(usersA));

			var sortedUsers = _.orderBy(usersA, ['creation_time'], ['asc']);
			var myJSON = JSON.stringify(getCreationTimes(sortedUsers));
			var myJSONorgchart = JSON.stringify(myarray);
			res.render('businessIntelligence', {
		        usersA: usersA,
		        myJSON: myJSON, myJSON2: 0, myJSONorgchart: myJSONorgchart, myJSONlogin: myJSONlogin,
		        chartTitleOrg: "Users created by Admin "+ req.body.adminIdText,
		        chartTitle: "User Account Creations By Date",
		        chartTitleLogin: "User Login Attempts",
		        title: "Business Intelligence Reports",
		        chartTitleLastLogin: "User Last Login",
				exportCSV: exportCSV,
		        thisReport: "allUsersByAdmin"
			});
	    }).catch(error => console.log('Error getting all users: ', error));
	}

	//Request for:  all awards
	else if ((req.body.awardRadio == "allAwards" && !(req.body.userRadio) && !(req.body.adminRadio)) || (req.body.thisReport == "allAwards")) {
		appRepo.getAllAwards().then((awards) => {
			console.log(awards);
			if (csv) {
				var exportCSV = "Report exported to CSV file:  data.csv";
				writeToCSVaward(awards);
				csv = false;
			}
			else{ var exportCSV = "";}
			var sortedAwards = _.orderBy(awards, ['creation_time'], ['asc']);
	        var myJSON = JSON.stringify(getCreationTimes(sortedAwards));
	        			console.log(awards);
			console.log(myJSON);

			//PIE CHART
			var myJSON2 = JSON.stringify(awardPieChart(awards));
    		res.render('businessIntelligence', {
    		    awards: awards,
    		    title: "Business Intelligence Reports",
    		    chartTitleA: "Award Creations by Date",
    		    chartTitle3: "Awards by Type",
    		    exportCSV: exportCSV,
    		    myJSON: myJSON, myJSON2: myJSON2, myJSONorgchart: 0, myJSONlogin: 0,
    		    thisReport: "allAwards"
    		});
    	}).catch(error => console.log('Error getting all awards: ', error));
  	}

	//Request for: all awards by a certain user
	else if ((req.body.awardRadio == "allAwards" && (req.body.userRadio == "userId") && !(req.body.adminRadio)) || (req.body.thisReport == "allAwardsByUser")) {
		appRepo.getAllAwardsCreatedBy(req.body.userIdText).then((awards) => {
			if (csv) {
				var exportCSV = "Report exported to CSV file:  data.csv";
				writeToCSVaward(awards);
				csv = false;
			}
			else{ var exportCSV = "";}
			var sortedAwards = _.orderBy(awards, ['creation_time'], ['asc']);
			var myJSON = JSON.stringify(getCreationTimes(sortedAwards));
			var myJSON2 = JSON.stringify(awardPieChart(awards));
			res.render('businessIntelligence', {
				awards: awards,
				title: "Business Intelligence Reports",
				chartTitle3: "Awards by Type",
				chartTitle: ("Awards created by" + req.body.userIdText),
				exportCSV: exportCSV,
				myJSON: myJSON,
				myJSON2: myJSON2, myJSONlogin: 0, myJSONlastLogin: 0,
				myJSONorgchart: 0,
				thisReport: "allAwardsByUser"
			});
    	}).catch(error => console.log('Error getting all awards: ', error));
  	}





});
function getLoginAttempts(group)
{
		var myarray = new Array();

	for (var i = 0; i < group.length; i++) {
		myarray.push([]);
		myarray[i][0] = group[i].id;
		myarray[i][1] = group[i].login_attempts;
	}
	return myarray;
}

function getRegions(group){
	var myarray2 = new Array();
	for(var i = 0; i < group.length; i++){

	myarray2.push([]);
		      myarray2[0][0] = "United States";
		      myarray2[0][1] = 0;
		      myarray2.push([]);
		      myarray2[1][0] = "Canada";
		      myarray2[1][1] = 0;
		      myarray2.push([]);
			  myarray2[2][0] = "Portugal";
		      myarray2[2][1] = 0;
		      for(var i = 0; i < group.length; i++){
				  switch(group[i].region){
					  case "United States":
					 	var temp = myarray2[0][1];
					  	temp++;
			  			myarray2[0][1] = temp;
					  	break;
					  case "Canada":
						var temp = myarray2[1][1];
					  	temp++;
			  			myarray2[1][1] = temp;
			  			break;
					  case "Portugal":
						var temp = myarray2[2][1];
					  	temp++;
			  			myarray2[2][1] = temp;
			  			break;
			  		  default:
			  		  	console.log("--");
				  }
	 	 }
	 }
	 	 return myarray2;
}


function getCreationTimes(sortedUsers)
{
	var myarray = new Array();
 	for (var i = 0; i < sortedUsers.length; i++) {
	    var date1 = new Date(sortedUsers[i].creation_time);
        console.log(date1.toString());
        var year = date1.getFullYear();
        var month = ('0' + (date1.getMonth() + 1)).slice(-2);
		var date = ('0' + date1.getDate()).slice(-2);
		//var hours = ('0' + date1.getUTCHours()).slice(-2);
		//var minutes = ('0' + date1.getUTCMinutes()).slice(-2);
		//var seconds = ('0' + date1.getUTCSeconds()).slice(-2);
        //var shortDate = month + '/' + date + '/' + year + ' ' + hours + ':' + minutes + ':' + seconds + ' UTC';
		        var shortDate = month + '/' + date + '/' + year;
console.log(shortDate);
		if(i != 0){
	    	if(myarray[myarray.length - 1][0] == shortDate){
				var temp = myarray[myarray.length - 1][1];
				temp++;
				myarray[myarray.length - 1][1] = temp;
			}
			else{
				myarray.push([]);
				myarray[myarray.length - 1][0] = shortDate;
   				myarray[myarray.length - 1][1] = 1;
			}
		}else{
			myarray.push([]);
			myarray[0][0] = shortDate;
   			myarray[0][1] = 1;
		}
	}
    return myarray;
}


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

function awardPieChart(awards){
	var myarray2 = new Array();
		  myarray2.push([]);
	      myarray2[0][0] = "WEEK";
	      myarray2[0][1] = 0;
	      myarray2.push([]);
	      myarray2[1][0] = "MONTH";
	      myarray2[1][1] = 0;
	      myarray2.push([]);
		  myarray2[2][0] = "YEAR";
	      myarray2[2][1] = 0;
	      for(var i = 0; i < awards.length; i++){
			  switch(awards[i].award_type){
				  case "WEEK":
				 	var temp = myarray2[0][1];
				  	temp++;
		  			myarray2[0][1] = temp;
				  	break;
				  case "MONTH":
					var temp = myarray2[1][1];
				  	temp++;
		  			myarray2[1][1] = temp;
		  			break;
				  case "YEAR":
					var temp = myarray2[2][1];
				  	temp++;
		  			myarray2[2][1] = temp;
		  			break;
		  		  default:
		  		  	console.log(awards.award_type);
		  		  	console.log("--");
			  }
	  }
	  return myarray2;
  }
module.exports = router;