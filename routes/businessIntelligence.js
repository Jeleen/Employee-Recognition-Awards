var express = require('express');
var router = express.Router();

const createCsvWriter = require('csv-writer').createObjectCsvWriter;
router.get('/', function(req, res, next) {
  res.render('businessIntelligence', {
    title: "Business Intelligence Reports"
  });
});

router.post('/', function(req, res, next) {
	// Request for: all admin
  if (req.body.adminRadio == "allAdmins" && !(req.body.userRadio) && !(req.body.awardRadio)) {
    appRepo.getAllAdmins().then((admins) => {
      if (req.body.exportToCSV == "Export to CSV file") {
		  var exportCSV = "Report exported to CSV file:  data.csv";
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
		else{ var exportCSV = "";}
      var myarray = new Array();
      var searchtitle = "Admin Login Attempts";
      for (var i = 0; i < admins.length; i++) {
        myarray.push([]);
        myarray[i][0] = admins[i].email.toString();
        myarray[i][1] = admins[i].login_attempts;
      }
      var myJSON = JSON.stringify(myarray);
      res.render('businessIntelligence', {
        admins: admins,
        myJSON: myJSON,
        searchtitle: searchtitle,
        title: "Business Intelligence Reports",
        exportCSV: exportCSV
      });
    }).catch(error => console.log('Error getting all admins: ', error));
  }
  	// Request for: all users
  else if (req.body.userRadio == "allUsers" && !(req.body.adminRadio) && !(req.body.awardRadio)) {
    appRepo.getAllUsers().then((users) => {
      if (req.body.exportToCSV == "Export to CSV file") {
		  		 var exportCSV = "Report exported to CSV file:  data.csv";

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
      		else { var exportCSV = "";}

      var myarray = new Array();
      for (var i = 0; i < users.length; i++) {
        myarray.push([]);
        myarray[i][0] = users[i].name.toString();
        myarray[i][1] = users[i].login_attempts;
      }
      var searchtitle = "User Login Attempts";
      var myJSON = JSON.stringify(myarray);
      res.render('businessIntelligence', {
        users: users,
        myJSON: myJSON,
        title: "Business Intelligence Reports",
        exportCSV: exportCSV
      });
    }).catch(error => console.log('Error getting all users: ', error));
  }


	// Request for: all users created by an admin
  else if (req.body.userRadio == "allUsers" && !(req.body.awardRadio) && (req.body.adminRadio != "allAdmins")) {
    appRepo.getAllUsersCreatedBy(req.body.adminIdText).then((users) => {
      if (req.body.exportToCSV == "Export to CSV file") {
		  		var exportCSV = "Report exported to CSV file:  data.csv";

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
      		else{ var exportCSV = "";}

      var myarray = new Array();
      var searchtitle = "Users Created By Admin ";
      for (var i = 0; i < users.length; i++) {
        myarray.push([]);
        myarray[i][0] = users[i].id.toString();
        myarray[i][1] = users[i].name.toString();
        myarray[i][2] = users[i].creator_id.toString();
      }
      var myJSON = JSON.stringify(myarray);
      console.log(myJSON);
      res.render('businessIntelligence', {
        users: users,
        myJSON: myJSON,
        searchtitle: searchtitle,
        title: "Business Intelligence Reports",
        exportCSV: exportCSV
      });
    }).catch(error => console.log('Error getting all users: ', error));
  }

  //Request for:  all awards
  else if (req.body.awardRadio == "allAwards" && !(req.body.userRadio) && !(req.body.adminRadio)) {
    appRepo.getAllAwards().then((awards) => {
      if (req.body.exportToCSV == "Export to CSV file") {
		  		  var exportCSV = "Report exported to CSV file:  data.csv";

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
		else{ var exportCSV = "";}

      var myarray = new Array();
      myarray.push([]);
      myarray[0][0] = "something";
      myarray[0][1] = "else";
      var searchtitle = "All Awards";
      for (var i = 0; i < awards.length; i++) {
        myarray.push([]);
        myarray[i][0] = awards[i].recipient_name;
        myarray[i][1] = awards[i].recipient_email;
      }
      var myJSON = JSON.stringify(myarray);
      res.render('businessIntelligence', {
        awards: awards,
        title: "Business Intelligence Reports",
        exportCSV: exportCSV
      });
    }).catch(error => console.log('Error getting all awards: ', error));
  }


  //Request for: all awards by a certain user
  else if (req.body.awardRadio == "allAwards" && (req.body.userRadio == "userId") && !(req.body.adminRadio)) {
    appRepo.getAllAwardsCreatedBy(req.body.userIdText).then((awards) => {
      if (req.body.exportToCSV == "Export to CSV file") {
		  		  var exportCSV = "Report exported to CSV file:  data.csv";

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
		else{ var exportCSV = "";}

      var myarray = new Array();
      var searchtitle = "Awards created By User ";
      for (var i = 0; i < awards.length; i++) {
        myarray.push([]);
        myarray[i][0] = awards[i].award_type;
        myarray[i][1] = awards[i].id;
        myarray[i][2] = awards[i].recipient_name;
        myarray[i][3] = awards[i].recipient_email;
        myarray[i][4] = awards[i].creation_time;
        myarray[i][5] = awards[i].creator_id;

      }
      var myJSON = JSON.stringify(myarray);
            console.log(myJSON);

      res.render('businessIntelligence', {
        awards: awards,
        title: "Business Intelligence Reports",
        exportCSV: exportCSV
      });
    }).catch(error => console.log('Error getting all awards: ', error));
  }
});
module.exports = router;