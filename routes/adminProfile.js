var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
	  appRepo.getAdminById(req.session.loggedInId).then((admin) => {
		res.render('adminProfile',  {admin: admin, timeC: convertDate(admin.creation_time), timeLL: convertDate(admin.last_login), title: "My Profile" });
    }).catch(error => console.log('Error getting admin: ', error));
});

router.post('/', function(req, res, next){
	if(req.body['edit'] == "edit"){
		appRepo.getAdminById(req.session.loggedInId).then((admin) => {
		res.render('adminProfile',  {admin: admin, edit: "edit", timeC: convertDate(admin.creation_time), timeLL: convertDate(admin.last_login), title: "My Profile" });
	    }).catch(error => console.log('Error getting admin: ', error));
    }

    else if(req.body['view'] == "view"){
		appRepo.getAdminById(req.session.loggedInId).then((admin) => {
	    res.render('adminProfile',  {admin: admin, view: "view", timeC: convertDate(admin.creation_time), timeLL: convertDate(admin.last_login), title: "My Profile" });
	    }).catch(error => console.log('Error getting admin: ', error));
	}
	else{
		appRepo.updateAdminEmail(req.body.email, req.body.id)
  .then((data) => console.log('Succesfully updated admin email'))
.catch((error) => console.log('Error updating admin email', error));

	appRepo.getAdminById(req.body.id).then((admin) => {
	res.render('adminProfile',  {admin: admin, timeC: convertDate(admin.creation_time), timeLL: convertDate(admin.last_login), title: "My Profile" });
    }).catch(error => console.log('Error getting admin: ', error));
}
});

function convertDate(myDate)
{
	    var date1 = new Date(myDate);
        var year = date1.getFullYear();
        var month = ('0' + (date1.getMonth() + 1)).slice(-2);
		var date = ('0' + date1.getDate()).slice(-2);
		var hours = ('0' + date1.getUTCHours()).slice(-2);
		var minutes = ('0' + date1.getUTCMinutes()).slice(-2);
	    var seconds = ('0' + date1.getUTCSeconds()).slice(-2);
        var shortDate = month + '/' + date + '/' + year + ' ' + hours + ':' + minutes + ':' + seconds + ' UTC';
          console.log(shortDate);

    return shortDate;
}
module.exports = router;
