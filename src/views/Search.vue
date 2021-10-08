<template>
	<div id="search">
		<input placeholder="Recherche" v-model="search" type="text">
		<spinner v-if="loading" id="spinner" size="lg" variant="secondary" />
		<div v-else>
			<div v-if="characters.length">
				<div class="characters-list">
					<Character v-for="(character, key) in characters" :key="key" :character="character" />
				</div>
				<Pagination :current-page="currentPage" :page-count="pageCount" @set-current-page="setCurrentPage"
					id="pagination">
					<template #previous>
						Précédent
					</template>
					<template #next>
						Suivant
					</template>
				</Pagination>
			</div>
			<p v-else>
				Aucun personnage n'a été trouvé
			</p>
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
			search        : '',
			loading       : false
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
			this.loading = true
			await this.axios
				.get(`https://rickandmortyapi.com/api/character/?page=${this.currentPage}&name=${this.search}`)
				.then((res) => {
					this.pageCount = res.data.info.pages
					this.characters = res.data.results
					this.checkIfAllImageIsloaded()
				})
				.catch((err) => {
					if(err.response.status == 404) {
						this.characters = []
						this.loading = false
					}
				})
		},
		setCurrentPage(page) {
			this.currentPage = page
		},
		checkIfAllImageIsloaded() {
			var imagesLoadedLength = 0
			this.characters.forEach((e) => {
				const img = new Image()
				img.src = e.image
				img.onload = () => {
					imagesLoadedLength++
					if(imagesLoadedLength == this.characters.length)
						this.loading = false
				}
			})
		}
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
<style lang="scss" scoped>
#pagination {
	position: relative;
	left: 50%;
	transform: translateX(-50%);
}
.characters-list {
	display: flex;
	flex-wrap: wrap;
	margin: 1rem -0.5%;
}
.characters-list > * {
	width: 15.667%;
	margin: 0.5%;
}

@media screen and (max-width: 1000px) {
	.characters-list > * {
		width: 19%;
	}
}

@media screen and (max-width: 1000px) {
	.characters-list > * {
		width: 24%;
	}
}

@media screen and (max-width: 750px) {
	.characters-list > * {
		width: 32.334%;
	}
}

@media screen and (max-width: 500px) {
	.characters-list > * {
		width: 49%;
	}
}
#spinner {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}
</style>