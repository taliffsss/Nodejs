var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit : 100, //important
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'nodejs',
    debug    :  false
});

pool.getConnection(function(err, conn) {
	if (err) {
    	conn.release();
    	res.json({ "code": 100, "status": "Error in connection database" });
    	return;
	}
 
	console.log('connected as id ' + conn.threadId);
});

module.exports = pool;