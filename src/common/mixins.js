/*
 * Home，Category 抽取混入
 */
import { debounce } from './tool.js'

import BackTop from 'components/content/backTop/BackTop.vue'

// 1.监听图片加载刷新界面
export const imageListenrArray = {
  data() {
    return {
      imageLoadListenr: null
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 100)
    this.imageLoadListenr = () => {
      refresh()
    }
    this.$bus.$on('goodsItemImgLoad', this.imageLoadListenr)
  },
  deactivated() {
    this.$bus.$off('goodsItemImgLoad', this.imageLoadListenr)
  }
}

// 2.点击回到顶部
export const backTop = {
  data() {
    return {
      isShowBackTop: false // 是否滚动到顶部
    }
  },
  components: {
    BackTop
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 400)
    },
    // 3, 根据scroll子组件传递的事件，设置bool变量，是否回到顶部
    backToTop_(position) {
      this.isShowBackTop = -position.y > 1000
    }
  }
}

// 3.TabControl组件，点击选项卡滚动到固定的位置
export const fixePosition = {
  data() {
    return {
      currentIndex: 0, //选项卡的索引
      tabPositionArray: [0, 0, 0], // 记录三个选项卡的划动的位置
      isShowGoodsList: true, // 切换的间隙，显示空白
      isShowTabControl: false // 标记什么时候记录TabControl位置
    }
  },
  methods: {
    savePosition_() {
      // 实时保存当前的位置
      if (this.isShowTabControl) {
        this.tabPositionArray[this.currentIndex] = this.$refs.scroll.saveY() //position.y;
      }
    },
    initializePosition_() {
      // 初始化位置
      if (!this.isShowTabControl) {
        this.tabPositionArray[0] = this.tabPositionArray[1] = this.tabPositionArray[2] = -this
          .tabOffsetTop
      }
    }
  },
  watch: {
    currentIndex(value) {
      this.$refs.scroll.refresh()
      this.isShowGoodsList = false
      setTimeout(() => {
        this.$refs.scroll.scrollTo(0, this.tabPositionArray[value], 0)
        this.isShowGoodsList = true
      }, 200)
    }
  }
}
