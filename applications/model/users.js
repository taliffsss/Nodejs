var conn = require('../config/database');  //call database connection

/*------Users Tables------*/
/*---Activate User---*/
exports.verifyCredentials = function(username,password,callback) {
	var query = "SELECT * FROM js_users WHERE username = ? AND password = ?";

	//get a connection from the pool
	conn.getConnection(function(err, connection) {
		if(err) { console.log(err); callback(true); return; }
		// make the query
		connection.query(query, [username,password], function(err, results) {
			connection.release();
			if(err) { console.log(err); callback(true); return; }
			callback(false, results);
		});
	});
};
/*---End Activate User---*/

/*---Activate User---*/
exports.getAll = function(userid, callback) {
	var query = "SELECT * FROM js_users WHERE userid != ?";

	//get a connection from the pool
	conn.getConnection(function(err, connection) {
		if(err) { console.log(err); callback(true); return; }
		// make the query
		connection.query(query, [userid], function(err, results) {
			connection.release();
			if(err) { console.log(err); callback(true); return; }
			callback(false, results);
		});
	});
};
/*---End Activate User---*/

/*---Insert data---*/
exports.InsertUsers = function(username,password,oldpass,role,fullname,email,validCode,created_at, callback) {
	var query = "INSERT INTO js_users (username,password,oldpass,role,fullname,email,validCode,created_at) VALUE(?,?,?,?,?,?,?,?)";

	//get a connection from the pool
	conn.getConnection(function(err, connection) {
		if(err) { console.log(err); callback(true); return; }
		// make the query
		connection.query(query, [username,password,oldpass,role,fullname,email,validCode,created_at,], function(err, results) {
			connection.release();
			if(err) { console.log(err); callback(true); return; }
			callback(false, results);
		});
	});
};
/*---End Insert data---*/

/*---Get ID---*/
exports.getIDusers = function(username, callback) {
	var query = "SELECT userid FROM js_users WHERE username = ?";

	//get a connection from the pool
	conn.getConnection(function(err, connection) {
		if(err) { console.log(err); callback(true); return; }
		// make the query
		connection.query(query, [username], function(err, results) {
			connection.release();
			if(err) { console.log(err); callback(true); return; }
			callback(false, results);
		});
	});
};
/*---End Get ID---*/

/*---Update Users Data---*/
exports.UpdateUsers = function(username,fullname,email,updated_at,userid, callback) {
	var query = "UPDATE js_users SET username = ?, fullname = ?, email = ?, updated_at = ? WHERE userid = ?";

	//get a connection from the pool
	conn.getConnection(function(err, connection) {
		if(err) { console.log(err); callback(true); return; }
		// make the query
		connection.query(query, [username,fullname,email,updated_at,userid], function(err, results) {
			connection.release();
			if(err) { console.log(err); callback(true); return; }
			callback(false, results);
		});
	});
};
/*---End Update Users Data---*/

/*---Update Users Password---*/
exports.UpdatePassUsers = function(password,oldpass, callback) {
	var query = "UPDATE js_users SET password = ?, oldpass = ? WHERE userid = ?";

	//get a connection from the pool
	conn.getConnection(function(err, connection) {
		if(err) { console.log(err); callback(true); return; }
		// make the query
		connection.query(query, [password,oldpass], function(err, results) {
			connection.release();
			if(err) { console.log(err); callback(true); return; }
			callback(false, results);
		});
	});
};
/*---End Update Users Password---*/

/*---Suspend User---*/
exports.SuspendUsers = function(userid, callback) {
	var query = "UPDATE js_users SET suspended = 0 WHERE userid = ?";

	//get a connection from the pool
	conn.getConnection(function(err, connection) {
		if(err) { console.log(err); callback(true); return; }
		// make the query
		connection.query(query, [userid], function(err, results) {
			connection.release();
			if(err) { console.log(err); callback(true); return; }
			callback(false, results);
		});
	});
};
/*---End Suspend User---*/

/*---Activate User---*/
exports.ActivateUsers = function(validCode, callback) {
	var query = "UPDATE js_users SET activated = 1, suspended = 1 WHERE validCode = ?";

	//get a connection from the pool
	conn.getConnection(function(err, connection) {
		if(err) { console.log(err); callback(true); return; }
		// make the query
		connection.query(query, [validCode], function(err, results) {
			connection.release();
			if(err) { console.log(err); callback(true); return; }
			callback(false, results);
		});
	});
};
/*---End Activate User---*/

/*---Activate User---*/
exports.DeleteUsers = function(userid, callback) {
	var query = "DELETE FROM js_users WHERE userid = ?";

	//get a connection from the pool
	conn.getConnection(function(err, connection) {
		if(err) { console.log(err); callback(true); return; }
		// make the query
		connection.query(query, [userid], function(err, results) {
			connection.release();
			if(err) { console.log(err); callback(true); return; }
			callback(false, results);
		});
	});
};
/*---End Activate User---*/
/*------End Users Tables------*/