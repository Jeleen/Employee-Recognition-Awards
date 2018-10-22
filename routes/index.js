var express = require('express');
var router = express.Router();

var login2Ctrl = require('./login2');
var adminMainCtrl = require('./adminMain');
var adminProfileCtrl = require('./adminProfile');
var businessIntelligenceCtrl = require('./businessIntelligence');

const AwardDao = require('../dao');
const AppRepository = require('../app_repository');
const dao = new AwardDao('./mydb.db3');
const appRepo = new AppRepository(dao);
appRepo.createRepo();


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', { title: "Welcome, please login.", layout: "layout2.hbs" });
});

router.get('/login2', login2Ctrl);
router.get('/adminProfile', adminProfileCtrl);
//router.get('/adminProfileEdit', adminProfileCtrl);
router.get('/adminMain', adminMainCtrl);
router.get('/getAllAdmins', adminMainCtrl);
router.get('/getAllUsers', adminMainCtrl);
router.get('/createUser', adminMainCtrl);
router.get('/usersAdd', adminMainCtrl);
router.get('/addUserView', adminMainCtrl);
router.get('/usersEdit', adminMainCtrl);
router.get('/businessIntelligence', businessIntelligenceCtrl);

module.exports = router;
