<template>
	<div class="character" @click="goToCharacter(character.id)">
		{{ character.name }}
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