<template>
  <div id="tab-bar-item" @click="itemClick">
    <div class="item-icon" v-show="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div class="item-active-icon" v-show="isActive">
      <slot name="item-icon-active"></slot>
    </div>
    <div class="item-text" :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
// 使用前，要安装路由
/*
 * 描述：推荐使用，v-for插槽的形式，底部导航条，flex布局
 */
export default {
  name: 'TabBarItem',
  props: {
    link: {
      // 根据传递的路径数据，决定是否切换 div
      type: String,
      required: true
    }
  },
  computed: {
    isActive() {
      // 如果当前的路由包含目标值
      return this.$route.path.indexOf(this.link) !== -1
    },
    activeStyle() {
      // 如果 isActive = true
      return this.isActive ? { color: '#f69' } : {}
    }
  },
  methods: {
    itemClick() {
      //  路由跳转
      if (this.$route.path !== this.link) {
        this.$router.replace(this.link)
      }
    }
  }
}
</script>

<style scoped>
#tab-bar-item {
  flex: 1;
}

.item-icon img,
.item-active-icon img {
  width: 24px;
  height: 24px;
  margin-top: 5px;
  vertical-align: middle;
}

.item-text {
  font-size: 13px;
  margin-top: 2px;
  color: #333;
}
</style>
