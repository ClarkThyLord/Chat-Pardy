import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'

import $ from 'jquery'
window.$ = $

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

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
