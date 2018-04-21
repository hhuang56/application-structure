/**
 * This is your main application file.
 */

var express = require('express');
var path = require('path');
var url = require('url');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
//require your rest api route
var restApiRoute = require('./routes/api/api-route');
//if you are using a .env file to store your mongo credentials, require this
require('dotenv').config();

var app = express();
app.use(cookieParser('cscie31-secret'));
app.use(expressSession({
    "secret" : "cscie31-secret",
    "resave" : "true",
    "saveUninitialized" : "true"
}));

//create mongo db connection
mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@get-this-connection-url-from-mongo`);
var db = mongoose.connection;

//check if database can be opened before attempting to load the application
db.on('open', function() {
    app.use(bodyparser.urlencoded({extended: false}));
    app.use(bodyparser.json());
    //defines directory for any client-facing files; for example, image files
    app.use('/static', express.static(path.join(__dirname, 'public')));
    //defines route for your REST api that external applications can call
    app.use('/api', restApiRoute);
    //catches all requests to unknown paths
    app.use((req, res, next)=>{
        res.status(404);
        res.send("Sorry, this file cannot be found");
    });    
}).catch((err)=>{console.error(`${err} Database connection error.`);});

module.exports = app;