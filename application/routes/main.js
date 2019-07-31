/**
 * @module
 * this class will be used to handle get requests for issue
 */

const express = require('express');
const db = require('../config/db_config.js');
var path = require('path');
const router = express.Router();

router.get('/', (req,res) => {
    const sql = `SELECT USERS.name, BOARDS.number_of_players FROM BOARDS inner join USERS on BOARDS.organizer_id = USERS.id; CALL getLeaderboardData();`;
    db.query(sql, (err, result, fields)=> {
        if (err) throw err;
        var gameBoard = result[0];
        var leaderBoard = result[1];
        res.render('index',{leaderBoard: leaderBoard, gameBoard: gameBoard});
    });
});

router.get('/index', (req,res) => {
   const sql = `SELECT USERS.name, BOARDS.number_of_players FROM BOARDS inner join USERS on BOARDS.organizer_id = USERS.id; CALL getLeaderboardData();`;
   db.query(sql, (err, result, fields)=> {
       if (err) throw err;
       var gameBoard = result[0];
       var leaderBoard = result[1];
       res.render('index',{leaderBoard: leaderBoard, gameBoard: gameBoard});
   });
});

router.get('/leaderboard', (req, res) => {
    res.sendFile(path.resolve('views/leaderboard.html'));
});

router.get('/rules', (req, res) => {
    res.sendFile(path.resolve('views/rules.html'));
});

module.exports = router;
