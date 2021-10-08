<template>
	<div id="app">
		<header>
			<router-link to="/">
				<img src="@/assets/rick-and-morty.png">
			</router-link>
		</header>
		<main>
			<router-view />
		</main>
	</div>
</template>
<style lang="scss" scoped>
#app {
	background: $primary;
	display: flex;
	flex-direction: column;
	align-items: center;
}
#app > * {
	max-width: 1200px;
}
header {
	margin: 1rem 0;
	display: flex;
	justify-content: center;
}
header img {
	width: 100%;
	max-width: 500px;
}
main {
	padding: 1rem 0;
	max-width: 1200px;
	width: 95%;
}
</style>