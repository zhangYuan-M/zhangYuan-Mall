<template>
  <div id="category">
    <category-nav-bar />
    <!-- 顶部导航条 -->
    <category-left-side :left-side="leftSide" @itemClick="itemClick" class="left" />
    <!-- 左侧的选择框 -->
    <tab-control
      :titles="titles"
      @tabClick="tabClick"
      ref="tab1"
      :class="{ fix: isShowTabControl }"
      v-show="isShowTabControl"
    />
    <scroll class="scroll-content" ref="scroll" @position="position">
      <!-- 右侧上部的图片列表 -->
      <category-right-side :goods-img="goods" @imgLoadOver="imgLoadOver" />
      <!-- 右下侧的选项卡 -->
      <tab-control :titles="titles" @tabClick="tabClick" ref="tab2" v-show="!isShowTabControl" />
      <!-- 右下侧的商品展示 -->
      <category-goods-info :category-detail="goodsBottom" :class="{ toggle: !isShowGoodsList }" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import { getCategory, getCategoryMaitKey, getCategoryMiniWallkey } from '../../network/category.js'
import { debounce } from '../../common/tool.js'
import Scroll from '../../components/common/scroll/Scroll.vue'
import TabControl from '../../components/content/tabControl/TabControl.vue'

import CategoryNavBar from './childCategory/CategoryNavBar.vue'
import CategoryLeftSide from './childCategory/CategoryLeftSide.vue'
import CategoryRightSide from './childCategory/CategoryRightSide.vue'
import CategoryGoodsInfo from './childCategory/CategoryGoodsInfo.vue'
import { backTop, imageListenrArray, fixePosition } from '../../common/mixins.js'

export default {
  name: 'Category',
  components: {
    CategoryNavBar,
    CategoryLeftSide,
    CategoryRightSide,
    Scroll,
    TabControl,
    CategoryGoodsInfo
  },
  data() {
    return {
      leftSide: [], //左侧导航数据
      maitKeyList: [], // 右侧图片数据索引
      maitKeyListAll: [], // 右侧图片全部数据
      leftCurrentIndex: 0, //默认点击的是左侧第一个选项卡
      miniWallkeyList: [], //右下侧数据索引
      miniListData: [[], [], []],
      resultList: null, // 右下侧的数据
      tabOffsetTop: 0, //选项卡的高度
      positionArray: [] // 点击左侧选项卡，滚动的不同位置
    }
  },
  created() {
    this._getCategoryMaitKey() // 请求数据
  },
  mixins: [backTop, imageListenrArray, fixePosition],
  methods: {
    /*
     * 封装网络请求：
     */
    // 1.获取数据
    _getCategoryMaitKey() {
      getCategory().then(res => {
        this.leftSide = res.data.category.list.map(item => item.title)
        this.maitKeyList = res.data.category.list.map(item => item.maitKey)
        this.miniWallkeyList = res.data.category.list.map(item => item.miniWallkey)
        let promiseArray = []
        let miniPromiseArray = [[], [], []]
        this.maitKeyList.map(item => {
          promiseArray.push(getCategoryMaitKey(item))
        })
        Promise.all(promiseArray).then(res => {
          this.maitKeyListAll = res
        })
        for (let i = 0; i < this.leftSide.length; i++) {
          this.positionArray.push(0)
        }
        this.getGoodsData(this.leftCurrentIndex) // 请求右下侧的初始化数据
        setTimeout(() => {
          this.$refs.scroll.refresh()
        }, 100)

        // positionArray 初始化数据
        const length = this.leftSide.length
        for (let i = 0; i < length; i++) {
          this.positionArray.push(0)
        }
      })
    },
    // 2.请求右下侧数据
    getGoodsData: function(leftIndex) {
      let that = this
      let arr = []
      arr.push(getCategoryMiniWallkey(this.miniWallkeyList[leftIndex], 'pop'))
      arr.push(getCategoryMiniWallkey(this.miniWallkeyList[leftIndex], 'new'))
      arr.push(getCategoryMiniWallkey(this.miniWallkeyList[leftIndex], 'sell'))
      Promise.all(arr).then(res => {
        that.resultList = res
      })
    },
    /*
     * 封装组件方法
     */
    // 1.CategoryLeftSide 组件，左侧选项卡被点击
    itemClick(index) {
      this.getGoodsData(index)
      this.leftCurrentIndex = index
      this.$refs.scroll.scrollTo(0, this.positionArray[index], 0)
      this.isShowTabControl = false // 重置？？？
    },

    // 2，TabControl 子组件，点击切换leftCurrentIndex
    tabClick(index) {
      this.currentIndex = index
      this.$refs.tab1.currentIndex = this.$refs.tab2.currentIndex = index
    },

    // 3, CategoryRightSide子组件，右上侧的图片加载完毕
    imgLoadOver() {
      this.tabOffsetTop = this.$refs.tab2.$el.offsetTop
      this.initializePosition_() // mixins 初始化位置
    },

    // 4.Scroll组件，监听位置的变化
    position(position) {
      this.backToTop_(position)
      this.isShowTabControl = -position.y > this.tabOffsetTop
      this.positionArray[this.leftCurrentIndex] = position.y
      // 初始化高度
      this.savePosition_() //mixins   实时保存当前的位置
    }
  },
  computed: {
    goods() {
      return this.maitKeyListAll[this.leftCurrentIndex]
    },
    titles() {
      return ['流行', '最新', '推荐']
    },
    goodsBottom() {
      if (this.miniWallkeyList.length !== 0) {
        if (this.resultList) {
          return JSON.parse(JSON.stringify(this.resultList))[this.currentIndex]
        }
      }
    }
  }
}
</script>

<style scoped="scoped">
#category {
  height: 100vh;
}

.scroll-content {
  height: calc(100% - 44px - 49px);
  overflow: hidden;
  width: 75%;
  position: relative;
  right: 0px;
  top: 0px;
}

.fix {
  position: relative;
  z-index: 99;
}
.toggle {
  visibility: hidden;
}
</style>
