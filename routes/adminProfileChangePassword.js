var express = require('express');
var router = express.Router();

/**************************************
* Route for change Password mode
**************************************/
router.get('/', function (req, res, next) {
    res.render('adminProfileChangePassword');
});

/**************************************
* Route for admin to password update
**************************************/
router.post('/', function (req, res, next) {
    var existing = req.body.old;
    var newPassword = req.body.new;
    appRepo.getAdminById(req.session.loggedInId)
        .then(admin => {
            if (admin.password == existing) {
                appRepo.editAdminPassword(req.session.loggedInId, newPassword)
                    .then(() => res.render('adminProfile', { admin: admin, info: "Password updated." }));
            } else {
                res.render('adminProfile', { admin, info: "Incorrect password." });
            }
        })
        .catch((error) => console.log(error));
});

module.exports = router;
