import BasicLayout from '@/layout/BasicLayout'

export const routerMap = [
  {
    path: '/',
    name: 'index',
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
        component: () => import('@/pages/postDetailPage')
      },
      {
        path: '/categories/details',
        name: 'categoriesDetails',
        component: () => import('@/pages/categoriesDetailsPage')
      },
      {
        path: '/login',
        name: 'loginPage',
        component: () => import('@/pages/loginPage'),
        meta: {title: '登录'}
      },
      {
        path: '*',
        name: 'NotFound',
        component: () => import('@/exception/404')
      }
    ]
  }
]
export const constantRouterMap = [
  {
    path: '/admin',
    name: 'NotFound',
    component: () => import('@/exception/404')
  }
]
