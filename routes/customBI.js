var express = require('express');
var router = express.Router();
var _ = require('lodash');

const csvdata = require('csvdata');
var http = require('http'),
    fileSystem = require('fs'),
    path = require('path');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

/**************************************
* Route for BI Custom BI main page
**************************************/
router.get('/', function(req, res, next) {
    res.render('customBI');
});

/**************************************
* Route for Custom BI searches
**************************************/
router.post('/', function(req, res, next) {
     //assign table names and name/region/email strings for sqlite strings
    var table1 = setSearchTerm(req.body['searchType1a']);
    var table1c = JSON.stringify(req.body['searchType1c']);
    var table2c = JSON.stringify(req.body['searchType2c']);
    //Check for exporting csv report
    if (req.body['csvReport1'] == "csvReport1") {
        checkExportCSV(res, req.body);
    }

    /*************************************
    If a table is specified
    *************************************/
    else if(req.body['searchType1a'] != "Select..."){
      /*************************************
        one attribute specified in 1st row
        *************************************/
        if ((req.body['searchType1b'] != "Select...") && (req.body['searchType2b'] == "Select...") && (req.body['searchType1c'] != " " )) {
            var search_string = "SELECT * FROM " + table1 + " WHERE " + req.body['searchType1b'] + " = " + table1c;
            //Get report for 1st table and attribute
            appRepo.getAllThreeAndOneA(search_string).then((results) => {
                //remove password field and convert dates
                    for (var i = 0; i < results.length; i++) {
                        delete(results[i].password);
                        results[i].creation_time = convertDate(results[i].creation_time);
                        if(results[i].last_login){
                            results[i].last_login = convertDate(results[i].last_login);
                        }
                    }
                //check for no data, create message
                if (results.length == 0) {
                    var noData = createNoDataMessage(req.body);
                }
                //Save to csv file for possible user export
                writeToLocalCSV('./data.csv', results);
                res.render('customBI', {
                    csvReport1: "csvReport1",
                    results: results,
                    resultsHeaders: results[0],
                    resultsTitle: req.body['searchType1a'] + " " + req.body['searchType1b'] + " " + table1c,
                    noData: noData
                });
            }).catch(error => console.log('Error getting ' + search_string, error));
        }

        /*************************************
        one attribute specified in 2nd row
        *************************************/
        else if ((req.body['searchType1b'] == "Select...") && (req.body['searchType2b'] != "Select...") && (req.body['searchType2c'] != " " )) {
            //get report
            var search_string = "SELECT * FROM " + table1 + " WHERE " + req.body['searchType2b'] + " = " + table2c;
            appRepo.getAllThreeAndOneA(search_string).then((results) => {
                //remove password field and convert dates
                for (var i = 0; i < results.length; i++) {
                    delete(results[i].password);
                    results[i].creation_time = convertDate(results[i].creation_time);
                    if(results[i].last_login){
                        results[i].last_login = convertDate(results[i].last_login);
                    }
                }
                if (results.length == 0) {
                    var noData = createNoDataMessage(req.body);
                }
                //save report to csv file for potential export
                writeToLocalCSV('./data.csv', results);
                res.render('customBI', {
                    csvReport1: "csvReport1",
                    results: results,
                    resultsHeaders: results[0],
                    resultsTitle: req.body['searchType1a'] + " " + req.body['searchType2b'] + " " + table2c,
                    noData: noData
                });
            }).catch(error => console.log('Error getting ' + search_string, error));
        }

        /*************************************
         two attributes specified
        *************************************/
        else if ((req.body['searchType1b'] != "Select...") && (req.body['searchType2b'] != "Select...") && (req.body['searchType1c'] != " " ) && (req.body['searchType2c'] != " " )) {
            //check for and/or and apply to sql search string
            if (req.body['andOr'] == "or") {
                var search_string = "SELECT * FROM " + table1 + " WHERE " + req.body['searchType1b'] +
                    " = " + table1c + " OR " + req.body['searchType2b'] + " = " + table2c;
            } else {
                var search_string = "SELECT * FROM " + table1 + " WHERE " + req.body['searchType1b'] +
                    " = " + table1c + " AND " + req.body['searchType2b'] + " = " + table2c;
            }
            //get report
            appRepo.getAllThreeAndOneA(search_string).then((results) => {
                //remove password field and convert dates
                for (var i = 0; i < results.length; i++) {
                    delete(results[i].password);
                    results[i].creation_time = convertDate(results[i].creation_time);
                    if(results[i].last_login){
                        results[i].last_login = convertDate(results[i].last_login);
                    }
                }
                // if results, create title for table
                if (results.length != 0) {
                    var resultsTitle = req.body['searchType1a'] + " where " + req.body['searchType1b'] + " = " + table1c + req.body['andOr'] + " " + req.body['searchType2b'] + " = " + table2c;
                }
                //if no results, create noData message
                if (results.length == 0) {
                    var noData = createNoDataMessage(req.body);
                }
                //Save to csv file for potential exporting
                writeToLocalCSV('./data.csv', results);
                res.render('customBI', {
                    csvReport1: "csvReport1",
                    results: results,
                    resultsHeaders: results[0],
                    resultsTitle: resultsTitle,
                    noData: noData
                });
            }).catch(error => console.log('Error getting ' + search_string, error));
        }
        /*************************************
         no attributes specified
        *************************************/
        else if (req.body['searchType1b'] == "Select..." && req.body['searchType2b'] == "Select...") {
            var search_string = "SELECT * FROM " + table1;
            appRepo.getAllThreeAndOneA(search_string).then((results) => {
                //Delete password fields and convert date
                for (var i = 0; i < results.length; i++) {
                    delete(results[i].password);
                    results[i].creation_time = convertDate(results[i].creation_time);
                    if(results[i].last_login){
                       results[i].last_login = convertDate(results[i].last_login);
                    }
                }
                //if no data, create no data message
                if (results.length == 0) {
                    var noData = createNoDataMessage(req.body);
                }
                if (results.length != 0) {
                    var resultsTitle = "All " + req.body['searchType1a'];
                }
                writeToLocalCSV('./data.csv', results);
                res.render('customBI', {
                    csvReport1: "csvReport1",
                    results,
                    resultsHeaders: results[0],
                    resultsTitle: resultsTitle,
                    noData: noData
                });
            }).catch(error => console.log('Error getting all admins: ', error));
        }
        else {
	        res.render('customBI', {
	            noData: "Error processing request\n" + createNoDataMessage(req.body)
	        });
    	}
    }

    /************************************
    Else there's an error
    *************************************/
    else {
        res.render('customBI', {
            noData: "Error processing request\n" + createNoDataMessage(req.body)
        });
    }
});

/**************************************
*   Creates 'no data message' and string
*   containing invalid search criteria
**************************************/
function createNoDataMessage(reqBody) {
    //if no results, prepare 'no data' message
    var noData = "No data for: " + reqBody['searchType1a'];
    if(reqBody['searchType1b'] != "Select..."){
        noData += " " + reqBody['searchType1b'] + " = " + reqBody['searchType1c'];
    }
    if(reqBody['andOr'] == "and" || reqBody['andOr'] == "or"){
        noData += " " + reqBody['andOr'];
    }
    if(reqBody['searchType2b'] != "Select..."){
        noData += " " + reqBody['searchType2b'] + " = " + reqBody['searchType2c'];
    }

    return noData;
}

/**************************************************
 *    If exportCSV button was pressed, export
 *    locally saved csv file
 ***************************************************/
function checkExportCSV(res, req) {
    if (req['csvReport1'] == "csvReport1") {
        var filePath = path.join(__dirname, '../data.csv');
        var stat = fileSystem.statSync(filePath);
        res.writeHead(200, {
            'Content-Type': 'text/csv',
            'Content-Disposition': 'attachment;filename=data.csv'
        });
        var readStream = fileSystem.createReadStream(filePath);
        readStream.pipe(res);
    } else if (req['csvReport2'] == "csvReport2") {
        var filePath = path.join(__dirname, '../data2.csv');
        var stat = fileSystem.statSync(filePath);
        res.writeHead(200, {
            'Content-Type': 'text/csv',
            'Content-Disposition': 'attachment;filename=data2.csv'
        });
        var readStream = fileSystem.createReadStream(filePath);
        readStream.pipe(res);
    }
}

/**************************************************
 *    Set sqlite friendly table search terms
 ***************************************************/
function setSearchTerm(table) {
    var tableTerm;
    if (table == "Admin(s)") {
        tableTerm = "admins";
    } else if (table == "User(s)") {
        tableTerm = "users";
    } else if (table == "Award(s)") {
        tableTerm = "awards";
    }
    return tableTerm;
}

/***************************************************
 *    Write report to CSV file for
 *    potential user export
 ***************************************************/
function writeToLocalCSV(file, reportData) {
    if (reportData.length != 0) {
        var myheader = Object.keys(reportData[0]);
        var mh = myheader.join();
        csvdata.write(file, reportData, {
            header: mh
        });
    }
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