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
		// AUTO GROUP
		autogroup()

		// SYNC players,groups OF ALL sockets
		window.game.io.sockets.emit('players_d', window.game.session.players)
		window.game.io.sockets.emit('groups_d', window.game.session.groups)
	}

  function autogroup() {
		// CLEAN GROUPS
		window.game.session.groups = []
		for (let g = 0; g < 4; g++) {
			// ADD NEW GROUP
			window.game.session.groups.push(_group())
		}

		// MAX NUM OF PLAYERS PER GROUP ALLOWED
		let maxnum = Math.ceil(Math.sqrt(window.game.session.players.length))

		// LIST OF PLAYERS ALREADY CHOOSEN
		let pool = []
		for (let p = 0; p < maxnum; p++) {
			// IF WE'VE ALREADY CHOOSEN ALL AVALIABLE PLAYERS BREAK
			if (pool.length === window.game.session.players.length) break;
			
			for (let g = 0; g < 4; g++) {
				// IF WE'VE ALREADY CHOOSEN ALL AVALIABLE PLAYERS BREAK
				if (pool.length === window.game.session.players.length) break;

				while (true) {
					// IF WE'VE ALREADY CHOOSEN ALL AVALIABLE PLAYERS BREAK
					if (pool.length === window.game.session.players.length) break;

					// CHOSE A PLAYER'S INDEX AT RANDOM
					let player = Math.floor(Math.random() * window.game.session.players.length)

					// IF PLAYER'S INDEX IS ALREADY USED RE-PICK
					if (pool.indexOf(player) != -1) continue;

					// SINCE THIS PLAYER'S INDEX HASN'T BEEN CHOOSEN THEN ADD TO POOL AND GROUP
					pool.push(player)
					window.game.session.groups[g].players.push(window.game.session.players[player])
					break;
				}
			}
		}
	}

	window.game.io.on('connection', (socket) => {
		// IF socket NOT HOST THEN ADD TO PLAYERS
		if (socket.handshake.query.id != window.game.session.id) {
			window.game.session.players.push(_player(socket.handshake.query.id, socket.handshake.query.name))

			// WHEN THE socket/client disconnects do the following
			socket.on('disconnect', (reason) => {
				// DELETE PLAYER AND SYNC DATA
				window.game.session.players.splice(window.game.session.players.findIndex(player => player.id === socket.handshake.query.id), 1)

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

	// ADDING 4 group TO game session
	for (let i = 0; i < 4; i++) {
		window.game.session.groups.push(_group())
	}

	// STARTING SERVER
	window.client.join('localhost')
}
