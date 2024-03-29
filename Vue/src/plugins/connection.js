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

/******************************************************************
 * This WILL be removed.                                          *
 * Do not depend on this function.                                *
 * All code depending on this should change to use the above API. *
 * See ConnectionAPI document in the Drive for details.           *
 ******************************************************************/
export function getUnityConnection() {
	return _channel
}
/******************************************************************/

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
	const desc = new RTCSessionDescription(message.sdp)
	_peer.setRemoteDescription(desc).catch(e => console.log(e))
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

function handleICECandidateEvent(e, peerID) {
	console.log('recieve ICE candidate')
	if (e.candidate) {
		const payload = {
			target: peerID,
			candidate: e.candidate,
			sdpMid: e.sdpMid,
			sdpMLineIndex: e.sdpMLineIndex
		}
		socket.emit('ice-candidate', payload)
		console.log('send ICE candidate')
	}
}

function handleNegotiationNeededEvent(peerID) {
	_peer.createOffer().then(offer => {
		return _peer.setLocalDescription(offer)
	}).then(() => {
		const payload = {
			target: peerID,
			caller: socket.id,
			sdp: _peer.localDescription
		}
		socket.emit('offer', payload)
	}).catch(e => console.log(e))
}

// Receive from Unity
// RTCDataChannel event handlers
function handleChannelMessage(event) {
	console.log(event.data)

	if (typeof (connection.onUnityMessage) == 'function') {
		connection.onUnityMessage(event.data)
	}
}

function handleChannelOpen(event) {
	console.log('WebRTC connection open')
}

function handleChannelClose(event) {
	console.log('WebRTC connection open')
}
