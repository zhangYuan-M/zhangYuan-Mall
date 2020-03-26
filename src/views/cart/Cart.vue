<template>
  <div id="cart">
    <cart-nav-bar /><!-- 购物车导航 -->
    <scroll class="scroll"> <cart-list /><!-- 购物车内容 --> </scroll>
    <cart-bottom-bar />
  </div>
</template>

<script>
import Scroll from '../../components/common/scroll/Scroll.vue'
import CartNavBar from './childCart/CartNavBar.vue'
import CartList from './childCart/CartList.vue'
import CartBottomBar from './childCart/CartBottomBar.vue'
export default {
  name: 'Cart',
  components: {
    CartNavBar,
    CartList,
    Scroll,
    CartBottomBar
  }
}
</script>

<style scoped="scoped">
#cart {
  height: 100vh;
}
.scroll {
  height: calc(100% - 44px - 49px - 30px);
  overflow: hidden;
}
</style>
