/**
 * @module
 * this class will be used to handle get requests for issue
 */

const express = require('express');
const db = require('../config/db_config.js').db;
const sync_db = require('../config/db_config.js').sync_db;
var path = require('path');
const app = require('../app.js').app;


//socket io implementation
const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(80, () => {
  console.log("Server is up and listening on 80...")
})

var boards = {};

//Code for creating room and join them
io.on('connection', socket => {
  //console.log('Connected!');
  //default username
  socket.username = "Anonymous" + Math.floor(Math.random() * 100001);
  socket.on('new-player', (board_id, user) => {
    console.log("Player " + user.id + " is joining board " + board_id);
    socket.name = user.name;
    socket.join(board_id);
    boards[board_id].players[user.id] = user;
    socket.to(board_id).broadcast.emit('user-connected', user)
  });
  socket.on('send-chat-message', (board_id, user, message) => {
    //console.log("Sending message to board: " + board_id);
    //console.log("Message : " + message);
    //console.log("User obj : " + user.id +" - "+ user.name);
    //console.log("Player : " + boards[board_id].players[user.id]);
    socket.to(board_id).broadcast.emit('chat-message', {
      message: message,
      name: boards[board_id].players[user.id].name
    })
  });

  socket.on('roll_dice', (board_id, num) => {
    socket.to(board_id).broadcast.emit('roll-dice', num);
  });

  socket.on('change_player', (board_id, c) => {
    socket.to(board_id).broadcast.emit('change-player', c);
  });

  socket.on('send_data', (board_id, pawn_data, currPawn) => {
    socket.to(board_id).broadcast.emit('send_data_to_all', {
      pawn_data: pawn_data,
      currPawn: currPawn
    });
  });

  socket.on('notify_player', (board_id, name, color, count) => {
    socket.to(board_id).broadcast.emit('notify_to_all', {
      name: name,
      color: color,
      count: count
    });
  });

  //listen on change_username
  socket.on('change_username', (data) => {
    socket.username = data.username
  })

  //listen on new_message
  socket.on('new_message', (data) => {
    //broadcast the new message
    io.sockets.emit('new_message', {
      message: data.message,
      username: socket.username
    });
  })

  //listen on typing
  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', {
      username: socket.username
    })
  })
  socket.on('disconnect', (board) => {
    //console.log('user disconnected!!');
    //socket.to(board).broadcast.emit('user-disconnected', boards[board].players[socket.id])
    //delete boards[board].players[socket.id]
  })
})

//create router
const router = express.Router();

//route for authentication
router.get(['/', '/index'], (req, res) => {
  //console.log('--Inside check session--');
  //console.log('req.session : ' + req.session);
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
  //console.log('user_id:' + user_id)
  var board_name = req.body.board_name;
  var move_time = 60; //req.body.move_time;
  const queryString = `Call CreateBoard(?, ?, ?, ?, ?, ?, ?);`;
  var start_end_time = new Date();

  db.query(queryString, [board_name, start_end_time, start_end_time, 4, move_time, user_id, 'WAITING'], (err, results) => {
    if (err) {
      console.log("err : " + err)
      return res.status(400).send({
        err
      });
    } else {
      //console.log('Board id = ' + results[0][0]);
      boards[results[0][0].board_id] = {
        players: {}
      }
      // Send message that new board was created
      io.emit('board-created', results[0][0].board_id);
      res.status(200).json(results[0][0]).end();
    }
  })
});


//route for joining game
router.post('/join_board', (req, res) => {
  //console.log('User Id : ' + req.session.user.id);
  var board_id = req.body.board_id;
  //console.log('Board : ' + board_id);
  const queryString = `Call JoinBoard(?, ?, ?, ?)`; //"UPDATE BOARDS SET number_of_players = ?, game_status = ? where id = ?";
  var start_end_time = new Date();

  var board = sync_db.getRecord('BOARDS', board_id);
  if (!board) {
    //Throw error
  }

  var number_of_players = board.number_of_players;
  var status = number_of_players != 3 ? 'WAITING' : 'RUNNING';

  // Check board is exist or NOT, if so, join user in board
  //console.log("Boards : "+ boards[board_id]);
  if (!boards[board_id]) {
    res.status(400).json("board not exist").end();
  }

  db.query(queryString, [number_of_players + 1, status, board_id, req.session.user.id], (err, results) => {
    if (err) {
      console.log("ERROR");
      return res.status(400).send({
        err
      });
    } else {
      return res.status(200).json({
        'board_id': board_id
      }).end();
    }
  })
});

router.get('/leaderBoard', (req, res) => {
  //console.log('leader Board');
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
  var board_id = req.query.board_id;
  const sql = `CALL getBoardMember(?)`;
  db.query(sql, board_id, (error, results) => {
    if (error) {
      console.log("ERROR");
      return console.error("error");
    } else {
      res.render('Ludo-game', {
        players: results[0],
        board_id: req.query.board_id,
        session: req.session ? req.session : ''
      });
    }
  });
});

module.exports = router