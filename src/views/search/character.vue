<template>
	<div class="character" @click="goToCharacter(character.id)">
		<img :src="character.image">
		<div class="name">
			{{ character.name }}
		</div>
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
	background-color: lighten($primary, 15%);
	color: $secondary;
	border: 3px solid $primary;
	&:hover {
		background-color: $secondary;
		color: $thirdary;
		border-color: $secondary;
	}
}
.character img {
	border-top-left-radius: $border-radius;
	width: 100%;
	height: 100%;
	border-top-right-radius: $border-radius;
}
.character .name {
	display: flex;
	align-items: center;
	line-height: 13px;
	padding: 0.25rem 0.5rem;
	min-height: 32px;
}
</style>