import { createRouter, createWebHashHistory } from 'vue-router'
import TransferView from '@/views/TransferView'
import TransactionView from '../views/TransactionView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: TransferView
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
  {
    path: '/transaction',
    name: 'transaction',
    component: TransactionView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
