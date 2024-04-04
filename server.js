const express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io')(server),
	PORT = process.env.PORT || 3000


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
		io.to(payload.target).emit('offer', payload)
		console.log(`Socket ${payload.caller} made offer to ${payload.target}`)
	})

	socket.on('answer', payload => {
		io.to(payload.target).emit('answer', payload)
		console.log(`Socket ${payload.caller} sent answer to ${payload.target}`)
	})

	socket.on('ice-candidate', incoming => {
		let target = incoming.target
		delete incoming.target
		io.to(target).emit('ice-candidate', incoming)
		console.log(`Socket ${socket.id} sent ICE candidate to ${target}`)
		console.log(`     ${JSON.stringify(incoming)}`)
	})

	console.log(`Socket ${socket.id} connected`)
})

// Start HTTP server with Socket.IO and Express attached
server.listen(PORT, () => {
	console.log(`Express server is running on port ${PORT}`)
})