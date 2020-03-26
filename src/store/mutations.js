import { ADD_COUNT, ADD_TO_CART, CHANGE_CHECK, CHANGE_CHECK_ALL } from './mutation-type.js'

export default {
  [ADD_COUNT](state, payload) {
    payload.count = payload.count + 1
  },
  [ADD_TO_CART](state, payload) {
    payload.checked = true
    payload.count = 1
    state.cartList.push(payload)
  },
  [CHANGE_CHECK](state, payload) {
    payload.checked = !payload.checked
  },
  [CHANGE_CHECK_ALL](state) {
    if (state.cartList.filter(item => item.checked === true).length === state.cartList.length) {
      state.cartList.map(item => {
        item.checked = false
      })
    } else {
      state.cartList.map(item => {
        item.checked = true
      })
    }
  }
}
