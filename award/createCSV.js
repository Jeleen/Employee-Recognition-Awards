const path = require('path');
const { join, resolve } =path
const absolutePath = path.join(__dirname,'../');

//necessary libarary
var awardPDF = require('../award/createPDF.js');

//Header columns for csv file the represent what the latex file expects to recive
const csv = require('../node_modules/csv-writer').createObjectCsvWriter;
const csvWriter = csv({
  path: absolutePath+'award/data/namelist.csv',
  header: [
    {id:'recipient_name', title: "Hname"},
    {id:'creation_time', title: "Date"},
    {id:'creator_name', title: "Cname"},
    {id:'award_type', title: "Type"},
 ]
})


/*
* csvFee(obj) takes object array,  and with csvWriter 
* 	       creates the csv file for latex and passes array object 0 to pdf creator
*/
function csvFee(records){
csvWriter.writeRecords(records)
.then(()=>{console.log('DONE with csv')
  //console.log(records[0].award_id);
  awardPDF(records[0].award_id);
;})
}

module.exports = csvFee;
