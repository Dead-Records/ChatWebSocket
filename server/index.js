const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')
const {Server} = require('socket.io')

app.use(cors());



const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        //orgin: 'http://localhost:5173',
        orgin: 'http://192.168.1.51:5173',
        method: ['GET', 'POST'],
    },
} )


io.on('connection', (socket) =>{
    console.log("User Connected: " + socket.id)
    
    socket.on('join_room', (data) => {
        socket.join(data);
        console.log('user with ID: ' + socket.id + ' joined room: ' + data)

    })
    socket.on('send_message', (data)=> {
        console.log(data)
        socket.to(data.room).emit('receive_message',data)
    })
    socket.on('disconnect', () => {
        console.log('User Disconnected')
    })

})


server.listen(3001, () => {
    console.log('SERVER IS RUNNING')
})