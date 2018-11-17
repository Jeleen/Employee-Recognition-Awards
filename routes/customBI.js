var express = require('express');
var router = express.Router();
var _ = require('lodash');




router.get('/', function(req, res, next) {
		appRepo.getAllUsers().then((users) => {
			appRepo.getAllAdmins().then((admins) => {
		         appRepo.getAllAwards().then((awards) => {
                         res.render('customBI', { admins: admins, awards: awards, users: users, title: "Business Intelligence Reports"});
	    }).catch(error => console.log('Error getting all admins: ', error));
	    }).catch(error => console.log('Error getting all admins: ', error));
	    }).catch(error => console.log('Error getting all admins: ', error));
  });

/*
Generates BI report dependent upon form request specifications
*/
router.post('/', function(req, res, next) {
	if(req.body.custom == "custom"){
		res.redirect('customBI');
	}
	// Request:  All Admins
	if (req.body.adminRadio == "allAdmins" && !(req.body.userRadio) && !(req.body.awardRadio)) {
		appRepo.getAllAdmins().then((admins) => {
			//Sort admins and group by time of account creation
			var sortedAdmins = _.orderBy(admins, ['creation_time'], ['asc']);
			var myJSON = JSON.stringify(getCreationTimes(sortedAdmins));
			var myJSONlogin = JSON.stringify(getLoginAttempts(admins));
            //render page
			res.render('businessIntelligence', {
				admins: admins,
		        title: "Business Intelligence",
		        queryTitle: "Admin Report",
		        myJSON: myJSON, myJSONlogin: myJSONlogin,
		        myJSON2: 0, myJSONorgchart: 0, myJSONregions: 0,
		        chartTitleAU: "Admin Account Creations By Date",
		        chartTitleLogin: "Admin Login Attempts",
		        chartTitleLastLogin: "Admin Last Login",
		        thisReport: "allAdmins"

		    });
	    }).catch(error => console.log('Error getting all admins: ', error));
	}

  	// Request for: all users
	else if (req.body.userRadio == "allUsers" && !(req.body.adminRadio) && !(req.body.awardRadio)) {
		appRepo.getAllUsers().then((users) => {

			var myJSONlogin = JSON.stringify(getLoginAttempts(users));

			//Sort and group users by time of account creation
			var sortedUsers = _.orderBy(users, ['creation_time'], ['asc']);
			var myJSON = JSON.stringify(getCreationTimes(sortedUsers));
						var myJSONregions = JSON.stringify(getRegions(users));
		res.render('businessIntelligence', {
		        users: users,
		        myJSON: myJSON,
		        queryTitle: "User Report",
		        myJSON2: 0,
		        myJSONorgchart: 0, myJSONlogin: myJSONlogin, myJSONregions: myJSONregions,
		        title: "Business Intelligence",
		        chartTitleAU: "User Account Creations By Date",
		        chartTitleLogin: "User Login Attempts",
		        chartTitleLastLogin: "User Last Login",
		        chartTitleRegion: "Users by Region",
		        thisReport: "allUsers"
			});
	    }).catch(error => console.log('Error getting all users: ', error));
	}

	// Request for: all users created by an admin
	else if (req.body.userRadio == "allUsers" && !(req.body.awardRadio) && (req.body.adminRadio != "allAdmins")) {
	    appRepo.getAllUsersCreatedBy(req.body.adminIdText).then((usersA) => {
			var myarray = new Array();
			for (var i = 0; i < usersA.length; i++) {
		        myarray.push([]);
		        myarray[i][0] = usersA[i].id;
		        myarray[i][1] = usersA[i].name;
		        myarray[i][2] = usersA[i].creator_id;
			}
			var myJSONlogin = JSON.stringify(getLoginAttempts(usersA));
						var myJSONregions = JSON.stringify(getRegions(usersA));

			var sortedUsers = _.orderBy(usersA, ['creation_time'], ['asc']);
			var myJSON = JSON.stringify(getCreationTimes(sortedUsers));
			var myJSONorgchart = JSON.stringify(myarray);
			res.render('businessIntelligence', {
		        usersA: usersA,
		        myJSON: myJSON, myJSON2: 0, myJSONorgchart: myJSONorgchart, myJSONlogin: myJSONlogin, myJSONregions: myJSONregions,
		        chartTitleOrg: "Users created by Admin "+ req.body.adminIdText,
		        chartTitle: "User Account Creations By Date",
		        chartTitleLogin: "User Login Attempts",
		        title: "Business Intelligence Reports",
		        chartTitleRegion: "Users by Region",
		        chartTitleLastLogin: "User Last Login",
		        thisReport: "allUsersByAdmin"
			});
	    }).catch(error => console.log('Error getting all users: ', error));
	}

	//Request for:  all awards
	else if (req.body.awardRadio == "allAwards" && !(req.body.userRadio) && !(req.body.adminRadio)) {
		appRepo.getAllAwards().then((awards) => {

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
    		    myJSON: myJSON, myJSON2: myJSON2, myJSONorgchart: 0, myJSONlogin: 0, myJSONregions: 0,
    		    thisReport: "allAwards"
    		});
    	}).catch(error => console.log('Error getting all awards: ', error));
  	}

	//Request for: all awards by a certain user
	else if ((req.body.awardRadio == "allAwards" && (req.body.userRadio == "userId") && !(req.body.adminRadio)) || (req.body.thisReport == "allAwardsByUser")) {
		appRepo.getAllAwardsCreatedBy(req.body.userIdText).then((awards) => {

			var sortedAwards = _.orderBy(awards, ['creation_time'], ['asc']);
			var myJSON = JSON.stringify(getCreationTimes(sortedAwards));
			var myJSON2 = JSON.stringify(awardPieChart(awards));
			res.render('businessIntelligence', {
				awards: awards,
				title: "Business Intelligence Reports",
				chartTitle3: "Awards by Type",
				chartTitle: ("Awards created by" + req.body.userIdText),
				myJSON: myJSON,
				myJSON2: myJSON2, myJSONlogin: 0, myJSONlastLogin: 0, myJSONregions: 0,
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



function awardPieChart(awards){
	var myarray2 = new Array();
		  myarray2.push([]);
	      myarray2[0][0] = "Week";
	      myarray2[0][1] = 0;
	      myarray2.push([]);
	      myarray2[1][0] = "Month";
	      myarray2[1][1] = 0;
	      myarray2.push([]);
		  myarray2[2][0] = "Year";
	      myarray2[2][1] = 0;
	      for(var i = 0; i < awards.length; i++){
			  switch(awards[i].award_type){
				  case "Week":
				 	var temp = myarray2[0][1];
				  	temp++;
		  			myarray2[0][1] = temp;
				  	break;
				  case "Month":
					var temp = myarray2[1][1];
				  	temp++;
		  			myarray2[1][1] = temp;
		  			break;
				  case "Year":
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