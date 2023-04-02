import { createRouter, createWebHashHistory } from 'vue-router'
import TransferView from '@/views/TransferView'
import SettingsView from '@/views/SettingsView.vue'

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
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
