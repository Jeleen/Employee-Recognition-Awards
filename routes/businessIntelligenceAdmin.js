var express = require('express');
var router = express.Router();
var _ = require('lodash');

/**************************************
* Route for BI main page
**************************************/
router.get('/', function (req, res, next) {
    appRepo.getAllAdmins().then((admins) => {
        //Sort admins and group by time of account creation
        var sortedAdmins = _.orderBy(admins, ['creation_time'], ['asc']);
        var myJSONcreationTimes = JSON.stringify(getCreationTimes(sortedAdmins));
        var myJSONlogins = JSON.stringify(getLoginAttempts(admins));
        //render page
        res.render('businessIntelligenceAdmin', {
            admins: admins,
            myJSONcreationTimes: myJSONcreationTimes, myJSONlogins: myJSONlogins,
            chartTitleAU: "Admin Account Creations By Date",
            chartTitleLogin: "Admin Login Attempts",
            thisReport: "allAdmins"
        });
    }).catch(error => console.log('Error getting all admins: ', error));
});

/**************************************
* Prepares login_attempts data
* for chartjs formatting requirements,
* Returns array of login attempts and ids
**************************************/
function getLoginAttempts(group) {
    var myarray = new Array();
    for (var i = 0; i < group.length; i++) {
        myarray.push([]);
        myarray[i][0] = group[i].id;
        myarray[i][1] = group[i].login_attempts;
    }
    return myarray;
}

/***************************************
* Prepares creation_time data for
* chartjs formatting requirements.
* Returns array of creation times with
* UTC short date
***************************************/
function getCreationTimes(sortedUsers) {
    var myarray = new Array();
    for (var i = 0; i < sortedUsers.length; i++) {
        var date1 = new Date(sortedUsers[i].creation_time);
        var year = date1.getFullYear();
        var month = ('0' + (date1.getMonth() + 1)).slice(-2);
        var date = ('0' + date1.getDate()).slice(-2);
        var shortDate = month + '/' + date + '/' + year;
        if (i != 0) {
            if (myarray[myarray.length - 1][0] == shortDate) {
                var temp = myarray[myarray.length - 1][1];
                temp++;
                myarray[myarray.length - 1][1] = temp;
            }
            else {
                myarray.push([]);
                myarray[myarray.length - 1][0] = shortDate;
                myarray[myarray.length - 1][1] = 1;
            }
        } else {
            myarray.push([]);
            myarray[0][0] = shortDate;
            myarray[0][1] = 1;
        }
    }
    return myarray;
}
module.exports = router;