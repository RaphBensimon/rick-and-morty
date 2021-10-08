<template>
	<div class="spinner">
		<div class="spin" :class="`${variant} ${size}`" />
	</div>
</template>
<script>
export default {
	props : {
		variant : {
			type     : String,
			required : false,
			default  : 'primary'
		},
		size : {
			type     : String,
			required : false,
			default  : 'xs'
		}
	}
}
</script>
<style lang="scss" scoped>
.spin {
	display: flex;
	border-radius: 50%;
	animation: spinner-border 0.75s linear infinite;
}
.spin.xs {
	width: 1.5rem;
	height: 1.5rem;
	border: 0.25em solid transparent;
}
.spin.lg {
	width: 2.5rem;
	height: 2.5rem;
	border: 0.4em solid transparent;
}
.spin.white {
	border-color: rgba($white, 0.25);
	border-bottom-color: $white;
}
.spin.primary {
	border-color: rgba($primary, 0.25);
	border-bottom-color: $primary;
}
.spin.secondary {
	border-color: rgba($secondary, 0.25);
	border-bottom-color: $secondary;
}

@keyframes spinner-border {
	from {
		transform: rotate(0);
	}
	to {
		transform: rotate(360deg);
	}
}
</style>