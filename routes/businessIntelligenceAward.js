var express = require('express');
var router = express.Router();
var _ = require('lodash');

/**************************************
* Route for BI main page
**************************************/
router.get('/', function (req, res, next) {
    appRepo.getAllAwards().then((awards) => {
        var sortedAwards = _.orderBy(awards, ['creation_time'], ['asc']);
        var myJSONcreationTimes = JSON.stringify(getCreationTimes(sortedAwards));
        var myJSONawardTypes = JSON.stringify(awardPieChart(awards));
        res.render('businessIntelligenceAward', {
            awards,
            myJSONcreationTimes,
            myJSONawardTypes, 
            thisReport: "allAwards"
        });
    }).catch(error => console.log('Error getting all awards: ', error));
});


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
/***************************************
* Prepares and groups award type data
* for chartjs formatting.  Returns
* Returns array award types and counts.
***************************************/
function awardPieChart(awards) {
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
    for (var i = 0; i < awards.length; i++) {
        switch (awards[i].award_type) {
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