<template>
	<div id="search">
		<input placeholder="Recherche" v-model="search">
		<div v-if="characters.length">
			<Character v-for="(character, key) in characters" :key="key" :character="character" />
			<Pagination :current-page="currentPage" :page-count="pageCount" @set-current-page="setCurrentPage">
				<template #previous>
					Précédent
				</template>
				<template #next>
					Suivant
				</template>
			</Pagination>
		</div>
		<div v-else>
			Aucun personnage n'a été trouvé
		</div>
	</div>
</template>
<script>
import Character from './search/character'
import Pagination from '@/components/pagination'
export default {
	components : {
		Character,
		Pagination
	},
	data() {
		return {
			characters    : [],
			currentPage   : 0,
			pageCount     : 0,
			lengthPerPage : 20,
			search        : ''
		}
	},
	created() {
		const query = this.$route.query
		if(query.page || query.search) {
			if(query.search) {
				this.search = query.search
			}
			if(query.page) {
				this.currentPage = parseInt(query.page)
			}
		} else {
			this.loadCharacters()
		}
	},
	methods : {
		async loadCharacters() {
			await this.axios
				.get(`https://rickandmortyapi.com/api/character/?page=${this.currentPage}&name=${this.search}`)
				.then((res) => {
					this.pageCount = res.data.info.pages
					this.characters = res.data.results
				})
				.catch((err) => {
					if(err.response.status == 404) {
						this.characters = []
					}
				})
		},
		setCurrentPage(page) {
			this.currentPage = page
		},
	},
	watch : {
		search(search) {
			this.currentPage = 1
			this.loadCharacters()
			const query = this.$route.query
			if(query.search != search) {
				this.$router.replace({
					query : {
						...query,
						...{ search: search }
					}
				})
			}
		},
		currentPage(page) {
			this.loadCharacters()
			const query= this.$route.query
			if(query.page != page) {
				this.$router.replace({
					query : {
						...query,
						...{ page: page }
					}
				})
			}
		}
	}
}
</script>