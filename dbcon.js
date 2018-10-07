var mysql = require('mysql');

var pool = mysql.createPool({
	connectionLimit: 10,
	host: 'localhost',
	user: 'root',
	password: 'deee',
	database: 'employeerecognitions',
	insecureAuth: true

});


module.exports.pool = pool;
