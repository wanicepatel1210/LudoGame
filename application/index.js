const express = require("express");
const path = require('path');
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mysql = require('mysql');
const port = process.env.PORT || 80;


app.use(logger('dev'));
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//const usersRouter = require("./routes/users.js");
//app.use("/users",usersRouter);

app.listen(port, function() {
  console.log("Runnning on " + port);
});

module.exports = app;
