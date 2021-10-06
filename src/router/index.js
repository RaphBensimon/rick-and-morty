import Vue from 'vue'
import VueRouter from 'vue-router'
import Search from '@/views/Search'
import Character from '@/views/Character'

Vue.use(VueRouter)

const routes = [
	{
		path      : '*',
		name      : 'Search',
		component : Search
	},
	{
		path      : '/character/:id',
		name      : 'Character',
		component : Character
	}
]

const router = new VueRouter({
	mode : 'history',
	routes
})

export default router
