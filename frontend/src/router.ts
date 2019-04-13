import Vue from 'vue'
import Router from 'vue-router'
import Scan from './views/Scan.vue'
import Chain from './views/Chain.vue'
import License from './views/License.vue'

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
      path: '/chain/:chainId',
      name: 'chain',
      component: Chain,
      props: true
    },
    {
      path: '/license/:chainId',
      name: 'license',
      component: License,
      props: true
    }
  ]
})
