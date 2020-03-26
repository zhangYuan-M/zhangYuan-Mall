<template>
	<div class="detail-Swiper" v-show="Object.keys(topImages)">
		<swiper>
			<swiper-item v-for="(item, index) in topImages" :key="index" class="detail-item">
				<img :src="item" class="img"/>
			</swiper-item>
		</swiper>
	</div>
</template>

<script>
	import {Swiper, SwiperItem} from '../../../components/common/swiper/index.js'
 	
	export default {
		name: 'DetailSwiper',
		props: {
			topImages: {
				type: Array,
				default() {
					return []
				}
			}
		},
		components: {
			Swiper,
			SwiperItem
		}
	}
</script>

<style scoped="scoped"> 
  .detail-item{
		height: 18.75rem;		
		overflow: hidden;
		text-align: center;
	}
</style>
