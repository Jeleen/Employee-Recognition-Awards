var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');
const path = require('path');
const { join, resolve } = path
const absolutePath = path.join(__dirname,'../');
const gmail = require(absolutePath +'award/gmail.js')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('forgot_password');
});

router.post('/', function(req, res, next) {
  var emailOfForgotten = req.body.email;
  appRepo.getUserByEmail(emailOfForgotten).then((user) => {
    var newPassword = makeRandomPassword();
    if (user) {
      appRepo.editUserPassword(user.id, newPassword).then(() => {
        // Email user their new Password
        console.log("User's new password: " + newPassword);
        sendEmail(user.email, newPassword);
        res.render('forgot_password', { info: "If you entered a valid email associated with an account, an email has been sent"});
      });
    } else {
      appRepo.getAdminByEmail(emailOfForgotten).then((foundAdmin) =>{
        if (foundAdmin) {
          appRepo.editAdminPassword(foundAdmin.id, newPassword).then(() => {
            console.log("Admin's new password: " + newPassword);
            sendEmail(foundAdmin.email, newPassword);
          });
        }
        res.render('forgot_password', { info: "If you entered a valid email associated with an account, an email has been sent"});
      });
    }
  })
  .catch((error) => {
    console.log("Error attempting to reset user's password", error);
    res.render('forgot_password', { info: "If you entered a valid email associated with an account, an email has been sent"});
  });
});

function sendEmail(destEmail, newPassword) {
  let transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      requireTLS: true,
      auth: {
        user: gmail.Username,
        pass: gmail.password
      }
  });

  let mailOptions = {
      from: gmail.Username,
      to: destEmail,
      subject: 'Employe Recognition Award Password Reset',
      html: '<b>Here is your new password: ' + newPassword + ' </b>'
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log("Email sent!");
    });

  transporter.close();
}

// https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
function makeRandomPassword() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 8; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

module.exports = router;
