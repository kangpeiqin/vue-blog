import Vue from 'vue'
import Router from 'vue-router'
import {
  constantRouterMap,
  routerMap
} from '@/config/router.config'

Vue.use(Router)

export default new Router({
  routes: routerMap.concat(constantRouterMap)
})
