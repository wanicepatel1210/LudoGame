/**
 * @module
 * this class will be used to handle get requests for issue
 */

const express = require('express')
const db = require('../config/db_config.js');
var path = require('path');



//create router
const router = express.Router()


//route for authentication
router.get('/index', (req, res) => {
  res.sendFile(path.resolve('views/index.html'), {'name' : 'Venish'});
})


router.get('/leaderboard', (req, res) => {
  res.sendFile(path.resolve('views/leaderboard.html'), {'name' : 'Soham'});
})

router.get('/rules', (req, res) => {
  res.render('rules', {name : 'Venish'});
  //res.sendFile(path.resolve('views/rules.html'), {'name' : 'Harsham'});
})
module.exports = router
