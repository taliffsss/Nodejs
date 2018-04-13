'use strict';

var nodemailer = require('nodemailer');

var mailCredentials = nodemailer.createTransport({
	host: 'smtp.ethereal.email',
	port: 587,
	secure: false,
	auth: {
		user: 'youremail@gmail.com',
		pass: 'yourpassword'
	}
});


exports.mailContent = function($to,$code) {

	var content = {
		from: 'youremail@gmail.com',
		to: 'myfriend@yahoo.com',
		subject: 'Sending Email using Node.js',
		html: 'That was easy!'
	};

	return content;
};

exports.sentMail = function(mailContent) {

	mailCredentials.sendMail(mailContent, function(error, info){
		if (error) {
			console.log(error);
		} else {
			console.log('Email sent: ' + info.response);
		}
	});
};