import _io from 'socket.io-client'

export default {
	join: join
}

function join(ip) {
	ip = ip || 'localhost';

	let socket = _io(`http://${ip}:7000/`)

	socket.on('hello', (data) => {
		console.log(data);
	})
}
