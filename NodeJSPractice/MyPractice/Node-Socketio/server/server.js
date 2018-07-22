const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
var app = express();

const publicPath = path.join(__dirname, '../public');

var server = http.createServer(app);

const {generateMessage} = require('./utils/message')

var io = socketIO(server);
app.use(express.static(publicPath));
const port = process.env.PORT || 3000;


io.on('connection', (socket) => {
    console.log('connected to client side ');


    //call back server if cient is disconnected
    socket.on('disconnect', () =>{
        console.log('Not able to connect to client')
    })

    socket.emit('newEmail', {
        from: 'aatish@hike.com',
        text: 'Hey how it is going',
        createdAt: '2:00'
    })

    socket.on('createEmail', (newEmail) => {
       console.log('Email data',newEmail);
    })

    socket.emit('newMessage', generateMessage('Admin', 'Hello Welcome to chat app'))

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'Hello new user joined'));
    
    socket.on('createMessage', (newMessage, callback) => {
       // console.log(newMessage)
       // io.emit will send data to all user including one who has sent it
        io.emit('newMessage', generateMessage(newMessage.text, newMessage.from))
           callback({
               text: 'Server Got it'
           })
        // socket.broadcast.emit will send data to all users excluding user who has sent it
        // socket.broadcast.emit('newMessage', {
        //     text: newMessage.text,
        //     from: newMessage.from,
        //     createdAt: new Date().getTime()
        // })
        
    })
});



server.listen(port, () => {
    console.log(`server is running at port ${port}`);
});


