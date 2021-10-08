import Vue from 'vue'
import VueRouter from 'vue-router'
import Search from '@/views/Search'
import Character from '@/views/Character'

Vue.use(VueRouter)

Vue.prototype.$metaTitle = 'Rick and Morty'
const routes = [
	{
		path      : '*',
		name      : 'Search',
		component : Search,
		meta      : {
			title : 'Accueil'
		}
	},
	{
		path      : '/character/:id',
		name      : 'Character',
		component : Character,
		meta      : {
			title : ''
		}
	}
]

const router = new VueRouter({
	mode : 'history',
	routes,
})
router.beforeEach((to, from, next) => {
	document.title = `${to.meta.title} | ${Vue.prototype.$metaTitle}`
	window.scroll(0, 0)
	next()
})
export default router
