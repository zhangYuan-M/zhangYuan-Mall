<template>
  <div class="detail">
    <!-- {{$route.params.id}} -->
    <detail-nav-bar @titleClick="titleClick" :finalIndex="changeIndex" /><!-- 导航条-->
    <scroll class="scroll" ref="scroll" @position="position">
      <detail-carousel :top-images="topImages" /><!-- 轮播图 -->
      <detail-base-info :goods-info-base="goodsInfoBase" /><!-- 商品基本数据-->
      <detail-shop-info :shop="shop" /><!-- 商家数据-->
      <detail-params-info
        :item-params="itemParams"
        ref="params"
        @showMoreClick="showMoreClick"
      /><!-- 商品参数-->
      <detail-goods-info :goods-info="detailInfo" @imgLoadOver="imgLoadOver" /><!-- 商品图片数据 -->
      <detail-common-info :comment-info="commentInfo" ref="comment" /><!-- 评论数据-->
      <detail-recommend-info :recommend-info="recommendInfo" ref="recommend" /><!-- 推荐图片数据-->
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop" /><!-- 回到顶部 -->
    <detail-bottom-bar class="b-bar" @addToCart="addToCart" /><!-- 底部导航条-->
  </div>
</template>

<script>
import Scroll from '../../components/common/scroll/Scroll.vue'

import DetailNavBar from './childDetail/DetailNavBar.vue'
import DetailCarousel from './childDetail/DetailCarousel.vue'
import DetailBaseInfo from './childDetail/DetailBaseInfo.vue'
import DetailShopInfo from './childDetail/DetailShopInfo.vue'
import DetailParamsInfo from './childDetail/DetailParamsInfo.vue'
import DetailGoodsInfo from './childDetail/DetailGoodsInfo.vue'
import DetailCommonInfo from './childDetail/DetailCommonInfo.vue'
import DetailRecommendInfo from './childDetail/DetailRecommendInfo.vue'
import DetailBottomBar from './childDetail/DetailBottomBar.vue'

import { getDetailData, GoodsInfoBase, Shop, getRecommendData } from '../../network/detail.js'
import { debounce } from '../../common/tool.js'
import { mapActions } from 'vuex'
import { imageListenrArray, backTop } from '../../common/mixins.js'

export default {
  name: 'Detail',
  data() {
    return {
      topImages: [], // 1.轮播图数据  DetailCarousel
      goodsInfoBase: {}, // 2, 商品基本数据,  DetailBaseInfo
      shop: {}, // 3, 商家的数据,  DetailShopInfo
      detailInfo: {}, // 4, 商品图片数据, DetailGoodsInfo
      itemParams: {}, // 5, 商品参数数据， DetailParamsInfo
      commentInfo: {}, // 6, 评论数据, DetailCommonInfo
      recommendInfo: [], // 7, 推荐图片数据， DetailRecommendInfo
      offsetTop: [], // 组件的高度
      changeIndex: 0, // 记录当前的滚动的位置，
      moreOffsetTop: 0 // 点击查看更多，添加的高度
    }
  },
  components: {
    getDetailData,
    DetailCarousel,
    DetailNavBar,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamsInfo,
    DetailCommonInfo,
    DetailRecommendInfo,
    DetailBottomBar
  },
  created() {
    getDetailData(this.$route.params.id).then(res => {
      const data = res.result
      // 1, 获取轮播图数据，直接
      this.topImages = data.itemInfo.topImages
      // 2, 商品基本数据，对象获取Class
      this.goodsInfoBase = new GoodsInfoBase(data.itemInfo, data.columns, data.shopInfo.services)
      // 3. 商家信息的描述数据
      this.shop = new Shop(data.shopInfo)
      // 4. 商品图片数据, 没有封装一个类
      this.detailInfo = data.detailInfo
      // 5.商品参数信息
      this.itemParams = data.itemParams
      // 6. 取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
      // 7, 获取推荐列表数据，数组
      getRecommendData().then(res => {
        this.recommendInfo = res.data.list
      })
    })
  },
  mixins: [imageListenrArray, backTop],
  methods: {
    ...mapActions(['addToCartInfo']),
    // 1,商品图片数据加载完毕，接收子组件的图片加载完毕事件,只会执行一次
    imgLoadOver() {
      this.$refs.scroll.refresh()
      // 1, 获取高度的数组, 在图片加载完毕后获取
      this.getTop()
    },
    // 2，获取高度数组
    getTop() {
      setTimeout(() => {
        // ？？？观察者模式
        this.offsetTop.push(0)
        this.offsetTop.push(this.$refs.params.$el.offsetTop)
        this.offsetTop.push(this.$refs.comment.$el.offsetTop)
        this.offsetTop.push(this.$refs.recommend.$el.offsetTop)
      }, 300)
    },
    // 4. 获取导航点击的索引，子组件DetailNavBar
    titleClick(index) {
      if (index === 0) {
        this.$refs.scroll.scrollTo(0, 0, 300)
      } else if (index === 1) {
        this.$refs.scroll.scrollTo(0, -this.offsetTop[1] + 53, 300)
      } else {
        this.$refs.scroll.scrollTo(0, -this.offsetTop[index] - this.moreOffsetTop, 300)
      }
      this.inedx = index
    },
    // 5, 监听高度SCroll组件
    position(position) {
      this.backToTop_(position) // 混入

      if (-position.y > 0 && -position.y <= this.offsetTop[1] + 55) {
        this.changeIndex = 0
      }
      if (
        -position.y >= this.offsetTop[1] - 55 &&
        -position.y < this.offsetTop[2] + this.moreOffsetTop
      ) {
        this.changeIndex = 1
      }
      if (
        -position.y >= this.offsetTop[2] + this.moreOffsetTop &&
        -position.y < this.offsetTop[3] + this.moreOffsetTop
      ) {
        this.changeIndex = 2
      }
      if (-position.y >= this.offsetTop[3] + this.moreOffsetTop) {
        this.changeIndex = 3
      }
    },
    // 6, 点击查看更多，更新界面
    showMoreClick(value) {
      this.moreOffsetTop = value
    },
    // 8, 接收点击加入购物车事件
    addToCart() {
      // 获取要添加到购物车的所有数据
      let product = {}
      product.image = this.topImages[0]
      product.nowPrice = this.goodsInfoBase.lowNowPrice
      product.desc = this.goodsInfoBase.desc
      product.title = this.goodsInfoBase.title
      product.iid = this.$route.params.id

      // this.$store.dispatch('addToCartInfo', product).then(res => {
      // 	this.$toast.show(res, 2000)
      // })
      this.addToCartInfo(product).then(res => {
        this.$toast.show(res, 2000)
      })
    }
  }
}
</script>

<style scoped="scoped">
.detail {
  width: 100%;
  height: 100vh;
  position: absolute;
  z-index: 5;
  background-color: white;
}

.scroll {
  height: calc(100% - 44px - 58px);
  overflow: hidden;
}
</style>
