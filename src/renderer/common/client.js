import _io from 'socket.io-client'

export default {
	join: join
}

function join(ip) {
	// DEFAULT VALUES
	ip = ip || 'localhost';

	window.game.socket = _io(`http://${ip}:7000/`, {
		reconnection: false,
		query: {
			id: window.game.session.id,
			name: window.game.session.name
		}
	})

	// CONNECTION EVENTS
	window.game.socket.on('connect', () => {
		window.vue.$router.push('hub')
	});

	window.game.socket.on('connect_error', (error) => {
		alert('CANNOT FIND SESSION!')
		window.game.socket.close()
	})

	window.game.socket.on('disconnect', (reason) => {
		window.game.socket.close()
		window.game_default()
		window.vue.$router.push('portal')
	});

	// DATA EVENTS
	window.game.socket.on('data_sync', function (data) {
		window.game.session.players = data.players
		window.game.session.groups = data.groups
  })

	window.game.socket.on('group_captain', function (data) {
		window.game.session.is_group_captain = data
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
