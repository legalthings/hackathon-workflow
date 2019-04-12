import Vue from 'vue'
import Router from 'vue-router'
import Scan from './views/Scan.vue'
import Chain from './views/Chain.vue'

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
      path: '/chain/:id',
      name: 'chain',
      component: Chain
    }
  ]
})
