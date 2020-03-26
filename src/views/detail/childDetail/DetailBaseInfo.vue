<template>
	<div class="detail-base-info" v-if="Object.keys(goodsInfoBase).length !== 0">
		<div class="top-part">
			<div class="goods-title">{{goodsInfoBase.title}}</div>
			<div class="nowPrice">￥{{goodsInfoBase.lowNowPrice}}</div>
			<div class="lowPrice">{{goodsInfoBase.oldPrice}}</div>
			<div class="discountDesc">{{goodsInfoBase.discountDesc}}</div>
		</div>
		<div class="info-other">
			<span>{{goodsInfoBase.columns[0]}}</span>
			<span>{{goodsInfoBase.columns[1]}}</span>
			<span>{{goodsInfoBase.services[goodsInfoBase.services.length-1].name}}</span>
		</div>
		<div class="info-service">
			<span class="info-service-item" v-for="index in goodsInfoBase.services.length-1" :key="index">
				<img :src="goodsInfoBase.services[index-1].icon">
				<span>{{goodsInfoBase.services[index-1].name}}</span>
			</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'DetailBaseInfo',
		props: {
			goodsInfoBase: Object
		}
	}
</script>

<style scoped="scoped">
	.detail-base-info {
		padding: 13px;
		padding-left: 5px;
		padding-bottom: 0px;
		border-bottom: 7px solid rgba(100, 100, 100, .1);
	}

	.goods-title {
		text-overflow: ellipsis;
		color: black;
		margin-bottom: 10px;
	}

	.center-part {
		margin-top: 15px;
		line-height: 30px;
		display: flex;
		font-size: 13px;
		border-bottom: 1px solid rgba(100, 100, 100, .1);
		justify-content: space-between;
		color: darkgrey;
	}

	.nowPrice {
		color: deeppink;
		font-size: 25px;
		display: inline-block;
	}

	.lowPrice {
		font-size: 14px;
		color: gray;
		margin-left: 10px;
		display: inline-block;
		text-decoration: line-through;
	}

	.discountDesc {
		display: inline-block;
		color: hotpink;
		font-size: 13px;
		position: relative;
		top: -6px;
	}

	.info-other {
		margin-top: 10px;
		line-height: 30px;
		display: flex;
		font-size: 13px;
		border-bottom: 1px solid rgba(100, 100, 100, .1);
		justify-content: space-between;
	}

	.info-service {
		display: flex;
		justify-content: space-between;
		line-height: 50px;
	}

	.info-service-item img {
		width: 14px;
		height: 14px;
		position: relative;
		top: 2px;
	}

	.info-service-item span {
		font-size: 13px;
		color: black;
	}
</style>
