var express = require('express');
var router = express.Router();

/**************************************
* Route for 'Add Admin' main page
**************************************/
router.get('/', function(req, res, next) {
	res.render('addAdmin');
});

/**************************************
* Route for adding admin, routes
* save and cancel requests
**************************************/
router.post('/', function(req, res, next) {
    if (req.body.cancel == "cancel") {
        res.redirect('getAllAdmins');
    }
    //Creates new admin account with default password
    else {
        var d = new Date();
        appRepo.createAdmin(req.body.name, req.body.email, "12345", req.session.loggedInId)
            .then((data) => console.log('Succesfully created admin'))
            .catch((error) => console.log('Error creating admin', error));
        appRepo.getAllAdmins().then((admins) => {
            res.render('getAllAdmins', { admins, info: "Admin " + req.body.name + " added." });
        }).catch(error => console.log('Error getting all admins', error));
    }
});

module.exports = router;
