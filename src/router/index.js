import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/home/Home.vue')
const Cart = () => import('../views/cart/Cart.vue')
const Category = () => import('../views/category/Category.vue')
const Profile = () => import('../views/profile/Profile.vue')
const Detail = () => import('../views/detail/Detail.vue')

// 1.安装第三方插件
Vue.use(VueRouter)

// 路由懒加载
const routes = [{
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home // 不用加引号
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/detail/:id',
    component: Detail
  }
]

// 2.创建实例对象
const router = new VueRouter({
  routes,
  mode: 'history'
})

// 3.导出对象
export default router