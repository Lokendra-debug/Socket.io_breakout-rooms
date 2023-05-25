const express = require('express');
const app = express();
const http=require("http")
const server=http.createServer(app)
const {Server}=require(`socket.io`)
const io=new Server(server)

let rooms=[{"Room 1":0},{"Room 2":0},{"Room 3":0}]

io.on('connection', (socket) => {
  console.log('a user connected');
  let room=rooms[Math.floor(Math.random()*3)]
  let roomName=Object.keys(room)[0]
  socket.join(roomName);
  room[roomName]+=1
  socket.on('disconnect', () => {
    room[roomName]-=1
    console.log('a user disconnected');
    io.sockets.in(roomName).emit(`userCount`,`Total users: ${room[roomName]}`)
  });
  socket.send(`you are in ${roomName}`)
  io.sockets.in(roomName).emit(`userCount`,`Total users: ${room[roomName]}`)
});







server.listen(3000,()=>{
    console.log('listening on 3000');
})
