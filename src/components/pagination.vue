<template>
	<div class="pagination">
		<div class="page" v-if="currentPage > 1"
			@click="setCurrentPage(currentPage - 1)">
			<slot name="previous" />
		</div>
		<div class="page" v-if="currentPage > 2"
			@click="setCurrentPage(1)">
			1
		</div>
		<div class="page three-point" v-if="currentPage > 2">
			...
		</div>
		<div class="page" v-for="index in pages" :key="index" @click="setCurrentPage(index)"
			:class="{'current-page': currentPage === index}">
			{{ index }}
		</div>
		<div class="page three-point" v-if="currentPage + 1 < pageCount">
			...
		</div>
		<div class="page" v-if="currentPage + 1 < pageCount"
			@click="setCurrentPage(pageCount)">
			{{ pageCount }}
		</div>
		<div class="page" v-if="currentPage < pageCount"
			@click="setCurrentPage(currentPage + 1)">
			<slot name="next" />
		</div>
	</div>
</template>
<script>
export default {
	emits : [
		'set-current-page'
	],
	props : {
		currentPage : {
			required : true,
			type     : Number
		},
		pageCount : {
			required : true,
			type     : Number
		}
	},
	computed : {
		pages() {
			const range = []
			const length = Math.min(this.currentPage + 1, this.pageCount)
			for (let i = this.currentPage - 1; i <= length; i++) {
				if(i > 0)
					range.push(i)
			}
			return range
		},
	},
	methods : {
		setCurrentPage(index) {
			this.$emit('set-current-page', index)
			window.scroll(0, 0)
		}
	}
}
</script>
<style lang="scss" scoped>
.pagination {
	display: flex;
}
.page {
	margin: 0 3px;
	padding: 10px;
	cursor: pointer;
	border: 1px solid $grey;
	border-radius: $border-radius;
}
.current-page,
.page:not(.three-point):hover {
}
.three-point {
}

</style>