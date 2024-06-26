import { io } from 'https://cdn.socket.io/4.7.4/socket.io.esm.min.js';

let _peer
let _channel
let connection = {
	onUnityMessage: undefined,
	send: function (message) {
		_channel.send(message)
	}
}
export default connection

const sep = "\n;\n"

// Create Socket.IO connection for WebRTC handshake
const socket = io()
socket.on('answer', handleAnswer)
socket.on('failed join room', function (reason) {
	// reason is only 'Open room does not exists.'
	// TODO: redirect to or display error
})
socket.on('ice-candidate', function (incoming) {
	const candidate = new RTCIceCandidate(incoming)
	_peer.addIceCandidate(candidate).catch(e => console.log(e))
})
socket.on('other user', function (peerID) {
	createPeer(peerID)

	// creates an RTCDataChannel object with the arbitrary ID 'messaging'
	_channel = _peer.createDataChannel('messaging')
	_channel.onmessage = handleChannelMessage
	_channel.onopen = handleChannelOpen
	_channel.onclose = handleChannelClose
})

// Begins Connection
const params = new URLSearchParams(location.search)
const roomID = params.get('id') || sessionStorage.getItem('roomID')

socket.emit('join room', roomID)
console.log(roomID)

window.onbeforeunload = function (e) {
	sessionStorage.setItem('roomID', roomID)
}


function handleAnswer(message) {
	console.log('recieve answer')
	const values = message.split(sep)
	const init = {
		type: values[0].toLowerCase(),
		sdp: values[1]
	}
	_peer.setRemoteDescription(init).catch(e => console.log(e))
}


function createPeer(peerID) {
	_peer = new RTCPeerConnection({
		iceServers: [
			{
				urls: 'stun:stun.stunprotocol.org'
			}
		]
	})
	_peer.onicecandidate = (e) => handleICECandidateEvent(e, peerID)
	_peer.onnegotiationneeded = () => handleNegotiationNeededEvent(peerID)

	return _peer
}

function handleICECandidateEvent(event, peerID) {
	console.log('recieve ICE candidate')
	const iceCandidate = event.candidate
	if (iceCandidate) {
		/* String in format
		<target>
		<candidate>
		<sdpMid>
		<sdpMLineIndex>
		*/
		const message = `${peerID}${sep}${sep}${iceCandidate.candidate}${sep}${iceCandidate.spdMid}${sep}${iceCandidate.spdMLineIndex}`
		socket.emit('ice-candidate', message)
		console.log('send ICE candidate')
	}
}

function handleNegotiationNeededEvent(peerID) {
	_peer.createOffer().then(offer => {
		return _peer.setLocalDescription(offer)
	}).then(() => {
		/* String in format
		<target>
		<caller>
		<spd>
		*/
		const message = `${peerID}${sep}${socket.id}${sep}${_peer.localDescription.sdp}`
		socket.emit('offer', message)
	}).catch(e => console.log(e))
}

let receivedMessages = []

// Receive from Unity
// RTCDataChannel event handlers
function handleChannelMessage(event) {
	console.log(event.data)

	_channel.send(`(ACK)${event.data}`)

	receivedMessages.push(event.data)

	if (typeof (connection.onUnityMessage) == 'function') {
		receivedMessages.forEach((msg) => {
			connection.onUnityMessage(msg)
		})
		receivedMessages = []
	}
}

function handleChannelOpen(event) {
	console.log('WebRTC connection open')
}

function handleChannelClose(event) {
	console.log('WebRTC connection close')
}
