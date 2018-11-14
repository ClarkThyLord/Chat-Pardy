import _io from 'socket.io-client'

export default {
	join: join
}

function join() {
	let socket = _io('http://localhost:7000/')

	socket.on('hello', (data) => {
		console.log(data);
	})
}
