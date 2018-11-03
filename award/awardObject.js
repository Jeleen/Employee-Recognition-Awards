
const path = require('path');
const { join, resolve } =path
const absolutePath = path.join(__dirname,'../');

const AwardDao = require('../dao');
const AppRepository = require('../app_repository');
//const dao = new AwardDao('../mydb.db3');
//appRepo = new AppRepository(dao);

var awardPDF = require('../award/createPDF.js');

const moment =require('../node_modules/moment')
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

function awardObject(id){

var result ={};
return appRepo.getAward(id)
 .then(user => {
   result.award_id = id;
   result.recipient_name =user.recipient_name
    result.recipient_email =user.recipient_email
    result.award_type =user.award_type
    result.creation_time =moment(user.creation_time)
    .format('MMM Do, YYYY')

      result.creator_id =user.creator_id
    return getCreator(result);
})
}

function getCreator(obj){
  const array =[]
  return appRepo.getUserById(obj.creator_id)
  .then(cName => {
      obj.creator_name = cName.name
      array.push(obj)
    //console.log(array);
    csvFee(array);
  })

}
function csvFee(records){
csvWriter.writeRecords(records)
.then(()=>{console.log('DONE with csv')
  //console.log(records[0].award_id);
  awardPDF(records[0].award_id);
;})
}


module.exports = awardObject;
