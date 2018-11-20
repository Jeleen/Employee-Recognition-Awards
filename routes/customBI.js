var express = require('express');
var router = express.Router();
var _ = require('lodash');





router.get('/', function(req, res, next) {
	appRepo.getAllUsers().then((users) => {
		appRepo.getAllAdmins().then((admins) => {
	         appRepo.getAllAwards().then((awards) => {
                 res.render('customBI', { admins: admins, awards: awards, users: users, title: "Business Intelligence Reports"});
		    }).catch(error => console.log('Error getting all admins: ', error));
	    }).catch(error => console.log('Error getting all admins: ', error));
    }).catch(error => console.log('Error getting all admins: ', error));
});

router.post('/', function(req, res, next){
		if(req.body['column2And']){
				appRepo.getAllUsersAndAdmins().then((both) => {
					console.log(both);
					 res.render('customBI', { both: both });
				}).catch(error => console.log('Error getting admin by Id: ', error));
			}
		else if(req.body['searchType1'] == "Admin"){
			if(req.body['searchType2'] != "AND"){
				switch(req.body['searchType1b']){
					case "ID":
						appRepo.getAllAdminsById(req.body['searchType1c']).then((admin) => {
							console.log(admin);
							 res.render('customBI', { admin: admin });
						}).catch(error => console.log('Error getting admin by Id: ', error));
						break;
					case "Name":
						appRepo.getAllAdminsByName(req.body['searchType1c']).then((admin) => {
							 res.render('customBI', { admin: admin });
						}).catch(error => console.log('Error getting admin by Id: ', error));					break;
					case "Email":
						appRepo.getAllAdminsByEmail(req.body['searchType1c']).then((admin) => {
							 res.render('customBI', { admin: admin });
						}).catch(error => console.log('Error getting admin by Id: ', error));					break;
					case "Last Login":
						sdf
						break;
					case "Login Attempts":
						sdf
						break;
					case "Creator ID":
						appRepo.getAllAdminsCreatedBy(req.body['searchType1c']).then((admins) => {
							 res.render('customBI', { admins: admins });
						}).catch(error => console.log('Error getting admin by Id: ', error));						break;
					default:

						break;
				}
			}

		//	res.render('customBI', { savedSearch: req.body, empties: empties, admin: 1 } );
		}
		else if(req.body['searchType1'] == "User"){
			switch(req.body['searchType1b']){
				case "ID":
					appRepo.getAllUsersById(req.body['searchType1c']).then((user) => {
						console.log(user);
		                 res.render('customBI', { user: user });
				    }).catch(error => console.log('Error getting user by Id: ', error));
					break;
				case "Name":
					appRepo.getAllUsersByName(req.body['searchType1c']).then((user) => {
		                 res.render('customBI', { user: user });
				    }).catch(error => console.log('Error getting user by Name: ', error));					break;
				case "Email":
					appRepo.getAllUsersByEmail(req.body['searchType1c']).then((user) => {
		                 res.render('customBI', { user: user });
				    }).catch(error => console.log('Error getting user by Email: ', error));					break;
				case "Last Login":
					sdf
					break;
				case "Login Attempts":
					sdf
					break;
				case "Creator ID":
					appRepo.getAllUsersCreatedBy(req.body['searchType1c']).then((user) => {
						console.log(user);
		                 res.render('customBI', { user: user });
				    }).catch(error => console.log('Error getting user by Creator Id: ', error));						break;
				default:

					break;
			}
		}

		else if(req.body['searchType1'] == "Award"){
			switch(req.body['searchType1b']){
				case "ID":
					appRepo.getAllAwardsById(req.body['searchType1c']).then((award) => {
						console.log(award);
						var searchtitle = "Award with ID = " + req.body['searchType1c'];
		                 res.render('customBI', { award: award, searchtitle: searchtitle });
				    }).catch(error => console.log('Error getting award by Id: ', error));
					break;
				case "Recipient Name":
					appRepo.getAllAwardsByRecipientName(req.body['searchType1c']).then((award) => {
		                 res.render('customBI', { award: award });
				    }).catch(error => console.log('Error getting award by Recipient Name: ', error));					break;
				case "Recipient Email":
					appRepo.getAllAwardsByRecipientEmail(req.body['searchType1c']).then((award) => {
		                 res.render('customBI', { award: award });
				    }).catch(error => console.log('Error getting award by Recipient Email: ', error));					break;
				case "Last Login":
					sdf
					break;
				case "Award Type":
					appRepo.getAllAwardsByType(req.body['searchType1c']).then((award) => {
						console.log(award);
		                 res.render('customBI', { award: award });
				    }).catch(error => console.log('Error getting award by award type: ', error));						break;
									break;
				case "Creator ID":
					appRepo.getAllAwardsCreatedBy(req.body['searchType1c']).then((award) => {
						console.log(award);
		                 res.render('customBI', { award: award });
				    }).catch(error => console.log('Error getting award by Creator Id: ', error));						break;
				default:

					break;
			}
		}


		else{
			console.log(req.body);
			appRepo.getAdminById(req.body.adminID).then((admin) => {
			var searchContent = req.body;
			res.render('customBI', { admin: 1, searchContent: searchContent } );
		}).catch(error => console.log('Error getting all admins: ', error));

		}

});


function checkColumns(queryBody){
	var myArray = new Array();
	myArray[0] = true;
	myArray[1] = true;
	myArray[2] = true;
	myArray[3] = true;
	myArray[4] = true;
	if(queryBody['column1Admin']){
		myArray[0] = false;
	}
	if(queryBody['column1User']){
		myArray[1] = false;
	}
	if(queryBody['column1Award']){
		myArray[2] = false;
	}
	if(queryBody['column2CreatedBy']){
		myArray[3] = false;
	}
	if(queryBody['column2WithAttribute']){
		myArray[4] = false;
	}

	var myObj = {};

	for(var i = 0; i < myArray.length; i++){
		if(myArray[i] == true){
			var akey = "empty" + (i + 1);
			myObj[akey] = 'true';
		}
	}
	return myObj;
}
module.exports = router;