import Vue from 'vue'
import Router from 'vue-router'
import Scan from './views/Scan.vue'
import Produce from './views/Produce.vue'
import Chains from './views/Chains.vue'
import Settings from './views/Settings.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'scan',
      component: Scan
    },
    {
      path: '/',
      name: 'produce',
      component: Produce
    },

    {
      path: '/chains',
      name: 'chains',
      component: Chains
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    }
  ]
})
