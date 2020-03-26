<template>
  <div class="category-detail" v-if="Object.keys(categoryDetail).length !== 0">
    <goods-list :goods="categoryDetail" /> >
  </div>
</template>

<script>
import GoodsList from '../../../components/content/goodList/GoodList.vue'

export default {
  name: 'CategoryGoodsInfo',
  props: {
    categoryDetail: {
      type: Array,
      default() {
        return []
      }
    }
  },

  components: {
    GoodsList
  }
  // mounted () {
  // 	this.$emit('goodsInfoMounted')
  // }
}
</script>

<style scoped="scoped">
/* .toggle {
  visibility: hidden;
} */
</style>
