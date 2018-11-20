var express = require('express');
var router = express.Router();
var _ = require('lodash');

router.get('/', function(req, res, next) {
  res.render('businessIntelligence', {
    main: "main", title: "Business Intelligence Reports"
  });
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
			var myJSONcreationTimes = JSON.stringify(getCreationTimes(sortedAdmins));
			var myJSONlogins = JSON.stringify(getLoginAttempts(admins));
            //render page
			res.render('businessIntelligence', {
				admins: admins,
		        title: "Business Intelligence",
		        queryTitle: "Admins",
		        myJSONcreationTimes: myJSONcreationTimes, myJSONlogins: myJSONlogins,
		        myJSONawardTypes: 0, myJSONorgchart: 0, myJSONregions: 0,
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

			var myJSONlogins = JSON.stringify(getLoginAttempts(users));

			//Sort and group users by time of account creation
			var sortedUsers = _.orderBy(users, ['creation_time'], ['asc']);
			var sortedUsersByRegion = _.orderBy(users, ['region'], ['asc']);
			var myJSONcreationTimes= JSON.stringify(getCreationTimes(sortedUsers));
			var myJSONregions = JSON.stringify(getRegions(sortedUsersByRegion));
			console.log(myJSONregions);
			res.render('businessIntelligence', {
		        users: users,
		        myJSONcreationTimes: myJSONcreationTimes,
		        queryTitle: "Users",
		        myJSONawardTypes: 0,
		        myJSONorgchart: 0, myJSONlogins: myJSONlogins, myJSONregions: myJSONregions,
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
			var myJSONlogins = JSON.stringify(getLoginAttempts(usersA));
			var myJSONregions = JSON.stringify(getRegions(usersA));
			var sortedUsers = _.orderBy(usersA, ['creation_time'], ['asc']);
			var myJSONcreationTimes = JSON.stringify(getCreationTimes(sortedUsers));
			var myJSONorgchart = JSON.stringify(myarray);
			res.render('businessIntelligence', {
		        usersA: usersA,
		        myJSONcreationTimes: myJSONcreationTimes, myJSONawardTypes: 0, myJSONorgchart: myJSONorgchart, myJSONlogins: myJSONlogins, myJSONregions: myJSONregions,
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
	        var myJSONcreationTimes = JSON.stringify(getCreationTimes(sortedAwards));
			var myJSONawardTypes = JSON.stringify(awardPieChart(awards));
    		res.render('businessIntelligence', {
    		    awards: awards,
    		    queryTitle: "Awards",
				title: "Business Intelligence Reports",
    		    chartTitleA: "Award Creations by Date",
    		    chartTitle3: "Awards by Type",
    		    myJSONcreationTimes: myJSONcreationTimes, myJSONawardTypes: myJSONawardTypes, myJSONorgchart: 0, myJSONlogins: 0, myJSONregions: 0,
    		    thisReport: "allAwards"
    		});
    	}).catch(error => console.log('Error getting all awards: ', error));
  	}

	//Request for: all awards by a certain user
	else if ((req.body.awardRadio == "allAwards" && (req.body.userRadio == "userId") && !(req.body.adminRadio)) || (req.body.thisReport == "allAwardsByUser")) {
		appRepo.getAllAwardsCreatedBy(req.body.userIdText).then((awards) => {
			var sortedAwards = _.orderBy(awards, ['creation_time'], ['asc']);
			var myJSONcreationTimes = JSON.stringify(getCreationTimes(sortedAwards));
			var myJSONawardTypes = JSON.stringify(awardPieChart(awards));
			res.render('businessIntelligence', {
				awards: awards,
				title: "Business Intelligence Reports",
				chartTitle3: "Awards by Type",
				chartTitle: ("Awards created by" + req.body.userIdText),
				myJSONcreationTimes: myJSONcreationTimes,
				myJSONawardTypes: myJSONawardTypes, myJSONlogins: 0, myJSONlastLogin: 0, myJSONregions: 0,
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
			myarray2.push([]);
		myarray2[0][0] = group[0].region;
		myarray2[0][1] = 1;
		for(var i = 0; i < group.length; i++){
	    	if(i == 0){
				if(myarray2[0][0] == group[1].region){
				    var temp = myarray2[0][1];
				    myarray2[0][1] = 2;
				}
				else{
					myarray2.push([]);
					myarray2[1][0] = group[1].region;
					myarray2[1][1] = 1;
				}
			}else{
				if(myarray2[myarray2.length - 1][0] == group[i].region){
				    var temp = myarray2[myarray2.length - 1][1];
				    temp++;
				    myarray2[myarray2.length - 1][1] = temp;
				}
				else{
					myarray2.push([]);
					myarray2[myarray2.length - 1][0] = group[i].region;
					myarray2[myarray2.length - 1][1] = 1;
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
        var year = date1.getFullYear();
        var month = ('0' + (date1.getMonth() + 1)).slice(-2);
		var date = ('0' + date1.getDate()).slice(-2);
		var shortDate = month + '/' + date + '/' + year;
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


function awardPieChart(awards)
{
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
	    }
	}
	return myarray2;
}


module.exports = router;