import _express from 'express'
import _io from 'socket.io'
import _http from 'http'

export default {
	create: create
}

function player(id, name, socket) {
	id = id || Math.floor(Math.random() * 9999999)
	name = name || `player_${id}`

	return {
		id: id,
		name: name,
		socket: socket
	}
}

function group() {
	return {
		id: Math.floor(Math.random() * 9999999),
		players: []
	}
}

function create() {
	if (process.env.IS_WEB) return;

	window.game.app = _express()

	window.game.app.get('/', (req, res) => res.send('<a href="https://github.com/ClarkThyLord/Chat-Pardy">Chat Pardy!</a>'))

	window.game.server = _http.Server(window.game.app)
	window.game.server.listen(7000)

	window.game.io = _io(window.game.server)

	window.game.io.on('connection', (socket) => {
		console.log(socket.handshake.query);
		// IF NOT HOST THEN ADD TO PLAYERS
		if (socket.handshake.query.id != window.game.session.id) {
			window.game.session.players.push({
				id: socket.handshake.query.id,
				name: socket.handshake.query.name,
				group: 0
			})

			window.game.io.sockets.emit('players_d', window.game.session.players)
			window.game.io.sockets.emit('groups_d', window.game.session.groups)
		}

	  socket.on('chat_msg_g', function (msg){
	    window.game.io.emit('chat_msg_g', msg)
	  })

	  socket.on('chat_msg_grp', function (msg){
	    window.game.io.emit('chat_msg_grp', msg)
	  })
	})

	window.game.session.groups.push(group())
	window.game.session.groups.push(group())
	window.game.session.groups.push(group())
	window.game.session.groups.push(group())

	window.client.join('localhost')
}
