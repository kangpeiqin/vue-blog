import Vue from 'vue'
import Router from 'vue-router'
import {
  constantRouterMap,
  routerMap
} from '@/config/router.config'

Vue.use(Router)

export default new Router({
  base: '/admin/',
  routes: routerMap.concat(constantRouterMap)
})

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
