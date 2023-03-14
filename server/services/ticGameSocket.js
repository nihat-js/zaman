const http = require('http');
const User = require("../models/User")
const jwt = require('jsonwebtoken')

const socketio = require('socket.io');
server2 = http.createServer();
const io = socketio(server2, { cors: { origin: "*" } });

let online = []  // {}
let rooms = []
let games = []
let timers = []
io.on('connection', async (socket) => {
  let socketId = socket.id
  socket.on('createRoom', async (data) => {
    console.log('connected',socketId)
    const decoded = jwt.verify(data.token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.user_id).select("username avatar")
    await socket.join(data.gameId)
    games.push({
      gameId: data.gameId,
      user1: { number: 1, mark: 'x', socketId, username: user.username, avatar: user.avatar },
      user2: { number: 2, mark: "o", },
      x: [], o: [],
      joined: 1, turn: 1, // user number
      winnner: 1, // finished: false,
      started: false, timer: undefined,
    })
    let game = games.map(x => { if (x?.gameId == data.gameId) { return x } })[0]
    // console.log('game',game)

    io.to(data.gameId).emit('createRoom', game)
  })

  socket.on('joinRoom', async (data) => {
    if (!io.sockets.adapter.rooms.has(data.gameId)) {
      return false
    }
    const decoded = jwt.verify(data.token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.user_id).select("username avatar")
    await socket.join(data.gameId)
    games.forEach(x => {
      console.log('joining',x)
      if (x.gameId == data.gameId) {
        x.joined = 2
        x.started = true
        x.user2.socketId = socketId
        x.user2.username = user.username,
        x.user2.avatar = user.avatar
      }
    })
    let game = games.filter(x => x.gameId == data.gameId)
    game = game[0]
    console.log('joinRoom', game)
    io.to(data.gameId).emit('joinRoom', game)
    // startTimer(data.gameId)
  })

  socket.on('mark', async (data) => {
    const decoded = jwt.verify(data.token, process.env.JWT_SECRET)
    let game = games.filter(x => x.gameId == data.gameId)
    if (!game) return false
    game = game[0]
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

    games = games.map(x => {
      if (x.gameId == data.gameId) {
        if (user.mark == "o") {
          x.o.push(data.position)
        } else if (user.mark == "x") { x.x.push(data.position) }
        clearInterval(x.timer)
        console.log('maraqlidi', x.x.includes(2, 5, 8))
        const found =  (arr2,arr1) =>  arr1.every(r => arr2.includes(r))

        if (found(x.x, [1, 4, 7]) || found(x.x, [2, 5, 8]) || found(x.x, [3, 6, 9]) || found(x.x, [1, 2, 3]) ||
          found(x.x, [4, 5, 6]) || found(x.x, [7, 8, 9]) || found(x.x, [1, 5, 9]) || found(x.x, [3, 5, 7])) {
          x.winner = 1
          io.to(data.gameId).emit('finish', game)
          return false
        }
        if (found(x.o, [1, 4, 7]) || found(x.o, [2, 5, 8]) || found(x.o, [3, 6, 9]) || found(x.o, [1, 2, 3]) ||
          found(x.o, [4, 5, 6]) || found(x.o, [7, 8, 9]) || found(x.x, [1, 5, 9]) || found(x.o, [3, 5, 7])) {
          x.winner = 2
          io.to(data.gameId).emit('finish', game)
          return false
        }

        // console.log('i am marking',)
        x.turn == 1 ? x.turn = 2 : x.turn = 1
        // startTimer(data.gameId)
        io.to(data.gameId).emit('mark', game)
      }
      return x
    })

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

function startTimer(gameId) {
  games.forEach(x => {
    if (x.gameId == gameId) {
      console.log('bura')
      x.timer = setInterval(() => {
        console.log('i am interval', x.turn)
        x.turn == 1 ? x.turn = 2 : x.turn = 1
        io.to(x.gameId).emit('update', x)
      }, 10000)
    }
  })
}




server2.listen(1000, () => {
  console.log('Tic Game  Socket started on port 1000');
});


module.exports = "Working"