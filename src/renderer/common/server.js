import _express from 'express'
import _io from 'socket.io'
import _http from 'http'

export default {
	create: create
}

function _player(id, name) {
	id = id || Math.floor(Math.random() * 9999999)
	name = name || `player_${id}`

	return {
		id: id,
		name: name
	}
}

function _group() {
	return {
		id: Math.floor(Math.random() * 9999999),
		players: []
	}
}

function create() {
	// IF IN BROWSER DON'T CREATE SERVER
	if (process.env.IS_WEB) return;

	// EXPRESS SERVER
	window.game.app = _express()

	window.game.app.get('/', (req, res) => res.send('<a href="https://github.com/ClarkThyLord/Chat-Pardy">Chat Pardy!</a>'))

	// HTTP SERVER
	window.game.server = _http.Server(window.game.app)
	window.game.server.listen(7000)

	// IO SERVER
	window.game.io = _io(window.game.server)

	function data_sync() {
		// SYNC players,groups OF ALL sockets
		window.game.io.sockets.emit('players_d', window.game.session.players)
		window.game.io.sockets.emit('groups_d', window.game.session.groups)
	}

	window.game.io.on('connection', (socket) => {
		// IF socket NOT HOST THEN ADD TO PLAYERS
		if (socket.handshake.query.id != window.game.session.id) {
			window.game.session.players[socket.handshake.query.id] = _player(socket.handshake.query.id, socket.handshake.query.name)

			// WHEN THE socket/client disconnects do the following
			socket.on('disconnect', (reason) => {
				// DELETE PLAYER AND SYNC DATA
				delete window.game.session.players[socket.handshake.query.id]

				data_sync()
		  })

			// SYNC DATA ONCE NEW PLAYER IS SETUP
			data_sync()
		}

		// CHAT MSG TO GLOBAL
	  socket.on('chat_msg_g', function (msg){
	    window.game.io.emit('chat_msg_g', msg)
	  })

		// CHAT MSG TO socket's GROUP
	  socket.on('chat_msg_grp', function (msg){
	    window.game.io.emit('chat_msg_grp', msg)
	  })
	})

	// ADDING 4 groups TO game session
	for (let i = 0; i < 4; i++) {
		let group = _group()
		window.game.session.groups[group.id] = group
	}

	// STARTING SERVER
	window.client.join('localhost')
}
