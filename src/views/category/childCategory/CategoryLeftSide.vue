<template>
  <div class="left-side" v-if="Object.keys(leftSide).length !== 0">
    <scroll class="scroll">
      <div
        v-for="(item, index) in leftSide"
        :key="index"
        class="item"
        :class="{ showClick: currentIndex === index }"
        @click="itemClick(index)"
      >
        {{ item }}
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from '../../../components/common/scroll/Scroll.vue'
export default {
  name: 'CategoryLeftSide',
  props: {
    leftSide: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data: function() {
    return {
      currentIndex: 0 // 记录当前选中的选项卡
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
      this.$emit('itemClick', index)
    }
  },
  components: {
    Scroll
  }
}
</script>

<style scoped="scoped">
.left-side {
  width: 25%;
  height: 100vh;
  background-color: whitesmoke;
  float: left;
}
.scroll {
  height: calc(100% - 44px - 49px);
  overflow: hidden;
}
.item {
  /* flex-direction: column; */
  padding: 13px;
}
.showClick {
  background-color: white;
  border-left: 3px solid deeppink;
  color: black;
}
</style>
