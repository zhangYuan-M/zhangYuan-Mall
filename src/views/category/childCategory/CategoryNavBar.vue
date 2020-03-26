<template>
	<div class="nav-bar">
		<nav-bar>
			<div slot="center">
				<span>商品分类</span>
			</div>
		</nav-bar>
	</div>
</template>

<script>
	import NavBar from '../../../components/common/navbar/NavBar.vue'
	export default {
		name: 'CategoryNavBar',
		components: {
			NavBar
		}
	}
</script>

<style scoped="scoped">
	.nav-bar {
		height: 2.75rem;
		background-color: #ff8198;
		color: white;
	}
</style>
