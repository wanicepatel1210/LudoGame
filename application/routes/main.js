/**
 * @module
 * this class will be used to handle get requests for issue
 */

const express = require('express')
const db = require('../config/db_config.js');
var path = require('path');



//create router
const router = express.Router();


//route for authentication
router.get('/index', (req, res) => {
  console.log('--Inside index service--');
  console.log('cookie : '+ req.cookies.user_sid);
  console.log('session : '+ req.session.user);
  if (req.session.user && req.cookies.user_sid) {
    console.log('ok'+req.cookie.user_sid);
    res.render('index',{'session' : req.session});
  } else {
    console.log('ok'+req.cookie.user);
    res.render('index');

  }
});


router.get('/leaderboard', (req, res) => {
  res.sendFile(path.resolve('views/leaderboard.html'), {
    'name': 'Soham'
  });
})

router.get('/rules', (req, res) => {
  res.render('rules', {
    name: 'Venish'
  });
  //res.sendFile(path.resolve('views/rules.html'), {'name' : 'Harsham'});
});

//route for creating new board
router.post('/create_board', (req, res) => {
  var user_id = req.body.user_id;
  var board_name = req.body.board_name;
  var move_time = req.body.move_time;

  const queryString = "INSERT INTO BOARDS (board_name, start_time, end_time, number_of_players, move_time, organizer_id, game_status) VALUES (?, ?, ?, ?, ?, ?, ?)";

  var start_end_time = new Date();

  db.query(queryString, [board_name, start_end_time, start_end_time, 1, move_time, user_id, 'WAITING'], (err, results) => {
    if (err) {
      return res.status(400).send({
        err
      });
    } else {
      res.status(200).json(results).end();
    }
  })
});


//route for joining game
router.post('/join_board', (req, res) => {
  var organizer_id = req.body.organizer_id;
  var number_of_players = req.body.number_of_players;
  var status = number_of_players != 3 ? 'WAITING' : 'RUNNING';

  const queryString = "UPDATE BOARDS SET number_of_players = ?, game_status = ? where organizer_id = ?";

  var start_end_time = new Date();

  db.query(queryString, [number_of_players + 1, status, organizer_id], (err, results) => {
    if (err) {
      return res.status(400).send({
        err
      });
    } else {
      res.status(200).json(results).end();
    }
  })
});

module.exports = router
