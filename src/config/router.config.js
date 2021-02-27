import BasicLayout from '@/layout/BasicLayout'
// import AdminLayout from '@/layout/AdminLayout'

export const routerMap = [
  {
    path: '/',
    name: 'BasicLayout',
    component: BasicLayout,
    meta: {title: '首页'},
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'homePage',
        component: () => import('@/pages/homePage')
      },
      {
        path: '/categories',
        name: 'categories',
        component: () => import('@/pages/typePage')
      },
      {
        path: '/archives',
        name: 'archives',
        component: () => import('@/pages/tagPage')
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('@/pages/aboutPage')
      },
      {
        path: '/githubTrending',
        name: 'githubTrending',
        component: () => import('@/pages/githubTrendingPage')
      },
      {
        path: '/article',
        name: 'article',
        meta: {keepAlive: false},
        component: () => import('@/pages/postDetailPage')
      },
      {
        path: '/categories/details',
        name: 'categoriesDetails',
        meta: {keepAlive: false},
        component: () => import('@/pages/categoriesDetailsPage')
      },
      {
        path: '/login',
        name: 'loginPage',
        component: () => import('@/pages/loginPage'),
        meta: {title: '登录'}
      }
    ]
  }
]
export const constantRouterMap = [
  {
    path: '/admin',
    name: 'AdminLayout',
    component: () => import('@/layout/AdminLayout'),
    beforeEnter (to, from, next) {
      if (sessionStorage.getItem('token') === null) {
        next('/login')
      } else {
        next()
      }
    },
    children: [
      {
        path: '/postView',
        name: 'postView',
        meta: {requireAuth: true},
        component: () => import('@/admin/views/postView')
      },
      {
        path: '/dashBoard',
        name: 'dashBoard',
        meta: {requireAuth: true},
        component: () => import('@/admin/views/DashBoard')
      },
      {
        path: '/editor',
        name: 'postEditor',
        meta: {requireAuth: true},
        component: () => import('@/admin/views/postEditor')
      }
    ]
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import('@/exception/404')
  }
]
