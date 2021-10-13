
import axios from 'axios'
const actions = {
	load(payload, param) {
		return axios.get(`https://rickandmortyapi.com/api/character/?page=${param.currentPage}&name=${param.search}`)
			.then((res) => {
				return res
			}).catch(err => {
				throw err.response
			})
	}
}
export default {
	namespaced : true,
	actions,
}