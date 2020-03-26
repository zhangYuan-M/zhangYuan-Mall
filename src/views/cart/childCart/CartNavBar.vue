<template>
  <div class="nav-bar">
    <nav-bar>
      <div slot="center" class="cart-nav">购物车({{ showNumber }})</div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from '../../../components/common/navbar/NavBar.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'CartNavBar',
  components: {
    NavBar
  },
  computed: {
    ...mapGetters({
      showNumber: 'showLength'
    })
  }
}
</script>

<style scoped="scoped">
.nav-bar {
  background-color: #ff8198;
  color: white;
}
</style>
