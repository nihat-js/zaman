import React, { useEffect, useState } from 'react'
import io from 'socket.io-client';
import Avatar from '../components/User/Avatar';
import { token } from '../utils/utils';
import Nav from "../components/Nav"
import './GameTic.scss'
import linkSvg from "../assets/svg/link.svg"
import { useParams } from 'react-router-dom';
let socket = io('http://localhost:1000');
export default function GameTic() {
  // const [rooms, setRooms] = useState([])
  const [input1, setInput1] = useState("")
  const [input2, setInput2] = useState("")
  const [myNumber, setMyNumber] = useState("")
  const [game, setGame] = useState({})
  const { id } = useParams()

  function mark(position) {
    console.log('pos', position)
    socket.emit('mark', { token, gameId: game.gameId, position })
    if (game.myNumber == game.turn && position >= 1 && position <= 9 && !room.x.includes(position) && !room.o.includes(position)) {
      //   if (room.myMark == "o") {
      //     setRoom({ ...room, x: [...room.x, position] })
      //     room.o.push(room.myMark)
      //   } else if (room.myMark == "x") {
      //     setRoom({ ...room, o: [...room.o, position] })
      //   }
    }

  }
  useEffect(() => {
    socket.on('createRoom', (data) => {
      console.log('created Room', data)
      setGame(data)
    })
    socket.on('joinRoom', (data) => {
      setGame(data)
    })
    socket.on('mark', (data) => {
      setGame(data)
    })
    socket.on('update', (data) => {
      setGame(data)
    })

    socket.on('finish', (data) => {
      setGame(data)
      setMyNumber(m => {
        console.log('m', m)
        if (data.winner == m) {
          alert("Congrats :) You win")
        } else {
          alert("Next time :(")
        }
        return m
      })
      setInterval(()=>{
        setGame({})
      },1000)

    })
    if (id) {
      socket.emit('joinRoom', { token, gameId: id })
      setMyNumber(2)
    }

  }, [])



  function createRoom() {
    socket.emit('createRoom', { token, gameId: input1 })
    setMyNumber(1)

  }
  function joinRoom(roomName) {
    socket.emit('joinRoom', { token, gameId: input2 })
    setMyNumber(2)
  }



  return (
    <div className='game-tic page min-h-screen bg-slate-50'>
      <Nav />
      <div className='mx-auto mt-4 ' style={{ maxWidth: "1200px" }}>
        <h3 className='mt-2 text-2xl font-semibold mb-4'> TicTacToe Game </h3>
        {
          !game.gameId && <>
            <div className='flex gap-3'>
              <input className='px-3 py-2 rounded-md outline-none bg-gray-100' type="text" value={input1} onChange={(e) => setInput1(e.target.value)} placeholder="Room number" />
              <button className='px-5 py-3 rounded-md bg-teal-600 hover:bg-teal-800 text-white  ' onClick={() => createRoom()}> Create Room   </button>
            </div>
            <div className='flex gap-3 mt-2'>
              <input className='px-3 py-2 rounded-md outline-none bg-gray-100' type="text" value={input2} onChange={(e) => setInput2(e.target.value)} placeholder="Room number" />
              <button className='px-5 py-3 rounded-md bg-teal-600 hover:bg-teal-800 text-white  ' onClick={() => joinRoom()}> Join Room  </button>
            </div>
          </>
        }
        <div className='game mt-10  '>
          {
            myNumber == game.turn && game.started && <p className='flex gap-2 items-center'> Your time          <span className="timer h-5 block">  </span>  </p>
          }
          {game.gameId && <div className="flex gap-2">
            Room Name :  {game.gameId}
            <img onClick={() => navigator.clipboard.writeText(window.location.origin + "/game/tic/" + game.gameId)}
              className='w-6 rounded-full hover:bg-slate-200  active:bg-blue-600' src={linkSvg} alt="" />
          </div>
          }
          {game.joined > 0 && <div className="joined">
            Joined users {game.joined} /2
            <div className='flex gap-2'>
              Room creator :{game.user1?.avatar && <Avatar avatar={game.user1?.avatar} />}
            </div>
            <div className='flex gap-2'>
               Second user {game.user2?.avatar && <Avatar avatar={game.user2?.avatar} />}
            </div>
          </div>}
          {game.joined == 1 && <div className="status"> Game status : Waiting for player </div>}
          {game.joined == 2 && <div className="status"> Game Started </div>}
          {game.joined > 0 && <p> Your number : {myNumber} . Turn is {game.turn}  </p>}
          <div  className='board grid  mt-5' style={{ maxWidth :"360px", gridTemplateColumns: "repeat(3,1fr)" }} >
            {
              game.joined == 2 && [...new Array(9)].map((i, j) => <div onClick={() => mark(j + 1)}
                className='bg-slate-100 border border-black h-20 flex justify-center items-center ' index={j + 1} >  {game.x?.includes(j + 1) && "X"} {game.o?.includes(j + 1) && "O"}   </div>)
            }
          </div>
        </div>

      </div>
    </div>
  )
}
