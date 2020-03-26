<template>
  <div id="home">
    <nav-bar class="home-navbar">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="titles"
      @tabClick="tabClick"
      class="tab-control-one"
      v-show="isShowTabControl"
      ref="tabControl1"
    />
    <scroll class="scroll" ref="scroll" @position="backToTop" @pullingUp="pullingUp">
      <home-swiper :banners="banner" @HomeCarouselImagLoad="HomeCarouselImagLoad" />
      <home-recommend :recommends="recommend" />
      <home-feature />
      <tab-control :titles="titles" @tabClick="tabClick" ref="tabControl2" />
      <goods-list :goods="goodsType" :class="{ toggle: !isShowGoodsList }" />
    </scroll>
    <back-top @click.native="backClick" />
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import Scroll from 'components/common/scroll/Scroll.vue'
import TabControl from '../../components/content/tabControl/TabControl.vue'
import GoodsList from '../../components/content/goodList/GoodList.vue'

import HomeSwiper from './childHome/HomeSwiper.vue'
import HomeRecommend from './childHome/HomeRecommend.vue'
import HomeFeature from './childHome/HomeFeature.vue'

import { getHomeAllData, getHomeData } from '../../network/home.js'
import { imageListenrArray, backTop, fixePosition } from 'common/mixins.js'
export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend,
    HomeFeature,
    Scroll,
    TabControl,
    GoodsList
  },
  data() {
    return {
      banner: [], // 1.轮播图数据
      recommend: [], // 2. 推荐图片数据
      titles: ['流行', '最新', '推荐'], // 3.选项卡数据
      goods: {
        pop: {
          page: 0,
          list: []
        },
        new: {
          page: 0,
          list: []
        },
        sell: {
          page: 0,
          list: []
        }
      },
      currentType: 'pop',
      tabOffsetTop: 0, // 下方的 TabControl 距离顶部
      finalPositionY: 0 // 离开前的位置
    }
  },
  mixins: [imageListenrArray, backTop, fixePosition],
  created() {
    this.getHomeAllData()
    this.getHomeData('pop') // 初始化工作
    this.getHomeData('new')
    this.getHomeData('sell')
  },
  activated() {
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0, this.finalPositionY, 0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    this.finalPositionY = this.$refs.scroll.saveY()
  },
  methods: {
    /*
     *  封装网络请求的代码，不在生命周期函数中处理逻辑
     */
    // 1, 获取其他数据
    getHomeAllData() {
      getHomeAllData().then(res => {
        this.banner = res.data.banner.list
        this.recommend = res.data.recommend.list
      })
    },

    // 2, 获取商品列表数据，每次调用，记录加一
    getHomeData(type) {
      // 手动标记数据的记录, 每次调用，记录加一
      const page = this.goods[type].page + 1
      getHomeData(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
      })
    },

    /*
     * 封装方法
     */
    // 1, 根据选项卡子组件传递的index 变化当前的currentType
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          this.currentIndex = 0
          break
        case 1:
          this.currentType = 'new'
          this.currentIndex = 1
          break
        case 2:
          this.currentType = 'sell'
          this.currentIndex = 2
          break
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },

    // 3, 根据scroll子组件传递的事件，设置bool变量，是否回到顶部
    backToTop(position) {
      this.backToTop_(position) // 混入
      this.isShowTabControl = -position.y > this.tabOffsetTop
      this.savePosition_() //mixins
    },

    // 4, 根据scroll子组件传递的事件，再次请求数据
    pullingUp() {
      this.getHomeData(this.currentType)
      this.$refs.scroll.finishPullUp() // scroll组件拉到底部，需调用一次方法，才能继续监听
    },

    // 5, 根据HomeCarousel 子组件传递事件
    HomeCarouselImagLoad() {
      // 计算高度
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      this.initializePosition_() //mixins  初始化位置
    }
  },
  computed: {
    // 1, 商品图片列表展示的数据
    goodsType() {
      return this.goods[this.currentType].list
    }
  }
}
</script>

<style>
#home {
  height: 100vh;
  /* position: relative */
}
.home-navbar {
  background-color: #ff8198;
  color: white;

  position: fixed;
  left: 0;
  top: 0;
  right: 0;
}
.scroll {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}
.tab-control-one {
  position: relative;
  top: 0;
  background-color: white;
  z-index: 9;
}
.toggle {
  visibility: hidden;
}
</style>
