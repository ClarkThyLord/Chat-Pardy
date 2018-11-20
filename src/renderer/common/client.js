import _io from 'socket.io-client'

export default {
	join: join
}

function join(ip) {
	ip = ip || 'localhost';

	window.game.socket = _io(`http://${ip}:7000/`)

	window.game.socket.on('connect_error', (error) => {
		alert('CANNOT FIND SESSION!')
		window.game.socket.close()
	})

	// CHAT EVENTS
	window.game.socket.on('chat_msg_g', function(msg){
    window.game.session.msgs_g.push(msg)
  })

	window.game.socket.on('chat_msg_grp', function(msg){
    window.game.session.msgs_grp.push(msg)
  })
}
