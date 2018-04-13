var bcrypt = require('bcryptjs');
var users = require('../model/users.js'); //users model
var salt = bcrypt.genSaltSync(10);


exports.passwordHash = function(pass) {

	var hash = bcrypt.hashSync(pass, salt);

	return hash;
};

exports.passwordVerify = function(pass,hash) {

	var verify = bcrypt.compareSync(pass,hash);

	return verify;
};