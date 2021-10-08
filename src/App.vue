<template>
	<div id="app">
		<main>
			<router-view />
		</main>
	</div>
</template>
<style lang="scss" scoped>
#app {
	background: $primary;
}
main {
	padding: 1rem 0;
	max-width: 1200px;
	width: 95%;
	position: relative;
	left: 50%;
	height: 100%;
	transform: translateX(-50%);
}
</style>