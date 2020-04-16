const mysql = require('mysql');

const conn = function () {
	return mysql.createConnection({
		host: process.env.host,
    user: process.env.user,
    database: process.env.database,
		password: process.env.password
	});
}

module.exports = function (){
	return conn;
}