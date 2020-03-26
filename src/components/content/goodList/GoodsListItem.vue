<template>
	<div class="goods" @click="itemClick" v-if="Object.keys(goodsItem).length !== 0" :key="imgURL">
			<img :src="imgURL" @load="goodsItemImgLoad" />
			<div class="goods-info">
				<p class="goods-title">{{goodsItem.title}}</p>
				<span class="price">{{goodsItem.price}}</span>
				<span class="collect">{{goodsItem.cfav}}</span>
			</div>
	</div>
</template>

<script>
	export default {
		name: 'GoodsListItem',
		props: {
			goodsItem: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		methods: {
			// 1, 发送事件总线，监听图片加载完毕
			goodsItemImgLoad() {
				this.$bus.$emit('goodsItemImgLoad')
			},
			
			// 2, 路由跳转
			itemClick() {
				// 1, 动态路由, 携带参数
				this.$router.push('/detail/'+this.goodsItem.iid)
			}
		},
		computed: {
			imgURL() {
				if(this.goodsItem.image) {
					return this.goodsItem.image
				}
				return this.goodsItem.img || this.goodsItem.show.img 
			}
		}
	}
</script>

<style>
	.goods {
		padding-bottom: 40px;
		position: relative;
		/* display: inline; */
		width: 48%;
	}

	.goods img {
		width: 100%;
		border-radius: 5px;
	}

	.goods-info {
		font-size: 12px;
		position: absolute;
		bottom: 5px;
		left: 0;
		right: 0;
		overflow: hidden;
		text-align: center;
	}

	.goods-info p {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin-bottom: 3px;
	}

	.goods-info .price {
		/* color: var(--color-high-text); */
		color: pink;
		margin-right: 20px;
	}

	.goods-info .collect {
		position: relative;
	}

	.goods-info .collect::before {
		content: '';
		position: absolute;
		left: -15px;
		top: 0;
		width: 14px;
		height: 14px;
		background: url("../../../assets/img/common/collect.svg") 0 0/14px 14px;
	}
</style>
