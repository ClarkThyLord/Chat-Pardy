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

	window.game.socket.on('game_start', function (data) {
		window.game.session.state = data.state
		window.game.session.questions = data.questions
	})

	// CHAT EVENTS
	window.game.socket.on('chat_msg_g', function (msg) {
    window.game.session.msgs_g.push(msg)
  })

	window.game.socket.on('chat_msg_grp', function (msg) {
    window.game.session.msgs_grp.push(msg)
  })
}
