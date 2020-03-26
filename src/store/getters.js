export default {
  showLength(state) {
    return state.cartList.length
  },
  showChecked(state, getters) {
    return function(goods) {
      return goods.checked
    }
  },
  showCheckedAll(state, getters) {
    return state.cartList.length
      ? state.cartList.filter(item => item.checked === true).length === getters.showLength
      : false
  },
  totleCount(state) {
    let totle = 0
    for (let item of state.cartList) {
      if (item.checked) {
        totle += parseFloat(item.count) * parseFloat(item.nowPrice)
      }
    }
    return totle.toFixed(2)
  },
  totleLength(state) {
    let totle = 0
    for (let item of state.cartList) {
      if (item.checked) {
        totle += parseInt(item.count)
      }
    }
    return totle
  }
}
