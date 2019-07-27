/**
 * @module
 * this class will be used to handle get requests for issue
 */

const express = require('express')
const db = require('../config/db_config.js');
var path = require('path');
var fs = require('fs');


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
})

//route for profile
router.get('/profile', (req,res) => {
  //call to stored procedure
  const sql = `CALL getProfileData(?)`;
  db.query(sql,req.query.id,(error, results)=>{
    if (error) {
      console.log("error0");
    return console.error("error");
  }else{
    var a= results[0];
  res.render('profile',{'email':a[0].email,'name':a[0].name,'Total':SecondsTohhmmss(a[0].Total),'Total_game':a[0].Total_game,'rank_one':a[0].rank_one,'rank_two':a[0].rank_two,'rank_three':a[0].rank_three,'rank_four':a[0].rank_four,'win':Math.round((a[0].rank_one/a[0].Total_game)*100),'point':Point(a[0].rank_one,a[0].rank_two,a[0].rank_three,a[0].rank_four)});
  }
})
})

//Second to HH:MM:SS time format
var SecondsTohhmmss = function(totalSeconds) {
  var hours   = Math.floor(totalSeconds / 3600);
  var minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
  var seconds = totalSeconds - (hours * 3600) - (minutes * 60);

  // round seconds
  seconds = Math.round(seconds * 100) / 100

  var result = (hours < 10 ? "0" + hours : hours);
      result += ":" + (minutes < 10 ? "0" + minutes : minutes);
      result += ":" + (seconds  < 10 ? "0" + seconds : seconds);
  return result;
}

//Total Point count from rank
var Point = function(one,two,three,four){
  return (one*100)+(two*60)+(three*30)+(four*10);
}

module.exports = router
