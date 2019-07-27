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
/*router.get('/index', (req, res) => {
    const fetchData = "SELECT USERS.name, BOARDS.number_of_players FROM BOARDS inner join USERS on BOARDS.organizer_id = USERS.id; SELECT USERS.name,BOARD_MAPPING.rank FROM USERS inner join BOARD_MAPPING on BOARD_MAPPING.fk_mapping_users_id = USERS.id";
    db.query(fetchData, [2, 1], (err, result, fields) => {
        if(err) throw err;
        console.log(result[0]);
        console.log(result[1]);
        var data1 = result[0];
        var data2 = result[1];
        return res.render('index', {data1: data1, data2: data2});
    });
})*/

router.get('/index', (req,res) => {
    const sql = `SELECT USERS.name, BOARDS.number_of_players FROM BOARDS inner join USERS on BOARDS.organizer_id = USERS.id; CALL getLeaderboardData();`;
    db.query(sql, (err, result, fields)=>{
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

module.exports = router
