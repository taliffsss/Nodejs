var express = require('express');
var routers = require('./applications/route/jsroutes.js');
var path = require('path');

var app = express();

const hostname = '127.0.0.1';
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('./public'));

routers(app);

app.listen(port);
console.log(`Server running at http://${hostname}:${port}/`);