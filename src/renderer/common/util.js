import $ from 'jquery'

export default {
	url_open: url_open
}

function url_open(link) {
	try {
		if (process.env.BUILD_TARGET !== 'web') {
			this.$electron.shell.openExternal(link)
		} else {
			window.open(link)
		}
	} catch (e) {
		window.open(link)
	}

	return false;
}
