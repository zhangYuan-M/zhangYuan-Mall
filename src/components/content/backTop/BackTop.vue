<template>
	<div class="back-top">
		<img src="../../../assets/img/common/top.png" @click="backClick"/>
	</div>
</template>

<script>
	export default {
		name: 'BackTop',
		methods: {
			backClick() {
			}
		}
	}
</script>

<style>
	.back-top{
		position: fixed;
		right: 8px;
		bottom: 55px;
	}
	
	.back-top img{
		width: 43px;
		height: 40px;
	}
</style>
