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
    
})