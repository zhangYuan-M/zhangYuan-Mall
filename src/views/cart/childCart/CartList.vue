<template>
  <div class="cart-list">
    <cart-list-item v-for="(item, index) in goodsList" :key="index" :goods="item"></cart-list-item>
  </div>
</template>

<script>
import CartListItem from './CartListItem.vue'
import { mapState } from 'vuex'
export default {
  name: 'CartList',
  components: {
    CartListItem
  },
  data() {
    return {
      goodsList: this.$store.state.cartList
    }
  }
}
</script>

<style scoped="scoped"></style>
