const express = require('express')()
const http = require('http').createServer(express)
const socketio = require('socket.io').listen(http)

http.listen(8080, () => {
    console.log('http://127.0.0.1:8080');
})

express.get('/01', (req, resp) => {
    resp.sendFile(__dirname + '/01.通过摄像头捕捉视频并且展示.html')
})

express.get('/02', (req, resp) => {
    resp.sendFile(__dirname + '/02.获取当前设备信息.html')
})

express.get('/03', (req, resp) => {
    resp.sendFile(__dirname + '/03.点对点webrtc音视频通信/client.html')
})

express.get('/err', (req, resp) => {
    console.log(req.query)
    resp.send(req.query)
})

socketio.on('connection', socket => {
    console.log('a user connected.')

    socket.on('create or join', room => {
        console.log('create or join to room', room)
        var myRoom = socketio.sockets.adapter.rooms[room]
        if (myRoom && myRoom.length > 1) {
            console.log(myRoom.length, room, 'is full.')
            return
        }
       
        if (myRoom) {
            //joined
            console.log(socket.id, 'joined')
            socket.join(room)
            socket.emit('joined', room)
        } else {
            //create
            console.log(socket.id, 'created')
            socket.join(room)
            socket.emit('created', room)
        }
    })

    socket.on('ready', room => {
        socket.broadcast.to(room).emit('ready')
    })

    socket.on('candidate', event => {
        socket.broadcast.to(event.room).emit('candidate', event)
    })

    socket.on('offer', event => {
        socket.broadcast.to(event.room).emit('offer', event)
    })

    socket.on('answer', event => {
        socket.broadcast.to(event.room).emit('offer', event)
    })
})