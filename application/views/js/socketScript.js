const socket = io('http://ec2-18-191-136-71.us-east-2.compute.amazonaws.com')
const messageContainer = document.getElementById('message-container')
const roomContainer = document.getElementById('room-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

if (messageForm != null) {
  setTimeout(function() {
    var urlParams = new URLSearchParams(window.location.search);
    var board_id = urlParams.get('board_id');
    if(board_id && loggedInId && loggedInName) {
      socket.emit('new-player',board_id, { 'id' : loggedInId, 'name': loggedInName });
    }
  }, 1000);
  messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const board_id = $('#hdnBoardId').val();
    const user_id = $('#hdnUserId').val();
    const user_name = $('#hdnUserName').val();
    const message = messageInput.value
    appendMessage(`You: ${message}`)
    socket.emit('send-chat-message', board_id,  { 'id' : user_id, 'name': user_name }, message)
    messageInput.value = ''
  })
}

function emitJoinNewPlayer(board_id, user) {
  socket.emit('new-player', board_id, user);
}
/* Board Created */
socket.on('board-created', board => {
  //console.log('New board created : ' + board);
});

/* Chat */
socket.on('chat-message', data => {
  //console.log("Chat Message event ");
  appendMessage(`${data.name}: ${data.message}`)
})

/* User connected */
socket.on('user-connected', name => {
  //console.log("User Connected : " + name);
})

/* User Disconnected */
socket.on('user-disconnected', name => {
  //console.log("User Disconnected : " + name);
})

/* Dice Roll brodcasting */
socket.on('roll-dice', data => {
  console.log("Roll Dice client");
  //$('#hdnDiceNumber').val(data);
  var dice = document.getElementById('dice');
  dice.style.backgroundImage = "url(Images/" + data + ".jpg)";
});

/* change player brodcasting */
socket.on('change-player',c =>{
  var text = document.getElementById('player');
  text.innerText = text.style.color = c;
  switch (text.innerText) {
       case "red": $('#playerName').text($('#player-0').val()); break;
       case "blue": $('#playerName').text($('#player-1').val()); break;
       case "yellow": $('#playerName').text($('#player-2').val()); break;
       case "green": $('#playerName').text($('#player-3').val()); break;
  }

  var dice = document.getElementById('dice');
  dice.style.backgroundImage = "url(Images/dice.gif)";
});

/* Update new player brodcasting */
socket.on('notify_to_all', data => {
  var field = '<input type="hidden" id="player-' + (data.count - 1) + '" value="'+ data.name +'"> <input type="hidden" id="color-' + (data.count - 1) + '" value="'+ data.color +'">'
  $('#Players').append(field);

  var html = '<tr><td>'+data.name+'</td><td>'+data.color+'</td></tr>'
  $('#tblPlayers').append(html);

  if(data.count == 4)
  {
    var dice = document.getElementById('dice');
    dice.style.backgroundImage = "url(Images/dice.gif)";

    var playerName = $('#player-0').val();
    $('#playerName').text(playerName);
    $('#PlayerList').hide();
    $('#dice').show();
    $('#turn').show();
  }
});

/* broadcast all position of all pawn */
socket.on('send_data_to_all', data => {
  var pawn_data = JSON.parse(data.pawn_data);
  $('#redpawn1').css({"top": pawn_data.red_pawn_1[0], "left": pawn_data.red_pawn_1[1]});
  $('#redpawn2').css({"top": pawn_data.red_pawn_2[0], "left": pawn_data.red_pawn_2[1]});
  $('#redpawn3').css({"top": pawn_data.red_pawn_3[0], "left": pawn_data.red_pawn_3[1]});
  $('#redpawn4').css({"top": pawn_data.red_pawn_4[0], "left": pawn_data.red_pawn_4[1]});

  $('#bluepawn1').css({"top": pawn_data.blue_pawn_1[0], "left": pawn_data.blue_pawn_1[1]});
  $('#bluepawn2').css({"top": pawn_data.blue_pawn_2[0], "left": pawn_data.blue_pawn_2[1]});
  $('#bluepawn3').css({"top": pawn_data.blue_pawn_3[0], "left": pawn_data.blue_pawn_3[1]});
  $('#bluepawn4').css({"top": pawn_data.blue_pawn_4[0], "left": pawn_data.blue_pawn_4[1]});

  $('#yellowpawn1').css({"top": pawn_data.yellow_pawn_1[0], "left": pawn_data.yellow_pawn_1[1]});
  $('#yellowpawn2').css({"top": pawn_data.yellow_pawn_2[0], "left": pawn_data.yellow_pawn_2[1]});
  $('#yellowpawn3').css({"top": pawn_data.yellow_pawn_3[0], "left": pawn_data.yellow_pawn_3[1]});
  $('#yellowpawn4').css({"top": pawn_data.yellow_pawn_4[0], "left": pawn_data.yellow_pawn_4[1]});

  $('#greenpawn1').css({"top": pawn_data.green_pawn_1[0], "left": pawn_data.green_pawn_1[1]});
  $('#greenpawn2').css({"top": pawn_data.green_pawn_2[0], "left": pawn_data.green_pawn_2[1]});
  $('#greenpawn3').css({"top": pawn_data.green_pawn_3[0], "left": pawn_data.green_pawn_3[1]});
  $('#greenpawn4').css({"top": pawn_data.green_pawn_4[0], "left": pawn_data.green_pawn_4[1]});

  var pawnPosition = JSON.parse(data.currPawn);
  positions = pawnPosition.position;
  onboard = pawnPosition.onboard;

  var dice = document.getElementById('dice');
  dice.style.backgroundImage = "url(Images/dice.gif)";
})

function appendMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageContainer.append(messageElement)
}
