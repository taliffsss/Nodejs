var express = require('express'); //call express module
var routers = require('./applications/route/jsroutes.js'); //call routes

//initialize express module
var app = express();

//define domain and port
const hostname = '127.0.0.1';
const port = 3000;

//set middle views
app.set('view engine', 'ejs');
//set static CSS & JS files folder
app.use(express.static('./public'));

//pass app to routes
routers(app);

//initialize port
app.listen(port);
console.log(`Server running at http://${hostname}:${port}/`);