<template>
	<div class="character" @click="goToCharacter(character.id)">
		<img :src="character.image">
		<span>{{ character.name }}</span>
	</div>
</template>
<script>
export default {
	props : {
		character : {
			required : true,
			type     : Object
		}
	},
	methods : {
		goToCharacter(id) {
			this.$router.push(`/character/${id}`)
		}
	}
}
</script>
<style lang="scss" scoped>
.character {
	border-radius: $border-radius;
	display: flex;
	flex-direction: column;
	box-shadow: rgba($black, 0.24) 0 3px 8px;
	cursor: pointer;
	transition: 0.15s;
	&:hover {
		filter: brightness(1.2);
	}
}
.character span {
	padding: 0.25rem 0.5rem;
}
</style>