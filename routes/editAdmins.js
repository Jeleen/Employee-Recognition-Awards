var express = require('express');
var router = express.Router();

/**********************************************
* Route for saving edits or deleting accounts.
**********************************************/
router.post('/', function (req, res, next) {
    if (req.body['Delete'] == "Delete") {
        if (req.body.id != req.session.loggedInId) {
            appRepo.removeAdmin(req.body.id)
               .then((data) => console.log('Succesfully removed admin'))
                .catch((error) => console.log('Error removing admin', error));
            var info = "Deleted Admin ID: " + req.body.id;
        }
        else {
            var info = "Cannot delete your own account.";
        }
        appRepo.getAllAdmins().then((admins) => {
            res.render('getAllAdmins', { info, admins });
        }).catch((error) => console.log('Error getting all admins', error));
     }
     else if(req.body['Edit'] == "Edit"){
        appRepo.getAdminById(req.body.id).then((admin) => {
            res.render('editAdmins', { admin });
	  }).catch((error) => console.log('Error getting admin to edit', error));
	 }
	 else if(req.body['Save'] == "Save"){
	 		appRepo.updateAdminNameAndEmail(req.body.id, req.body.name, req.body.email).then((admin) => {
	    	 }).catch((error) => console.log('Error updating admin', error));
            appRepo.getAllAdmins().then((admins) => {
                res.render('getAllAdmins', { info: "Admin ID: " + req.body.id + " updated.", admins });
            }).catch((error) => console.log('Error getting all admins', error));	 }

     else{
			res.redirect('getAllAdmins');
     }
});

module.exports = router;

