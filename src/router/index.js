import { createRouter, createWebHashHistory } from 'vue-router'
import TransferView from '@/views/TransferView'
import SettingsView from '@/views/SettingsView.vue'
import DashboardView from '@/views/DashboardView.vue'

const routes = [
  {
    path: '/',
    name: 'configuracao',
    component: SettingsView
  },
  {
    path: '/transferencia',
    name: 'transferencia',
    component: TransferView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
