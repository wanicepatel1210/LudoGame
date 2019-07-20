const express = require("express");
const path = require('path');
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mysql = require('mysql');
const port = process.env.PORT || 80;



app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//important.. this line creates a connection to use static files such as html saved in the

app.use(express.static('./views'))
app.use(morgan('short'))

app.get('/', (request, response) => {
	response.sendFile('/views/index.html', { root: __dirname })
 })

 //create connection to get issue
const users = require('./routes/users.js')
app.use(users);

app.listen(port, function() {
  console.log("Runnning on " + port);
});

module.exports = app;
