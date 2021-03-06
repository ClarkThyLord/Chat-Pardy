import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'

import $ from 'jquery'
window.$ = $

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

window.game_default = function () {
	window.game = {
		app: undefined, // MOST BASIC FORM OF SERVER
		server: undefined, // EXPRESS VERSION OF SERVER
		io: undefined, // SOCKET VERSION OF SERVER; HANDLES EVERYTHING
		socket: undefined, // CLIENT
		session: {
			id: Math.floor(Math.random() * 9999999),
			name: '',
			group: '',
			is_group_captain: false,
			state: 'waiting',
			players: [],
			group_default_time: 15,
			group_answered: false, // WHETHER OR NOT THE GROUP HAS ALREADY ANSWERED
			group_time: 0, // SECONDS CURRENT GROUP HAS
			group_turn: -1, // CURRENT GROUP'S INDEX
			group_total_turns: 0, // NUMBER OF TOTAL TURNS
			groups: [],
			group_captains: [],
			questions: {},
			msgs: []
		}
	}
}

window.game_default()

if (!process.env.IS_WEB) {
	const server = require('./common/server').default;
	window.server = server
}

import client from './common/client'
window.client = client

import util from './common/util'
window.util = util

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
window.vue = new Vue({
  components: { App },
  router,
  template: '<App/>'
}).$mount('#app')
