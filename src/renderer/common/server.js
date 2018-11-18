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

	window.game.socket = _io(window.game.server)

	window.game.socket.on('connection', (socket) => {
		socket.emit('hello', {
			text: 'Hello world!'
		})
	})
}
