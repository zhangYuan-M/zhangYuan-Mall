import Toast from './Toast.vue'
const obj = {}

/* 默认的一个参数是vue */
obj.install = function(Vue) {
  // 1. 创建组件构造器
  const toastConstructor = Vue.extend(Toast)

  // 2. new的方式，根据组件构造器创建一个组件对象
  const toast = new toastConstructor()

  // 3.将组件对象，手动挂载到一个元素上
  toast.$mount(document.createElement('div'))

  // 4. toast.$el 对应的是 div
  document.body.appendChild(toast.$el)

  // 5. 添加$taost 属性
  Vue.prototype.$toast = toast
}

export default obj
// 最后在main.js 中 Vue.use(toast) 并注入组件
