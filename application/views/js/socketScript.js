const socket = io('http://localhost:80')
const messageContainer = document.getElementById('message-container')
const roomContainer = document.getElementById('room-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

if (messageForm != null) {
  debugger;
  setTimeout(function() {
    debugger;
    var urlParams = new URLSearchParams(window.location.search);
    var board_id = urlParams.get('board_id');
    if(board_id && loggedInId && loggedInName) {
      socket.emit('new-player',board_id, { 'id' : loggedInId, 'name': loggedInName });
    }
  }, 100);
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

socket.on('board-created', board => {
  console.log('New board created : ' + board);
});

socket.on('chat-message', data => {
  console.log("Chat Message event ");
  appendMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected', name => {
  console.log("User Connected : " + name);
})

socket.on('user-disconnected', name => {
  console.log("User Disconnected : " + name);
})

function appendMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageContainer.append(messageElement)
}
