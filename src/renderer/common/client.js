import _io from 'socket.io-client'

export default {
	join: join // JOINS A server
}

function join(ip) {
	window.game.socket = _io(`http://${ip}:7000/`, {
		reconnection: false,
		query: {
			id: window.game.session.id,
			name: window.game.session.name
		}
	})

	// CONNECTION EVENTS
	window.game.socket.on('connect', () => {
		// GO TO hub
		window.vue.$router.push('hub')
	})

	window.game.socket.on('is_playing', () => {
		// CLOSE CONNECTION TO SERVER; AND, RESET game data
		window.game.socket.close()
		window.game_default()

		// GO TO portal
		window.vue.$router.push('portal')

		alert('SESSION IS IN PLAY!')
	})

	window.game.socket.on('connect_error', (error) => {
		// ALERT USER THAT THE SESSION CANNOT BE FOUND
		alert('CANNOT FIND SESSION!')

		// CLOSE CONNECTION TO SERVER; AND, RESET game data
		window.game.socket.close()
		window.game_default()
	})

	window.game.socket.on('disconnect', (reason) => {
		// CLOSE CONNECTION TO SERVER; AND, RESET game data
		window.game.socket.close()
		window.game_default()

		// GO TO portal
		window.vue.$router.push('portal')
	});

	// THE FOLLOWING UPDATES client game data WITH server game data

	// DATA EVENTS
	window.game.socket.on('data_sync', function (data) {
		window.game.session.players = data.players
		window.game.session.groups = data.groups
  })

	window.game.socket.on('group_sync', function (data) {
		window.game.session.group = data.group
		window.game.session.is_group_captain = data.captain
	})

	window.game.socket.on('game_start', function (data) {
		window.game.session.state = data.state
		window.game.session.questions = data.questions
	})

	// CHAT EVENTS
	window.game.socket.on('chat_msg', function (msg) {
    window.game.session.msgs.push(msg)
  })

	// GAME EVENTS
	window.game.socket.on('game_question', function (data) {
		window.game.session.question = data
	})

	window.game.socket.on('game_update', (data) => {
		window.game.session.groups = data.groups
		window.game.session.questions = data.questions
	})
}
