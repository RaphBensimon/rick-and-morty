<template>
	<div id="search">
		<input placeholder="Search" v-model="search" type="text">
		<div id="status">
			<input id="alive" v-model="status" type="radio" value="alive">
			<label for="alive">Alive</label>
			<input id="dead" v-model="status" type="radio" value="dead">
			<label for="dead">Dead</label>
			<input id="unknown" v-model="status" type="radio" value="unknown">
			<label for="unknown">Unknown</label>
			<input id="all" v-model="status" type="radio" value="all">
			<label for="all">All</label>
		</div>
		<spinner v-if="loading" id="spinner" size="lg" variant="secondary" />
		<div v-else>
			<div v-if="characters.length">
				<div class="characters-list">
					<Character v-for="(character, key) in characters" :key="key" :character="character" />
				</div>
				<Pagination :current-page="currentPage" :page-count="pageCount" @set-current-page="setCurrentPage"
					id="pagination">
					<template #previous>
						Previous
					</template>
					<template #next>
						Next
					</template>
				</Pagination>
			</div>
			<p v-else>
				Any character found
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
			currentPage   : 1,
			pageCount     : 0,
			lengthPerPage : 20,
			search        : '',
			loading       : false,
			status        : 'all'
		}
	},
	created() {
		this.loadCharacters()
	},
	methods : {
		async loadCharacters() {
			this.loading = true
			const param = {
				currentPage : this.currentPage,
				search      : this.search,
				status      : this.status
			}
			await this.$store.dispatch('characters/load', param)
				.then((res) => {
					this.pageCount = res.data.info.pages
					this.characters = res.data.results
					this.checkIfAllImageIsloaded()
				})
				.catch(() => {
					this.characters = []
					this.loading = false
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
		search() {
			this.currentPage = 1
			this.loadCharacters()
		},
		currentPage() {
			this.loadCharacters()
		},
		status() {
			this.loadCharacters()
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
#status {
	margin-top: 1rem;
}
</style>