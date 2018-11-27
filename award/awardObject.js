//pathing
const path = require('path');
const { join, resolve } =path
const absolutePath = path.join(__dirname,'../');

//database
const AwardDao = require('../dao');
const AppRepository = require('../app_repository');

//needed libraries (create CSV and transcribe Time)
const createCSV = require('../award/createCSV.js');
const moment =require('../node_modules/moment')

//create a global constant:

/*
* awardObjec(id); id is the award id; the output is an object with the necesary award info
*/
function awardObject(id){

const resultAwardInfo ={}
return appRepo.getAward(id)
 .then(user => {
   resultAwardInfo.award_id = id;
   resultAwardInfo.recipient_name =user.recipient_name
    resultAwardInfo.recipient_email =user.recipient_email
    resultAwardInfo.award_type =user.award_type
    resultAwardInfo.creation_time =moment(user.creation_time)
    .format('MMM Do, YYYY')
    resultAwardInfo.creator_id =user.creator_id
    return getCreator(resultAwardInfo)
})
}
/*
* getCreator(obj) takes awardObj, creates array, adds creator name to the object array,
*          and passes object arrat to CSV creator (which expects object array format)
*/
function getCreator(obj){
  const array =[];
  return appRepo.getUserById(obj.creator_id)
  .then(cName => {
      console.log("WHAT IS IN cNAME", cName);
      obj.creator_name = cName.name
      console.log("Before", cName.sig_image_path);
      if(cName.sig_image_path == null){
		var sig_path = 'image/tempImage.png'
     }else{     
      var sig_path= cName.sig_image_path.substring(cName.sig_image_path.lastIndexOf("image"))
	};
      console.log(sig_path);
    //  cName.sig_image_path.substring(0, cName.sig_image_path.lastIndexOf("/"));
      obj.creator_sig=sig_path
      array.push(obj)
    //console.log(array);
    createCSV(array);
  })

}


module.exports.awardObject = awardObject;
//module.exports.mailAwardObj=mailAwardObj;
