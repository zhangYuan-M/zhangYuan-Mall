<template>
	<div class="home-carousel">
		<swiper>
			<swiper-item v-for="(item, index) in banners" :key="index">
				<a :href="item.link">
					<img :src="item.image" alt="" @load="HomeCarouselImgLoad" >
				</a>
			</swiper-item>
		</swiper>
	</div>
</template>

<script>
	import {
		Swiper,
		SwiperItem
	} from '../../../components/common/swiper/index.js'

	export default {
		name: 'HomeSwiper',
		components: {
			Swiper,
			SwiperItem,
		},
		data() {
			return {
				isLoadOneImg: false  // 是否初始化一张图片就好
			}
		},
		props: {
			banners: {
				type: Array,
				default () {
					return []
				}
			}
		},
		methods: {
			HomeCarouselImgLoad() {
				if(!this.isLoadOneImg) {
					this.$emit('HomeCarouselImagLoad')
					this.isLoadOneImg = true
				}
			}
		}
	}
</script>

<style>
</style>