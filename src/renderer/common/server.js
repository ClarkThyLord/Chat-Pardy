import _express from 'express'
import _io from 'socket.io'
import _http from 'http'

import _questions from './questions.json'

export default {
	create: create,
	game_start: game_start
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
		score: 0,
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
		window.game.io.sockets.emit('data_sync', {
			state: window.game.session.state,
			players: window.game.session.players,
			groups: window.game.session.groups
		})
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

					// SINCE THIS PLAYER'S INDEX HASN'T BEEN CHOOSEN ALREADY THEN ADD TO POOL
					pool.push(player)

					// GET player
					player = window.game.session.players[player]

					// UPDATE player's socket group id
					window.game.io.sockets.sockets[player.id].handshake.query.group = window.game.session.groups[g].id

					// IF PLAYER IS FIRST IN GROUP THEN MAKE TEAM CAPTAIN; ELSE MAKE NON CAPTAIN
					if (p == 0) {
						window.game.io.sockets.sockets[player.id].emit('group_captain', true);
					} else {
						window.game.io.sockets.sockets[player.id].emit('group_captain', false);
					}

					// ADD player TO group
					window.game.session.groups[g].players.push(player)
					break;
				}
			}
		}
	}

	window.game.io.on('connection', (socket) => {
		// IF socket NOT HOST THEN ADD TO PLAYERS
		if (socket.handshake.query.id != window.game.session.id) {
			// CREATE A NEW player WITH socket's id AND name GIVEN BY USER
			window.game.session.players.push(_player(socket.id, socket.handshake.query.name))

			// WHEN THE socket/client disconnects DO THE FOLLOWING
			socket.on('disconnect', (reason) => {
				// DELETE PLAYER AND SYNC DATA
				window.game.session.players.splice(window.game.session.players.findIndex(player => player.id == socket.id), 1)
				data_sync()
		  })

			// SYNC DATA ONCE NEW PLAYER IS SETUP
			data_sync()
		}

		// CHAT MSG TO GLOBAL
	  socket.on('chat_msg_g', (msg) => {
			// EMIT MESSAGE TO ALL PLAYERS; e.g. GLOBAL CHAT
	    window.game.io.emit('chat_msg', msg)
	  })

		// CHAT MSG TO socket's GROUP
	  socket.on('chat_msg_grp', (msg) => {
			// SEND MSG TO ALL GROUP MEMBERS
			for (let sub_socket of Object.values(window.game.io.sockets.sockets)) {
				// IF THIS sub_socket HAD THE SAME group OF SENDER(socket) THEN SEND MSG
				if (sub_socket.handshake.query.group == socket.handshake.query.group) {
					sub_socket.emit('chat_msg', msg)
				}
			}
	  })
	})

	// ADDING 4 group TO game session
	for (let i = 0; i < 4; i++) {
		window.game.session.groups.push(_group())
	}

	// STARTING SERVER
	window.client.join('localhost')
}

function game_start() {
	window.game.session.questions = {}

	// GET 6 RANDOM CATEGORIES THAT DON'T REPEAT
	for (let c = 0; c < 6; c++) {
		while (true) {
			let category = Object.keys(_questions)[Math.floor(Math.random() * Object.keys(_questions).length)]
			// IF WE'VE ALREADY CHOOSEN THIS CATEGORY CHOOSE ANOTHER
			if (Object.keys(window.game.session.questions).indexOf(category) != -1) continue;

			// ADD SPACE FOR THIS CATEGORY IN GAME SESSION QUESTIONS
			window.game.session.questions[category] = []

			// GET 10 RANDOM QUESTIONS FROM THE CHOOSEN CATEGORIE THAT DON'T REPEAT
			let questions_pool = []
			for (let q = 0; q < 5; q++) {
				while (true) {
					// RANDOM QUESTION FROM CATEGORY
					let question = Math.floor(Math.random() * _questions[category].length)

					// IF WE'VE ALREADY CHOOSEN THIS QUESTION CHOOSE ANOTHER
					if (questions_pool.indexOf(question) != -1) continue;

					// ADD QUESTION INDEX TO QUESTION POOL TO AVOID REPEAT
					questions_pool.push(question)

					// GET THE REAL QUESTION
					question = _questions[category][question]

					// ADD QUESTIONS TO QUESTION IN GAME SESSION QUESTIONS CATEGORY
					window.game.session.questions[category].push(question)
					break;
				}
			}

			break;
		}
	}

	window.game.io.sockets.emit('game_start', {
		state: 'playing',
		questions: window.game.session.questions
	})
}
