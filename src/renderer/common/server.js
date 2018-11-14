import _express from 'express'
import _io from 'socket.io'
import _http from 'http'

export default {
	create: create
}

function create() {
	if (process.env.IS_WEB) return;

	let app = _express()

	app.get('/', (req, res) => res.send('Hello World!'))

	let server = _http.Server(app)
	server.listen(7000)

	window.game.data.session = _io(server)

	window.game.data.session.on('connection', (socket) => {
		socket.emit('hello', {
			text: 'Hello world!'
		})
	})
}
