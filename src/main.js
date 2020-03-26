import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store'
import toast from './components/common/toast/index.js'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

Vue.use(toast)

new Vue({
  render: h => h(App),
  router,
  store,
  toast
}).$mount('#app')
