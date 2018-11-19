import _express from 'express'
import _io from 'socket.io'
import _http from 'http'

export default {
	create: create
}

function create() {
	if (process.env.IS_WEB) return;

	window.game.app = _express()

	window.game.app.get('/', (req, res) => res.send('Hello World!'))

	window.game.server = _http.Server(window.game.app)
	window.game.server.listen(7000)

	window.game.io = _io(window.game.server)

	window.game.io.on('connection', (socket) => {
		socket.emit('hello', {
			text: 'Hello world!'
		})

	  socket.on('chat_msg_g', function(msg){
	    io.emit('chat_msg_g', msg);
	  })
	})
}
