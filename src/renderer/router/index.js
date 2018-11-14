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
			path: '/hub',
			name: 'hub',
			component: require('./routes/hub').default
		},
		{
			path: '*',
			redirect: '/'
		}
	]
})
