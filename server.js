const express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io')(server),
	PORT = process.env.PORT || 3000

const fs = require('fs');
fs.readdirSync('./').forEach(file => {
	console.log(file);
});
// Define Express GET paths
/*
app.get('/', (req, res) => {
  console.log('404')
  res.sendStatus(404)
})
app.get('/room', (req, res) => {
  console.log('approve')
  res.sendFile(__dirname + "/dist/index.html")
})
*/
app.use(express.static('dist'))


// Define Socket.IO functions
const rooms = {} // key = roomID, value = socketID of creator; rooms are destroyed once a client joins

io.on('connection', socket => {
	socket.on('create room', (roomID) => {
		rooms[roomID] = socket.id
		console.log(`Socket ${socket.id} created room ${roomID}`)
	})

	socket.on('join room', roomID => {
		// room does not exist
		if (!(rooms[roomID])) {
			socket.emit('failed join room', 'Open room does not exists.')
			return
		}

		const unityUser = rooms[roomID]
		delete rooms[roomID]

		socket.emit('other user', unityUser)
		socket.to(unityUser).emit('user joined', socket.id)

		console.log(`Socket ${socket.id} joined room ${roomID}`)
	})

	socket.on('offer', payload => {
		// values[0] = <target>, values[1] = <caller>, values[2] = <sdp>
		console.log(`${typeof payload}: ${JSON.stringify(payload)}`)
		const values = payload.split("\n")
		io.to(values[0]).emit('offer', payload)
		console.log(`Socket ${values[1]} made offer to ${values[0]}`)
	})

	socket.on('answer', payload => {
		// values[0] = <target>, values[1] = <caller>, values[2] = <sdp>
		const values = payload.split("\n")
		io.to(values[0]).emit('answer', payload)
		console.log(`Socket ${values[1]} sent answer to ${values[0]}`)
	})

	socket.on('ice-candidate', incoming => {
		// info[0] = <target>, info[1] = <values>
		const info = incoming.split("\n\n")

		io.to(info[0]).emit('ice-candidate', info[1])
		console.log(`Socket ${socket.id} sent ICE candidate to ${info[0]}`)
		console.log(`     ${info[1]}`)
	})

	console.log(`Socket ${socket.id} connected`)
})

// Start HTTP server with Socket.IO and Express attached
server.listen(PORT, () => {
	console.log(`Express server is running on port ${PORT}`)
})