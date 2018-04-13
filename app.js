var express = require('express'); //call express module
var routers = require('./applications/controller/jsroutes.js'); //call routes
var flash    = require('connect-flash');
var cookie = require('cookie-parser');
var morgan = require('morgan');
var passport = require('passport');

//initialize express module
var app = express();

//define domain and port
const hostname = '127.0.0.1';
const port = 5000;

//set middle views
app.set('view engine', 'ejs');
//set static CSS & JS files folder
app.use(express.static('./public'));

app.use(flash());
app.use(cookie());
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(morgan('dev')); //log every request to the console

//pass app to routes
routers(app);

//initialize port
app.listen(port);

console.log(`Server running at http://${hostname}:${port}/`);