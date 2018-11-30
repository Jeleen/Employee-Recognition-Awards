var express = require('express');
var router = express.Router();

/**************************************
* Route for edit mode
**************************************/
router.get('/', function (req, res, next) {
    appRepo.getAdminById(req.session.loggedInId).then((admin) => {
        res.render('adminProfileEdit', { admin });
    }).catch(error => console.log('Error getting admin: ', error));
});

/**************************************
* Route for edits made
**************************************/
router.post('/', function (req, res, next) {
    appRepo.updateAdminNameAndEmail(req.body.id, req.body.name, req.body.email)
        .then((data) => console.log('Succesfully updated admin email and name'))
        .catch((error) => console.log('Error updating admin email and name', error));
    appRepo.getAdminById(req.body.id).then((admin) => {
        res.render('adminProfile', { admin, info: "Profile updated."});
    }).catch(error => console.log('Error getting admin: ', error));
});

module.exports = router;
