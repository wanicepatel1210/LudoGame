/**
 * @module
 * this class will be used to handle get requests for issue
 */

const express = require('express');
const db = require('../config/db_config.js');
var path = require('path');

//create router
const router = express.Router();

//route for authentication
router.get(['/','/index'], (req, res) => {
  console.log('--Inside check session--');
  console.log('req.session : ' + req.session);
  console.log('req.session.user : ' + req.session.user);

  const sql = `SELECT USERS.name, BOARDS.id, BOARDS.number_of_players FROM BOARDS inner join USERS on BOARDS.organizer_id = USERS.id; CALL getLeaderboardData();`;
  db.query(sql, (err, result, fields) => {
    if (err) throw err;
    var gameBoard = result[0];
    var leaderBoard = result[1];
    res.render('index', {
      leaderBoard: leaderBoard,
      gameBoard: gameBoard,
      session: req.session && req.session.user ? req.session : ''
    });
  });
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
  if (!req.session && !req.session.user) {
    res.status(200).json("NeedsLogin").end();
  }
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

router.get('/gameBoard', (req, res) => {
    console.log('Game Board');
    res.sendFile(path.resolve('views/Ludo-game.html'));
});

module.exports = router
