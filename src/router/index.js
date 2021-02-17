import Vue from 'vue'
import Router from 'vue-router'
import loginPage from '../pages/loginPage.vue'
import findPasswordPage from '../pages/findPasswordPage'
import registerPage from '../pages/registerPage'
import homePage from '../pages/homePage'
import postDetailPage from '../pages/postDetailPage'
import aboutPage from '../pages/aboutPage'
import typePage from '../pages/typePage'
import tagPage from '../pages/tagPage'
import categoriesDetailsPage from '../pages/categoriesDetailsPage'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'homePage',
      component: homePage
    }, {
      path: '/loginPage',
      name: 'loginPage',
      component: loginPage
    }, {
      path: '/findPassword',
      component: findPasswordPage
    }, {
      path: '/register',
      component: registerPage
    }, {
      path: '/article',
      component: postDetailPage
    }, {
      path: '/about',
      component: aboutPage
    }, {
      path: '/categories',
      component: typePage
    },
    {
      path: '/categories/details',
      component: categoriesDetailsPage
    },
    {
      path: '/archives',
      component: tagPage
    }, {
      path: '*',
      name: 'NotFound',
      component: () => import('@/exception/404')
    }
  ]
})
