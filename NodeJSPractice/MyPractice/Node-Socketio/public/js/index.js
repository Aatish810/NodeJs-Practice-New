var socket = io();
socket.on('connect', function() {
  console.log('connected to server');

  socket.emit('createEmail', {
     email: 'abcd@gmail.com',
     text: 'Hello this is ABCD'
  })


});

socket.on('disconnect', function()  {
    console.log('unable to connect')
})

socket.on('newEmail', function(email) {
    console.log('Email Data', email);
})

 socket.on('newMessage', function(message) {
     console.log(message)
     var li = jQuery(`<li></li>`);
     li.text(`${message.from}: ${message.text}`)
     jQuery('#new-messages').append(li);
})


// adding acknowledgement from server once data is received
// create message with default parameters. function is below
// socket.emit('createMessage', {
//     from: 'Aatish',
//     text: 'Hi'
// }, function(data) {
//    console.log(data.text)
// })

function showData() {
    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function() {

    })
}