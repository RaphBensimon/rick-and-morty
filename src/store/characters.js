
import axios from 'axios'
const actions = {
	load(payload, param) {
		if(param.status == 'all') param.status = ''
		return axios.get(`https://rickandmortyapi.com/api/character/?page=${param.currentPage}
		&name=${param.search}&status=${param.status}`)
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