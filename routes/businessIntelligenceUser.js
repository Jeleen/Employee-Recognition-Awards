var express = require('express');
var router = express.Router();
var _ = require('lodash');

/**************************************
* Route for BI main page
**************************************/
router.get('/', function (req, res, next) {
    appRepo.getAllUsers().then((users) => {
        var myJSONlogins = JSON.stringify(getLoginAttempts(users));
        //Sort and group users by time of account creation
        var sortedUsers = _.orderBy(users, ['creation_time'], ['asc']);
        var sortedUsersByRegion = _.orderBy(users, ['region'], ['asc']);
        var myJSONcreationTimes = JSON.stringify(getCreationTimes(sortedUsers));
        var myJSONregions = JSON.stringify(getRegions(sortedUsersByRegion));
        res.render('businessIntelligenceUser', {
            users,
            myJSONcreationTimes,
            myJSONlogins,
            myJSONregions,
            thisReport: "allUsers"
        });
    }).catch(error => console.log('Error getting all users: ', error));
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
* Prepares user region data for
* googlecharts formatting requirements
* Returns array of regions and count
***************************************/
function getRegions(group) {
    var myarray2 = new Array();
    myarray2.push([]);
    myarray2[0][0] = group[0].region;
    myarray2[0][1] = 1;
    for (var i = 0; i < group.length; i++) {
        if (group.length > 1) {
            if (i == 0) {
                if (myarray2[0][0] == group[1].region) {
                    var temp = myarray2[0][1];
                    myarray2[0][1] = 2;
                }
                else {
                    myarray2.push([]);
                    myarray2[1][0] = group[1].region;
                    myarray2[1][1] = 1;
                }
            } else {
                if (myarray2[myarray2.length - 1][0] == group[i].region) {
                    var temp = myarray2[myarray2.length - 1][1];
                    temp++;
                    myarray2[myarray2.length - 1][1] = temp;
                }
                else {
                    myarray2.push([]);
                    myarray2[myarray2.length - 1][0] = group[i].region;
                    myarray2[myarray2.length - 1][1] = 1;
                }
            }
        }
    }
    return myarray2;
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