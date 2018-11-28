'use strict';
//path
const path = require('path');
const { join, resolve } =path
const absolutePath = path.join(__dirname,'../');

//library
const nodemailer = require('nodemailer');
const award =require('../award/awardObject.js')
//database
const AwardDao = require('../dao');
const AppRepository = require('../app_repository');

/*  CreateMail
*   Takes award Id, assigns to result object, translates time, and passes it to getCreator func
*/
function createMail(id){
const moment =require('../node_modules/moment')


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
    return getCreator(resultAwardInfo, id)
})

}


function getCreator(obj, id){
  return appRepo.getUserById(obj.creator_id)
  .then(cName => {
      obj.creator_name = cName.name
      obj.creator_email=cName.email
    transportWrapper(obj, id);
  })
}


/*
* function: transportWrapper
*  @params: obj --award info;  id--award id number
*  Description: defines mail content; attaches pdf; and mails pdf to gemail
*/
function transportWrapper(obj, id){
  //hide the credentials in a file
  const gmail =require(absolutePath +'award/gmail.js')

    // create reusable object that is able to send mail
    let transporter = nodemailer.createTransport({
      //hostname or IP addr to connect to

        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        requireTLS: true,
        auth: {
            user: gmail.Username, // generated ethereal user
            pass: gmail.password // generated ethereal password
        }
    });


    var subjectLine= obj.recipient_name +"'s Employee of the " +obj.award_type+ " Award"

    let mailOptions = {
        from: gmail.Username, // sender address
        to: obj.recipient_email, // list of receivers
        subject: subjectLine, // Subject line
        text: 'Congratulations!', // plain text body optional
        //use html to embed images with "cid" value
        html: '<B>You are a...<b><br/><br /> DOWNLOAD your PDF!<img 				src="cid:picture@hah@2a.com"/>', // html body
        //setup the pdf attachment here
  attachments: [{
		filename: id+'.pdf',
		path: absolutePath+'award/'+id+'.pdf'},
    //cid: <same as cid value in html
//  {//filename, path, cid
{
		filename: 'winner.png',
		path: absolutePath+'award/data/image/'+'winner.png',
    cid: 'picture@hah@2a.com'
	}

]
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }

    });
    transporter.close();
};

module.exports = createMail;
