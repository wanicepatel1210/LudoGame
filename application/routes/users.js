/**
 * @module
 * this class will be used to handle get requests for issue
 */

const express = require('express')
const db = require('../config/db_conf.js');


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
router.get('/login', (req, res) => {
  console.log(req.body);

  res.status(200).json('success');
})

//route for register new user
router.post('/register', (req, res) => {
  console.log("INSIDE REGISTRATION:--");
  const queryString = "INSERT INTO USERS (name, email, password) VALUES (?, ?, ?)"

  db.query(queryString, [req.body.name, req.body.email, req.body.password], (err, results)=>{
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
