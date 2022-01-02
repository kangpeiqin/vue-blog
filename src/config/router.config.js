import BasicLayout from '@/layout/BasicLayout'

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
        component: resolve => require(['@/pages/homePage'], resolve)
      },
      {
        path: '/categories',
        name: 'categories',
        component: resolve => require(['@/pages/typePage'], resolve)
      },
      {
        path: '/archives',
        name: 'archives',
        component: resolve => require(['@/pages/tagPage'], resolve)
      },
      {
        path: '/about',
        name: 'about',
        component: resolve => require(['@/pages/aboutPage'], resolve)
      },
      {
        path: '/githubTrending',
        name: 'githubTrending',
        meta: {keepAlive: false},
        component: resolve => require(['@/pages/githubTrendingPage'], resolve)
      },
      {
        path: '/article',
        name: 'article',
        meta: {keepAlive: false},
        component: resolve => require(['@/pages/postDetailPage'], resolve)
      },
      {
        path: '/categories/details',
        name: 'categoriesDetails',
        meta: {keepAlive: false},
        component: resolve => require(['@/pages/categoriesDetailsPage'], resolve)
      }
    ]
  }
]
