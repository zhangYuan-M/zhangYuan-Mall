<template>
	<div class="recommend" v-if="Object.keys(recommendInfo).length !== 0">
		<goods-list :goods="recommendInfo"></goods-list>
	</div>
</template>

<script>
	import GoodsList from'../../../components/content/goodList/GoodList.vue'
	
	export default {
		name: 'DetailRecommendInfo',
		props: {
			recommendInfo: {
				type: Array,
				default() {
					return []
				}
			}
		},
		components: {
			GoodsList
		}
	}
</script>

<style scoped="scoped">
</style>
