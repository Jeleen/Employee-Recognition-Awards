const path = require('path');
const { join, resolve } =path
const absolutePath = path.join(__dirname,'../');
//necessary libarary
var awardPDF = require('../award/createPDF.js');
var createSeal = require('../award/createSeal.js');

//Header columns for csv file the represent what the latex file expects to recive
const csv = require('../node_modules/csv-writer').createObjectCsvWriter;
const csvWriter = csv({
  path: absolutePath+'award/data/namelist.csv',
  header: [
    {id:'recipient_name', title: "Hname"},
    {id:'creation_time', title: "Date"},
    {id:'creator_name', title: "Cname"},
    {id:'creator_sig', title: "Sigy"},
    {id:'award_type', title: "Type"},
 ]
})


//soruce:https://stackoverflow.com/questions/38956121/how-to-add-delay-to-promise-inside-then
function sleeper(ms) {
  return function(x) {
    return new Promise(resolve => setTimeout(() => resolve(x), ms));
  };
}

/*
* csvFee(obj) takes object array,  and with csvWriter
* 	       creates the csv file for latex and passes array object 0 to pdf creator
*          soruce: https://www.npmjs.com/package/csv-writer
*		Delay added to give latex time to generate
**/
function csvFee(records){
csvWriter.writeRecords(records)
.then(()=>{console.log('DONE with csv')
  createSeal()})
  .then(sleeper(3000))
  .then(() =>
  awardPDF(records[0].award_id));

}

module.exports = csvFee;
