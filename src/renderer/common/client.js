import _io from 'socket.io-client'

export default {
	join: join
}

function join(ip) {
	ip = ip || 'localhost';

	window.game.socket = _io(`http://${ip}:7000/`, {
		reconnection: false,
		query: {
			id: window.game.session.id,
			name: window.game.session.name
		}
	})

	// CONNECTION EVENTS
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
	window.game.socket.on('players_d', function(data){
		window.game.session.players = data
  })

	window.game.socket.on('groups_d', function(data){
		window.game.session.groups = data
  })

	// CHAT EVENTS
	window.game.socket.on('chat_msg_g', function(msg){
    window.game.session.msgs_g.push(msg)
  })

	window.game.socket.on('chat_msg_grp', function(msg){
    window.game.session.msgs_grp.push(msg)
  })
}
