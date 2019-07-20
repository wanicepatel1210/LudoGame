/**
 * @module
 * this class will be used to handle get requests for issue
 */

const express = require('express')
const db = require('../config/db_config.js');


//create router
const router = express.Router()


//to check for empty object on error handling
Object.prototype.isEmpty = function() {
  for (var key in this) {
    if (this.hasOwnProperty(key))
      return false;
  }
  return true;
}

//route for authentication
router.post('/login', (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;
  console.log("email : " + req.body.email + ' password : ' + req.body.password);
  const queryString = "select * from USERS where email = ?";

  db.query(queryString, [email], (err, results) => {
    if (err) {
      return res.status(400).send({
        err
      });
    } else {
      const userDetail = results[0];
      console.log("results : " + results[0]);
      console.log("results : " + results[0].email + "&&" + results[0].password);
      if (email == userDetail.email && password == userDetail.password) {
        res.status(201).json('authenticated');
      } else {
        res.status(401).json('unauthenticated');
      }
    }
  })
})

//route for register new user
router.post('/register', (req, res) => {
  console.log("INSIDE REGISTRATION:--");
  const queryString = "INSERT INTO USERS (name, email, password) VALUES (?, ?, ?)"

  db.query(queryString, [req.body.name, req.body.email, req.body.password], (err, results) => {
    if (err) {
      return res.status(400).send({
        err
      });
    } else {
      res.status(200).json('success');
    }
  })
})

module.exports = router
