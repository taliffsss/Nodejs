var bodyParser = require('body-parser');
var users = require('../model/users.js'); //users model
var passhash = require('../encryption/encryption.js'); //password hash
var session = require('express-session');
const cryptoRandomString = require('crypto-random-string');
var MD5 = require('md5.js');
const dateTime = require('date-time');

dateTime({showTimeZone: true});

//initialize middleware
var formparser = bodyParser.urlencoded({
	extended: false
});

var dt = dateTime();

var sess;

var gen = cryptoRandomString(50);

var uKey = new MD5().update('42').digest('hex');
var secretKey = new MD5().update('50').digest('hex');

//import app in app.js
module.exports = function(app) {

	app.use(session({
		key: uKey,
		secret: secretKey,
		resave: true,
		saveUninitialized: true,
		cookie: { maxAge: 60000 }
	}));

	/*------Login module------*/
	app.get('/', function (req, res) {

		sess = req.session;

		if(!sess.loggedin) {
			req.flash('credentials','')
			console.log(req.headers.host);
			res.render('login', { message: req.flash('credentials')});
		} else {
			res.redirect('/success');
		}

	});

	app.post('/login',formparser, function (req, res) {

		sess = req.session;
		if(req.method == "POST"){
			var username = req.body.username;
			var password = req.body.password;

			users.verifyCredentials(username, function(err, rows){
				if(err) throw err;

				else{
					if(rows.length) {
						if(passhash.passwordVerify(password,rows[0].password)) {

							if(rows[0].activated != 0) {
								if(rows[0].suspended != 0) {
									sess.id = rows[0].userid;
									sess.username = rows[0].username;
									sess.email = rows[0].fullname;
									sess.name = rows[0].email;
									sess.loggedin = true;
									res.redirect('/success');
								} else {
									req.flash('suspended','Your Account is Temporarily suspended');
									res.render('login',{ message: req.flash('suspended'), uname: username });
								}
							} else {
								req.flash('notActive','Your Account is not yet Activated');
								res.render('login',{ message: req.flash('notActive'), uname: username });
							}
								
						} else {

							req.flash('credentials','Oops! Wrong Password.');
							res.render('login',{ message: req.flash('credentials'), uname: username });
						}
						
					} else {
						req.flash('credentials','Oops! Wrong Username.');
						res.render('login',{ message: req.flash('credentials'), uname: username });
					}
				}
			});
		}
	});

	app.get('/success', function (req, res) {

		sess = req.session;

		if(!sess.loggedin) {
			res.redirect('/');
		} else {
			res.render('loggedin', {uname:sess.username, loggedin: sess.loggedin});
		}
		
	});

	/*---End---*/

	/*------Signup module------*/
	app.get('/signup', function (req, res) {
		res.render('signup')
	})

	app.post('/signup',formparser, function (req, res) {

		sess = req.session;

		if(req.method == "POST"){
			var uname = req.body.username;
			var pass = req.body.password;
			var fullname = req.body.fullname;
			var email = req.body.email;
			var role = req.body.role;
			var validCode = gen;
			var created_at = dt;

			var hash = passhash.passwordHash(pass);

			users.InsertUsers(uname,hash,hash,role,fullname,email,validCode,created_at, function(err, rows){
				if(err) throw err;

				else{
					if(rows.affectedRows > 0) {
						/*req.flash('success','Successfully Added')
						res.redirect('/users/list',{ message: req.flash('success')});*/
						res.render('404');
					} else {
						req.flash('error','Oops! Error occured')
						res.render('login',{ message: req.flash('error') });
					}
				}
			});
		}
	})

	/*---End---*/

	/*------Dashboard module------*/
	app.get('/dashboard', function (req, res) {
		res.render('signup');
	})

	/*---End---*/

	/*------Users module------*/
	app.post('/users/new',formparser, function (req, res) {

		sess = req.session;

		if(req.method == "POST"){
			var uname = req.body.username;
			var pass = req.body.password;
			var fullname = req.body.fullname;
			var email = req.body.email;
			var role = req.body.role;
			var validCode = gen;
			var created_at = dt;

			var hash = passhash.passwordHash(pass);

			users.InsertUsers(uname,hash,hash,role,fullname,email,validCode,created_at, function(err, rows){
				if(err) throw err;

				else{
					if(rows.affectedRows > 0) {
						/*req.flash('success','Successfully Added')
						res.redirect('/users/list',{ message: req.flash('success')});*/
						res.render('404');
					} else {
						req.flash('error','Oops! Error occured')
						res.render('login',{ message: req.flash('error') });
					}
				}
			});
		}
	})

	app.get('/users/list', function (req, res) {
		res.render('user-list');
	})

	app.get('/users/activate/:id', function (req, res) {
		
	})

	app.get('/users/deactivate/:id', function (req, res) {

		
		res.render('user-list');
	})

	app.get('/users/remove/:id', function (req, res) {
		
	})

	/*---End---*/

	/*------Logout module------*/
	app.get('/logout', function (req, res) {

		req.session.destroy();

		res.redirect('/');
	});

	/*---End---*/
}