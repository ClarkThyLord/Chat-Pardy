import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	routes: [{
			path: '/',
			name: 'portal',
			component: require('./routes/portal').default
		},
		{
			path: '*',
			redirect: '/'
		}
	]
})
