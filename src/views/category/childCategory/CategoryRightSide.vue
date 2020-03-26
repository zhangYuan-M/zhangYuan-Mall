<template>
	<div class="content">
		<div class="right-side" v-if="Object.keys(goodsImg).length !== 0">
			<grid-view :goods-list="goodsImg" @GridViewImgLoadOver="GridViewImgLoadOver"></grid-view>
		</div>
	</div>
</template>

<script>
	import GridView from '../../../components/content/gridView/GridView.vue'

	export default {
		name: 'CategoryRightSide',
		props: {
			goodsImg: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		components: {
			GridView
		},
		methods: {
			GridViewImgLoadOver() {
				this.$emit('imgLoadOver')
			}
		}
	}
</script>

<style scoped="scoped">
	.right-side {
		width: 100%;
	}
</style>
