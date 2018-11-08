//pathing
const path = require('path');
const { join, resolve } =path
const absolutePath = path.join(__dirname,'../');

//database
const AwardDao = require('../dao');
const AppRepository = require('../app_repository');

//needed libraries
const createCSV = require('../award/createCSV.js');
const moment =require('../node_modules/moment')

/*
* awardObjec(id); id is the award id; the output is an object with the necesary award info
*/
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
/*
* getCreator(obj) takes awardObj, creates array, adds creator name to the object array,
*          and passes object arrat to CSV creator (which expects object array format)
*/
function getCreator(obj){
  const array =[]
  return appRepo.getUserById(obj.creator_id)
  .then(cName => {
      obj.creator_name = cName.name
      array.push(obj)
    //console.log(array);
    createCSV(array);
  })

}


module.exports = awardObject;