import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import './styles/_import.scss'
import { Spinner, Icon } from './components/'
Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.component('spinner', Spinner)
Vue.component('icon', Icon)
new Vue({
	router,
	store,
	render : function (h) {
		return h(App)
	}
}).$mount('#app')
