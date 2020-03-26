<template>
	<div class="datail-nav-bar">
		<nav-bar>
			<div slot="left">
				<img src="../../../assets/img/common/back.svg" class="img" @click="imgClick" />
			</div>
			<div slot="center" class="titles">
				<div v-for="(item, index) in titles" class="aaaaa" @click="titleClick(index)" :class="{red: currentIndex === index }"
				 :key="index">{{item}}</div>
			</div>
		</nav-bar>
	</div>
</template>

<script>
	import NavBar from '../../../components/common/navbar/NavBar.vue'
	export default {
		name: 'DetailNavBar',
		components: {
			NavBar
		},
		props: {
			finalIndex: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				titles: ['详情', '参数', '评论', '推荐'],
				currentIndex: 0  // 当前点击的索引
			}
		},
		methods: {
			imgClick() {
				this.$router.replace('/home')
			},
			titleClick(index) {
				this.$emit('titleClick', index)
				this.currentIndex = index
			}
		},
		watch: {
			finalIndex(value) {
				this.currentIndex = value
			}
		}
	}
</script>

<style scoped="scoped">
	.datail-nav-bar {
		background: whitesmoke;
		color: black;
	}

	.titles {
		display: flex;
	}

	.red {
		color: deeppink
	}

	.img {
		margin-top: 10px;
		margin-left: 20px;
	}

	.aaaaa {
		font-size: 16px;
		flex: 1;
	}
</style>
