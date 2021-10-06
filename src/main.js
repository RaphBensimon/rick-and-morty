import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import './styles/_import.scss'
import Spinner from './components/spinner'
Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.component('spinner', Spinner)
new Vue({
	router,
	store,
	render : function (h) {
		return h(App)
	}
}).$mount('#app')
