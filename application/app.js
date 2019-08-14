//use path module
const path = require('path');
//use express module
const express = require('express');
//use hbs view engine
const hbs = require('hbs');
//use bodyParser middleware
const bodyParser = require('body-parser');
//use mysql database
const mysql = require('mysql');
//Use express-session for maintaining sessions
const session = require('express-session');

var cookieParser = require('cookie-parser');

const app = exports.app = express();

//set view engine
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

//initialize sessions
app.use(session({
  key: 'user_sid',
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60000000
  }
}));

// initialize cookie-parser to allow us access the cookies stored in the browser.
app.use(cookieParser());

app.use(express.static('./views'));
app.use(express.static('public'));

//create connection to main
const main = require('./routes/main.js')
app.use(main);

//create connection to user
const user = require('./routes/users.js')
app.use(user);
