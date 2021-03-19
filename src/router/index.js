import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Cart = () => import('../views/shoppingCart/Cart')
const Profile = () => import('../views/profile/Profile')
const Detail = () => import('../views/detail/Detail')

Vue.use(Router)

const routes = [
  {
    path:'',
    redirect:"/home"
  },
  {
    path:'/home',
    component:Home
  },
  {
    path:'/category',
    component:Category
  },
  {
    path:'/cart',
    component:Cart
  },
  {
    path:'/profile',
    component:Profile
  },
  {
    path:'/detail/:id',
    component:Detail
  }
]
export default new Router({
  routes,
  mode:"history"
})
