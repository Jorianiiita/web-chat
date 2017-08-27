const express = require('express')
const app = express()
const cors = require('cors')
const http = require('http').Server(app)
const io = require('socket.io')(http)
const path = require('path')
const PORT = 8001

var connections = {}
var users = []

app.use(cors())

app.use('/static/build', express.static(path.join(__dirname + '/../../public/static/build')))

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname + '/../../public/index.html'))
})

io.on('connection', function(socket){
  let username = socket.handshake.query.username
  users.push(username)
  connections[username] = socket
  console.log('Connected: ', users.length)

  socket.on('send message', function(data) {
    // socket.broadcast.emit('new message', data)
    connections[data.to].emit('new message', data)
  })

  socket.on('disconnect', function(data){
    users.splice(users.indexOf(data.username), 1)
    delete connections[data.username]
    console.log('Disconnected: ')
  })

  socket.on('new user', function(data) {
    users.push(data.username)
    connections[data.username] = socket
  })

  function sendUserList() {
    socket.emit('user list', users)
  }
})

http.listen(PORT, function () {
  console.log(`server is listening at port ${PORT}`)
})
