import _io from 'socket.io-client'

export default {
	join: join
}

function join(ip) {
	ip = ip || 'localhost';

	window.game.socket = _io(`http://${ip}:7000/`)

	window.game.socket.on('hello', (data) => {
		console.log(data);
	})
}
