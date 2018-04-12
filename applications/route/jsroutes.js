var bodyParser = require('body-parser');
var users = require('../model/users.js'); //users model
var session = require('express-session');
const cryptoRandomString = require('crypto-random-string');
var password = require('bcryptjs');
var flash    = require('connect-flash');
var cookie = require('cookie-parser');
var morgan = require('morgan');
var passport = require('passport');
var MD5 = require('md5.js');

//initialize middleware
var formparser = bodyParser.urlencoded({
	extended: false
});

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
		saveUninitialized: true
	}));
	app.use(flash());
	app.use(cookie());
	app.use(passport.initialize());
	app.use(passport.session()); // persistent login sessions
	app.use(morgan('dev')); //log all request in console

	/*------Login module------*/
	app.get('/', function (req, res) {

		sess = req.session;

		if(!sess.loggedin) {
			res.render('login');
		} else {
			res.redirect('/success');
		}
	});

	app.post('/login',formparser, function (req, res) {

		sess = req.session;

		var username = req.body.username;
		var password = req.body.password;

		users.verifyCredentials(username,password, function(err, rows){
			if(err) throw err;
			else {
				sess.id = rows[0].userid;
				sess.username = username;
				sess.loggedin = true;
				res.redirect('/success');
			}
		});
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

	app.post('/signup', function (req, res) {
		
	})

	/*---End---*/

	/*------Dashboard module------*/
	app.get('/dashboard', function (req, res) {
		res.render('signup')
	})

	/*---End---*/

	/*------Users module------*/
	app.post('/users/new', function (req, res) {
		
	})

	app.get('/users/list', function (req, res) {
		res.render('user-list')
	})

	app.get('/users/activate/:id', function (req, res) {
		
	})

	app.get('/users/deactivate/:id', function (req, res) {
		res.render('user-list')
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