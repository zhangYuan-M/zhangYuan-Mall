<template>
  <div class="cart-bottom-bar">
    <div class="left">
      <span
        ><img
          src="../../../assets/img/cart/tick.svg"
          @click="imgClick"
          :class="{ red: showCheckedAll }"
        />
        <span class="text">全选</span>
      </span>
    </div>
    <div class="center">
      <span>总计：￥{{ totleCount }}</span>
    </div>
    <div class="right">
      <span>去结算({{ totleLength }})</span>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'CartBottomBar',
  methods: {
    ...mapMutations({
      changeCheckAll: 'changeCheckAll'
    }),
    imgClick() {
      this.changeCheckAll()
    }
  },
  computed: {
    ...mapGetters(['totleCount', 'totleLength', 'showCheckedAll'])
  }
}
</script>

<style scoped="scoped">
.cart-bottom-bar {
  position: fixed;
  bottom: 49px;
  height: 30px;
  width: 100%;
  background-color: ghostwhite;
  display: flex;
}

.left,
.center,
.right {
  flex: 1;
}

.left span {
  background-color: whitesmoke;
}

.left img {
  width: 1.2875rem;
  /* background: whitesmoke; */
  margin-left: 13px;
  margin-top: 5px;
  border-radius: 50%;
  border: 1px solid lightgray;
}

.red {
  background-color: deeppink;
}

.text {
  position: relative;
  top: -5px;
  left: 5px;
  color: black;
}

.center span {
  position: relative;
  top: 5px;
}

.right span {
  position: relative;
  top: 5px;
  right: -30px;
}

.right {
  background-color: lightpink;
}
</style>
