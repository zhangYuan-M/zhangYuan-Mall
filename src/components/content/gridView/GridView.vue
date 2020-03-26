<template>
  <div class="grid-view" v-if="Object.keys(goodsList).length !== 0">
    <div class="right-part">
      <div class="item" v-for="(item, index) in goodsList.data.list" :key="index">
        <a :href="item.link">
          <img :src="item.image" @load="imgLoad" :key="item.image" />
          <div>{{ item.title }}</div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GridView',
  props: {
    goodsList: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      totleLength: 0, // 总图片的长度
      currentLength: 0 // 当前加载的图片数量
    }
  },
  methods: {
    imgLoad() {
      if (++this.currentLength === this.totleLength) {
        this.$emit('GridViewImgLoadOver')
        this.currentLength = 0
      }
    }
  },
  watch: {
    // 字符串的形式监听，性能开销比较小一点，会一层层的解析下去，知道遇到list
    'goodsList.data.list': {
      handler(value) {
        this.totleLength = value.length
      },
      immediate: true
      // deep: true  //深度监听，性能开销很大
    }
  }
}
</script>

<style scoped="scoped">
.item img {
  width: 100%;
}

.right-part {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
}

.item {
  width: 33%;
  padding: 14px;
  padding-bottom: 7px;
}

.item div {
  font-size: 13px;
  text-align: center;
}
</style>
