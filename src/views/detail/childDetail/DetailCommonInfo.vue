<template>
	<div class="detail-common" v-if="Object.keys(commentInfo).length !== 0">
		<div class="top">
			<span class="top1">用户评价</span>
			<span class="top2">更多</span>
		</div>
		<div class="center">
			<img :src="commentInfo.user.avatar" />
			<span>{{commentInfo.user.uname}}</span>
		</div>
		<div class="bottom">
			<div class="common">{{commentInfo.content}}</div>
			<span class="time">{{commentInfo.created}}</span>
			<span class="time">{{commentInfo.style}}</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'DetailCommonInfo',
		props: {
			commentInfo: {
				type: Object,
				default() {
					return {} 
				}
			}
		}
	}
</script>

<style scoped="scoped">
	.detail-common{
		padding: 10px;
		padding-bottom: 25px;
		border-top: 5px solid #e6e6e6;
		border-bottom: 5px solid #e6e6e6;
	}
	.top{
		padding-top: 10px;
		padding-bottom: 10px;
		border-bottom: 1px solid #e2e2e2;
	}
	.top1{
		font-size: 18px;
		color: black;
	}
	.top2{
		position: relative;
		right: -240px;
		font-size: 14px;
	}
	.center img {
		height: 41px;
		border-radius: 50%;
	}
	.center{
		padding: 13px;
	}
	.center span {
		position: relative;
		top: -15px;
		left: 20px;
	}
	.time{
		color: darkgray;
		font-size: 0.8125rem;
	}
	.common{
		margin-bottom: 10px;
		font-size: 15px;
	}
</style>
