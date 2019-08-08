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
router.get(['/', '/index'], (req, res) => {
    console.log('--Inside check session--');
    console.log('req.session : ' + req.session);
    const sql = `CALL getLeaderboardData();`;

    db.query(sql, (err, result, fields) => {
        if (err) throw err;
        var gameBoard = result[0];
        var leaderBoard = result[1];
        res.render('index', {
            leaderBoard: leaderBoard,
            gameBoard: gameBoard,
            session: req.session ? req.session : ''
        });
    });
});

router.get('/rules', (req, res) => {
  res.render('rules', {
     session: req.session ? req.session : ''
  });
});

//route for creating new board
router.post('/create_board', (req, res) => {
    var user_id = req.session.user.id;
    console.log('user_id:' + user_id)
    var board_name = 'test';//req.body.board_name;
    var move_time = 60;//req.body.move_time;
    const queryString = `Call CreateBoard(?, ?, ?, ?, ?, ?, ?);`;
    var start_end_time = new Date();

    db.query(queryString, [board_name, start_end_time, start_end_time, 4, move_time, user_id, 'WAITING'], (err, results) => {
        if (err) {
            console.log("err : "+err)
            return res.status(400).send({
            err
        });
        }
        else {
            console.log('results : ' +  results);
            res.status(200).json(results).end();
        }
    })
});


//route for joining game
router.post('/join_board', (req, res) => {
    var number_of_players = 3;//req.body.number_of_players;
    var status = number_of_players != 3 ? 'WAITING' : 'RUNNING';
    var board_id = req.body.board_id;
    console.log('Board:' + board_id);
    console.log('user:' + req.session.user.id);
    const queryString = `Call JoinBoard(?, ?, ?, ?)`; //"UPDATE BOARDS SET number_of_players = ?, game_status = ? where id = ?";
    var start_end_time = new Date();

    db.query(queryString, [number_of_players + 1, status, board_id,req.session.user.id], (err, results) => {
        if (err) {
            return res.status(400).send({
                err
            });
        }
        else {
            return res.status(200).json(results).end();
        }
    })
});

router.get('/leaderBoard', (req, res) => {
    console.log('leader Board');
    const sql = `CALL getLeaderboardDetails();`;

    db.query(sql, (err, result, fields) => {
        if (err) throw err;
        var leaderBoard = result[0];
        res.render('leaderboard', {
            leaderBoard: leaderBoard,
            session: req.session ? req.session : ''
        });
    });
});

router.get('/gameBoard', (req, res) => {
    console.log('---Game Board---');
    console.log('id'+req.query.id);
    const sql = `CALL getBoardMember(?)`;
    db.query(sql, req.query.id, (error, results) => {
        if (error) {
            console.log("error0");
            return console.error("error");
        }
        else{
          var a = results[0];
    res.render('Ludo-game', {
        'player1':a[0].name,
        'player2':a[1].name,
        'player3':a[0].name,
        'player4':a[0].name,
        session: req.session ? req.session : ''
    });
  }
});
});

module.exports = router
