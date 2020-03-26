<template>
  <div class="scroll-bar" ref="wrapper">
    <!-- 管控区域 -->
    <div class="content">
      <!-- 可滚动区域，要设置一个固定的高度 -->
      <slot></slot>
    </div>
  </div>
</template>

<script>
/*
 * 描述: 安装插件 better-scroll
 */
import BScroll from 'better-scroll'

export default {
  name: 'ScrollBar',
  props: {
    probeType: {
      type: Number,
      default: 2
    },
    pullUpLoad: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType,
      click: true,
      pullUpLoad: this.pullUpLoad // 开启上拉加载
    })
    this.scroll.on('scroll', position => {
      // 派发scroll 事件 position参数表示位置
      this.$emit('position', position)
    })
    this.scroll.on('pullingUp', () => {
      // 到底部的时候，派发pullingUp 事件
      this.$emit('pullingUp')
    })
  },
  methods: {
    // 1.回到顶部
    scrollTo(x, y, time = 400) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    // 2. 完成到达底部，调用该方法后才能继续上拉加载
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    },
    // 3, 刷新DOM界面
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    // 4, 记录离开前的Y值
    saveY() {
      return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>

<style></style>
