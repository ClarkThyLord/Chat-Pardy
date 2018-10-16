import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	routes: [{
			path: '/',
			name: 'portal',
			component: require('@/components/portal').default
		},
		{
			path: '*',
			redirect: '/'
		}
	]
})
