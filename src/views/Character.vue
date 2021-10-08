<template>
	<div>
		<spinner v-if="loading" variant="secondary" id="spinner" size="lg" />
		<div v-else>
			<button @click="$router.go(-1)">
				Return
			</button>
			<div id="character">
				<img :src="character.image">
				<div id="information">
					<h1>{{ character.name }}</h1>
					<div>
						{{ character.species }} ({{ character.status }})
					</div>
					<div class="location">
						<icon icon="location" />
						{{ character.location.name }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	created() {
		const id = this.$route.params['id']
		this.loadCharacter(id)
	},
	data() {
		return {
			character : {
				location : {}
			},
			loading : false
		}
	},
	methods : {
		async loadCharacter(id) {
			this.loading = true
			await this.axios.get(`https://rickandmortyapi.com/api/character/${id}`).then((res) => {
				this.character = res.data
				document.title = `${res.data.name} | ${this.$metaTitle}`
				this.loading = false
			})
		}
	}
}
</script>
<style lang="scss" scoped>
#character {
	margin-top: 1rem;
	display: flex;
	border-radius: $border-radius;
	border: 3px solid $secondary;
	width: fit-content;
}
#information {
	margin: 0 1rem;
}
img {
	width: 200px;
}
h1 {
	margin: 0.5rem 0;
}
.location {
	display: flex;
	align-items: flex-end;
}
#spinner {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}

@media screen and (max-width: 600px) {
	#character {
		flex-direction: column;
		width: fit-content;
		padding-bottom: 0.5rem;
	}
	img {
		width: 100%;
	}
}
</style>