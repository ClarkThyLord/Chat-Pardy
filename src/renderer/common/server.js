import _express from 'express'
import _io from 'socket.io'
import _http from 'http'

import _questions from './questions.json'

export default {
	create: create,
	game_start: game_start,
	system_message: system_message
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

	window.game.session.groups_used = 0

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
				window.game.io.sockets.sockets[player.id].handshake.query.group = g

				// SYNC client's group data; E.G. group(_index), captain[whether client is captain or not]
				window.game.io.sockets.sockets[player.id].emit('group_sync', {
					group: g,
					captain: (p == 0)
				});

				if (p == 0) window.game.session.group_captains.push(player.id);

				// ADD player TO group
				window.game.session.groups[g].players.push(player)
				break;
			}

			window.game.session.groups_used += 1
		}
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

				system_message(`${socket.handshake.query.name} has left`)
		  })

			// SYNC DATA ONCE NEW PLAYER IS SETUP
			data_sync()

			system_message(`${socket.handshake.query.name} has joined`)
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

		// GAME EVENTS
		socket.on('game_question', (data) => {
			// IF IT'S NOT THE groups captain AND IT'S NOT THE group's turn THEN DON'T RESPOND
			if (socket.handshake.query.group != window.game.session.group_turn || window.game.session.group_captains.indexOf(socket.id) == -1) return;

			// THE QUESTION HAS BEEN CHOOSEN BY THE group captain
			window.game.io.sockets.emit('game_question', Object.assign({}, window.game.session.questions[data.category][data.index], {
				group: data.group,
				category: data.category,
				index: data.index,
				points: (data.index * 100)
			}))
		})

		socket.on('game_answer', (answer) => {
			// IF IT'S NOT THE groups captain AND IT'S NOT THE group's turn THEN DON'T RESPOND
			if (socket.handshake.query.group != window.game.session.group_turn || window.game.session.group_captains.indexOf(socket.id) == -1) return;

			window.game.session.group_answered = true

			if (answer.toLowerCase() == window.game.session.question.a.toLowerCase()) {
				window.game.session.groups[socket.handshake.query.group].score += window.game.session.question.points
				system_message(`Group #${window.game.session.group_turn + 1} answered correctly!`)
			} else {
				system_message(`Group #${window.game.session.group_turn + 1} didn't answered correctly!`)
			}

			used_question()
		})
	})

	// ADDING 4 group TO game session
	for (let i = 0; i < 4; i++) {
		window.game.session.groups.push(_group())
	}

	// STARTING SERVER
	window.client.join('localhost')
}

function system_message(content) {
	window.game.io.sockets.emit('chat_msg', {
		type: 'g',
		system: true,
		host: false,
		captain: false,
		author: 'SYSTEM',
		content: content
	})
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

	system_message('Game Started!')

	game_turn()
}

// 'GAME LOOP'
function game_turn() {
	// IF NO SERVER THEN RETURN
	if (window.game.io == undefined) return;

	// IF ALL POSSIBLE TURNS THEN END GAME
	if (window.game.session.group_total_turns >= 29) {
		window.game.io.sockets.emit('game_end')
		return system_message('GAME ENDED!')
	}

	if (window.game.session.group_time == 0 || window.game.session.group_answered) {
		game_next_group()
	}

	// REMOVE A SECOND TO GROUP TIME
	window.game.session.group_time -= 1

	// ALERT PLAYERS OF TIME LEFT AFTER LESS THEN 30% OF DEFAULT TIME IS LEFT
	if (window.game.session.group_time <= 0) {
		used_question()
		system_message(`Group #${window.game.session.group_turn + 1} time ended!`)
	} else if (window.game.session.group_time <= window.game.session.group_default_time * 0.30) {
		system_message(`Group #${window.game.session.group_turn + 1} has ${Math.floor(window.game.session.group_time)} sec. left!`)
	}

	// EVERY SECOND IS A GAME TURN
	setTimeout(game_turn, 1000)
}

function game_next_group() {
	// GROUP HASN'T ANSWERED
	window.game.session.group_answered = false

	// CHANGE GROUP'S TURN AND UPDATE TIME
	// IF WE'VE ALREADY GONE THROUGH EVERY TEAM START FROM GROUP 0; ELSE, MOVE ON TO NEXT GROUP
	if (window.game.session.group_turn == (window.game.session.groups_used - 1)) {
		window.game.session.group_turn = 0
	} else {
		window.game.session.group_turn += 1
	}
	window.game.session.group_time = window.game.session.group_default_time

	// TELL ALL PLAYERS WHOSE TURN IT IS
	system_message(`It's Group #${window.game.session.group_turn + 1} turn, time: ${Math.floor(window.game.session.group_default_time)} sec.!`)

	// TELL ALL GROUP MEMBERS IT'S THEIR TURN
	for (let member of window.game.session.groups[window.game.session.group_turn].players) {
		window.game.io.sockets.sockets[member.id].emit('chat_msg', {
			type: 'g',
			system: true,
			host: false,
			captain: false,
			author: 'SYSTEM',
			content: "IT'S YOUR TEAM'S TURN!"
		})
	}
}

function game_update() {
	window.game.io.sockets.emit('game_update', {
		groups: window.game.session.groups,
		questions: window.game.session.questions
	})
}

function used_question() {
	if (window.game.session.question.category && window.game.session.question.category != '') {
		window.game.session.questions[window.game.session.question.category][window.game.session.question.index].used = true
		window.game.session.group_total_turns += 1
	}

	window.game.io.sockets.emit('game_question', {
		q: '',
		a: ''
	})

	game_update()
}
