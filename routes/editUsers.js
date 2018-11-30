var express = require('express');
var router = express.Router();

/**********************************************
* Route for saving edits or deleting accounts.
**********************************************/
router.post('/', function (req, res, next) {
    console.log(req.body);
    if (req.body['Delete'] == "Delete") {
        appRepo.removeUser(req.body.id)
            .then((data) => console.log('Succesfully removed user'))
            .catch((error) => console.log('Error removing user', error));
        appRepo.getAllUsers().then((users) => {
            res.render('getAllUsers', { info: "User " + req.body.id + " deleted.", users });
        }).catch((error) => console.log('Error getting all users', error));
    }
    else if (req.body['Edit'] == "Edit") {
        appRepo.getUserById(req.body.id).then((user) => {
            res.render('editUsers', { user });
        }).catch((error) => console.log('Error getting user to edit', error));
    }
    else if (req.body['Save'] == "Save") {
        appRepo.updateUserNameAndEmail(req.body.id, req.body.name, req.body.email).then((user) => {
        }).catch((error) => console.log('Error updating user', error));
        appRepo.getAllUsers().then((users) => {
            res.render('getAllUsers', { info: "User " + req.body.id + " updated." });
        }).catch((error) => console.log('Error getting all users', error));
    }
    else {
        res.redirect('getAllUsers');
    }
});

module.exports = router;

