<template>
	<div id="app">
		<main>
			<router-view />
		</main>
	</div>
</template>
<style lang="scss" scoped>
main {
	max-width: 1200px;
	position: relative;
	left: 50%;
	height: 100%;
	transform: translateX(-50%);
}
</style>