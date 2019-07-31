/**
 * @module
 * this class will be used to handle get requests for issue
 */

const express = require('express');
const db = require('../config/db_config.js');
var path = require('path');

//create router
const router = express.Router();

var session = '';

//Check for session
// router.get('/', (req, res) => {
//   console.log('--Inside check session--');
//   console.log('req.session : ' + req.session);
//   console.log('req.session.user : ' + req.session.user);
//   session = req.session;
//   if (session.user) {
//     console.log('working');
//     res.render('index', {
//       session: session,
//       name: 'soham'
//     });
//   } else {
//     res.render('index');
//   }
// });


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
        req.session.user = userDetail.email;
        res.status(200).json(userDetail).end();
      } else {
        res.status(401).end('unauthenticated');
      }
    }
  })
})

router.get('/logout', function(req, res) {
  req.session.destroy(function() {
    console.log("user logged out.")
  });
  res.render('index');
});

//route for register new user
router.post('/register', (req, res) => {
  const queryString = "INSERT INTO USERS (name, email, password) VALUES (?, ?, ?)";
  db.query(queryString, [req.body.Name, req.body.Email, req.body.Password], (err, results) => {
    if (err) {
      return res.status(400).send({
        err
      });
    } else {
      req.session.user = req.body.Email;
      res.render('index', {
        'session': req.session
      });
    }
  })
})

module.exports = router;
