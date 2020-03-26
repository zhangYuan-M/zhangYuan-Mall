import { ADD_COUNT, ADD_TO_CART } from './mutation-type.js'

export default {
  addToCartInfo(context, payload) {
    return new Promise(resolve => {
      let isOwn = false
      let oldProduct = null
      for (let i of context.state.cartList) {
        if (i.iid === payload.iid) {
          isOwn = true
          oldProduct = i
        }
      }
      if (!isOwn) {
        resolve('加入购物车！')
        context.commit(ADD_TO_CART, payload) //不需要引号，加在mutations-type的js文件中
      } else {
        context.commit(ADD_COUNT, oldProduct)
        resolve('加入购物车' + '+' + oldProduct.count)
      }
    })
  }
}
