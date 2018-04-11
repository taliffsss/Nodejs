var bodyParser = require('body-parser');
var users = require('../model/users.js');

var urlencodedParser = bodyParser.urlencoded({
	extended: false
});

module.exports = function(app) {

	app.get('/', function (req, res) {
		res.render('login')
	})

}