var express = require('express');
var router = express.Router();

const AppRepository = require('../app_repository');
const AwardDao = require('../dao');
// const dao = new AwardDao('./newdb.db');
const dao = new AwardDao(':memory:');

const appRepo = new AppRepository(dao);
//appRepo.createRepo();
appRepo.createAdmin('anAdmin@admin.com', 'adminPass', 'admin creation time')
    .then((data) => console.log('Successfully created anAdmin'))
    .catch((error) => console.log('anAdmin problems', error));

router.get('/adminsEdit', function(req, res, next){
	appRepo.getAllAdmins().then((admins) => {
    	 console.log(admins);
    	 console.log("in admin.sj\n");
    	 res.render('admins',  {admins: admins, title: "Admin llAccounts" });
    }).catch(error => console.log('Error getting all admin: ', error));
});

module.exports = router;