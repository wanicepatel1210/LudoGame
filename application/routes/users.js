/**
 * @module
 * this class will be used to handle get requests for issue
 */

const express = require('express')
const db = require('../config/db_config.js');
var path = require('path');


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
  var email = req.body.email;
  var password = req.body.password;
  const queryString = "select * from USERS where email = ?";

  db.query(queryString, [email], (err, results) => {
    if (err) {
      return res.status(400).send({
        err
      });
    } else {
      const userDetail = results[0];
      if (!userDetail) {
        res.status(401).end('unauthenticated');
      } else if (email == userDetail.email && password == userDetail.password) {
        res.status(200).json(userDetail).end();
      } else {
        res.status(401).end('unauthenticated');
      }
    }
  })
})

//route for register new user
router.post('/register', (req, res) => {
  console.log("INSIDE REGISTRATION:--");
  console.log('Name:' + req.body.Name);
  const queryString = "INSERT INTO USERS (name, email, password) VALUES (?, ?, ?)";

  if (req.body.Password !== req.body.Password2) {
    res.sendFile(path.resolve('views/leaderboard.html'));
  } else {
    db.query(queryString, [req.body.Name, req.body.Email, req.body.Password], (err, results) => {

      if (err) {
        return res.status(400).send({
          err
        });
      } else {
        res.sendFile(path.resolve('views/index.html'));
        //res.status(200).json('success');
      }
    })
  }

})

module.exports = router
