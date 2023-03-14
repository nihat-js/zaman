const http = require('http');
const User = require("../models/User")
const jwt = require('jsonwebtoken')

const socketio = require('socket.io');
server2 = http.createServer();
const io = socketio(server2, { cors: { origin: "*" } });

let games = []
io.on('connection', async (socket) => {
  let socketId = socket.id
  console.log('a user connected');
  socket.on('createRoom', async (data) => {
    await socket.join(data.gameId)
    games.push({
      gameId: data.gameId,
      user1: { number: 1,  socketId, },
      user2: { number: 2,  },
      joined: 1, turn: 1, // user number
      winnner: null, // finished: false,
      started: false, timer: undefined,
    })
    let game = games.map(x => { if (x?.gameId == data.gameId) { return x } })[0]
    console.log('game',game)

    io.to(data.gameId).emit('createRoom', game)
  })

  socket.on('joinRoom', async (data) => {
    if (!io.sockets.adapter.rooms.has(data.gameId)) {
      return false
    }
    await socket.join(data.gameId)
    games.forEach(x => {
      console.log('joining',x)
      if (x.gameId == data.gameId) {
        x.joined = 2
        x.started = true
        x.user2.socketId = socketId
        io.to(data.gameId).emit('joinRoom', x)
        // startTimer(data.gameId)
      }
    })
  })

  socket.on('move', async (data) => {
      
    let user, userNumber
    if (socketId == game.user1?.socketId) {
      user = game.user1
      userNumber = 1
    } else if (socketId == game.user2?.socketId) {
      user = game.user2
      userNumber = 2
    }
    console.log("Is it your turn ??", game.turn == userNumber)
    if (game.turn != userNumber) { return false }

  })



  socket.on('disconnect', async () => {
    console.log('disconnected', socketId)
    games = games.map(x => {
      if (!x) { return false }
      if (x.user1?.socketId == socketId) {
        x.user1 = {}
        x.winner = 2
      }
      if (x.user2?.socketId == socketId) {
        x.user2 = {}
        x.winner = 1
      }
      io.to(x.gameId).emit('finish', { x })
      x.gameId = "___"
    })
    console.log('disconnect', games)
  })

});





server2.listen(1001, () => {
  console.log('Checker game  socket started on port 1001');
});


module.exports = "Working"