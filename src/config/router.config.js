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
        name: 'loginPage',
        component: resolve => require(['@/pages/loginPage'], resolve),
        meta: {title: '登录'}
      }
    ]
  }
]
export const constantRouterMap = [
  {
    path: '/admin',
    name: 'AdminLayout',
    component: resolve => require(['@/layout/AdminLayout'], resolve),
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
        meta: {requireAuth: true, keepAlive: false},
        component: resolve => require(['@/admin/views/postView'], resolve)
      },
      {
        path: '/viewCategory',
        name: 'categoryView',
        meta: {requireAuth: true, keepAlive: false},
        component: resolve => require(['@/admin/views/categoryView'], resolve)
      },
      {
        path: '/viewAbout',
        name: 'aboutView',
        meta: {requireAuth: true, keepAlive: false},
        component: resolve => require(['@/admin/views/aboutView'], resolve)
      },
      {
        path: '/previewAbout',
        name: 'previewAbout',
        meta: {requireAuth: true, keepAlive: false},
        component: resolve => require(['@/admin/views/aboutPreview'], resolve)
      },
      {
        path: '/viewTag',
        name: 'tagView',
        meta: {requireAuth: true, keepAlive: false},
        component: resolve => require(['@/admin/views/tagView'], resolve)
      },
      {
        path: '/dashBoard',
        name: 'dashBoard',
        meta: {requireAuth: true},
        component: resolve => require(['@/admin/views/DashBoard'], resolve)
      },
      {
        path: '/editor',
        name: 'postEditor',
        meta: {requireAuth: true},
        component: () => import('@/admin/views/postEditor')
      },
      {
        path: '/editPost',
        name: 'postEdit',
        meta: {requireAuth: true},
        component: () => import('@/admin/views/postEdit')
      }
    ]
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import('@/exception/404')
  }
]
