import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Winners from '../views/Winners.vue'
import More from '../views/More.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/winners',
    name: 'Winners',
    component: Winners
  },
  {
    path: '/more',
    name: 'More',
    component: More
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
