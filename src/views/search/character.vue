<template>
	<div class="character">
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
	}
}
</script>