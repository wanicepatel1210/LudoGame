/**
 * @module
 * this class will be used to handle get requests for issue
 */

const express = require('express');
const db = require('../config/db_config.js').db;
var path = require('path');
var fs = require('fs');

//create router
const router = express.Router();

var session = '';


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
                req.session.user = userDetail;
                res.status(200).json(userDetail).end();
            } else {
                res.status(401).end('unauthenticated');
            }
        }
    })
})

router.post('/logout', function (req, res) {
    req.session.destroy(function () {
        //console.log("user logged out.")
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
            const sql = `CALL getLeaderboardData();`;

            db.query(sql, (err, result, fields) => {
                if (err) throw err;
                var gameBoard = result[0];
                var leaderBoard = result[1];
                //console.log('Register: ' + req.session);
                res.render('index', {
                    leaderBoard: leaderBoard,
                    gameBoard: gameBoard,
                    session: req.session
                });
            });
        }
    })
})

//route for profile
router.get('/profile', (req, res) => {
    //call to stored procedure
    const sql = `CALL getProfileData(?)`;

    db.query(sql, req.session.user.id, (error, results) => {
        if (error) {
            console.log("ERROR");
            return console.error("error");
        } else {
            var a = results[0];
            res.render('profile', {
                'email': a[0].email,
                'name': a[0].name,
                'Total': SecondsTohhmmss(a[0].Total),
                'Total_game': a[0].Total_game,
                'rank_one': a[0].rank_one,
                'rank_two': a[0].rank_two,
                'rank_three': a[0].rank_three,
                'rank_four': a[0].rank_four,
                'win': Math.round((a[0].rank_one / a[0].Total_game) * 100),
                'point': Point(a[0].rank_one, a[0].rank_two, a[0].rank_three, a[0].rank_four),
                'session': req.session ? req.session : ''
            });
        }
    })
})

//Second to HH:MM:SS time format
var SecondsTohhmmss = function (totalSeconds) {
    var hours = Math.floor(totalSeconds / 3600);
    var minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
    var seconds = totalSeconds - (hours * 3600) - (minutes * 60);

    // round seconds
    seconds = Math.round(seconds * 100) / 100

    var result = (hours < 10 ? "0" + hours : hours);
    result += ":" + (minutes < 10 ? "0" + minutes : minutes);
    result += ":" + (seconds < 10 ? "0" + seconds : seconds);

    return result;
}

//Total Point count from rank
var Point = function (one, two, three, four) {
    return (one * 100) + (two * 60) + (three * 30) + (four * 10);
}

module.exports = router