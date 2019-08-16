$(function() {
  //make connection
  var socket = io.connect('http://ec2-18-191-136-71.us-east-2.compute.amazonaws.com')

  //buttons and inputs
  var message = $("#message")
  var username = $("#username")
  var send_message = $("#send_message")
  //var loggedInName = $("#send_username")
  var chatroom = $("#chatroom")
  var feedback = $("#feedback")

  //Emit message
  send_message.click(function() {
    socket.emit('new_message', {
      message: message.val()
    })
  })

  if (username.val()) {
    //console.log(username.val());
    //Emit a username
    socket.emit('change_username', {
      username: username.val()
    })
  }

  //Listen on new_message
  socket.on("new_message", (data) => {
    feedback.html('');
    message.val('');
    chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>")
  })


  //Emit typing
  message.bind("keypress", () => {
    socket.emit('typing')
  })

  //Listen on typing
  socket.on('typing', (data) => {
    feedback.html("<p><i>" + data.username + " is typing a message..." + "</i></p>")
  })
});

