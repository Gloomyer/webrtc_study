const express = require('express')()
const http = require('http').createServer(express)

http.listen(8080, () => {
    console.log('http://127.0.0.1:8080');
})

express.get('/01', (req, resp) => {
    resp.sendFile(__dirname + '/01.通过摄像头捕捉视频并且展示.html')
})

express.get('/err', (req, resp) => {
    console.log(req.query)
    resp.send(req.query)
})