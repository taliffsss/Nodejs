var mysql = require('mysql');

/*var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "nodejs"
});

con.connect(function(err) {
	if (err) throw err;
	console.log("Connected!");
});*/

var pool = mysql.createPool({
    connectionLimit : 100, //important
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'nodejs',
    debug    :  false
});