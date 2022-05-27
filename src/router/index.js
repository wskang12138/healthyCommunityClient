import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/people',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'people',
        component: () => import('@/views/people/index'),
        meta: { title: '个人信息', icon: 'form' }
      }
    ],
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '我的基本信息', icon: 'information' }
      }
    ]
  },
  {
    path: '/appoint',
    component: Layout,
    children: [
      {
        path: 'appoint',
        name: 'appoint',
        component: () => import('@/views/appoint/index'),
        meta: { title: '我的预约', icon: 'appoint' }
      }
    ]
  },
  {
    path: '/suggestion',
    component: Layout,
    children: [
      {
        path: 'suggestion',
        name: 'suggestion',
        component: () => import('@/views/suggestion/index'),
        meta: { title: '我的推荐', icon: 'suggestion' }
      }
    ]
  },
  {
    path: '/community',
    component: Layout,
    children: [
      {
        path: 'community',
        name: 'community',
        component: () => import('@/views/community/index'),
        meta: { title: '社区内容', icon: 'community' }
      }
    ]
  },
  {
    path: '/detail',
    component: Layout,
    children: [
      {
        path: '/detail/:id',
        name: 'detail',
        component: () => import('@/views/detail/index'),
        meta: { title: '新闻详情', icon: 'dashboard' }
      }
    ],
    hidden: true
  },
  {
    path: '/record',
    component: Layout,
    children: [
      {
        path: 'record',
        name: 'record',
        component: () => import('@/views/record/index'),
        meta: { title: '我的电子病历', icon: 'record' }
      }
    ]
  },

  {
    path: '/life',
    component: Layout,
    children: [
      {
        path: 'life',
        name: 'life',
        component: () => import('@/views/life/index'),
        meta: { title: '生活习惯情况', icon: 'life' }
      }
    ]
  },
  {
    path: '/fabu',
    component: Layout,
    children: [
      {
        path: 'fabu',
        name: 'fabu',
        component: () => import('@/views/fabu/index'),
        meta: { title: '发布', icon: 'dashboard' }
      }
    ],
    hidden: true
  },
  {
    path: '/disease',
    component: Layout,
    children: [
      {
        path: 'disease',
        name: 'disease',
        component: () => import('@/views/disease/index'),
        meta: { title: '历史疾病情况', icon: 'disease' }
      }
    ]
  },

  {
    path: '/family',
    component: Layout,
    children: [
      {
        path: 'family',
        name: 'family',
        component: () => import('@/views/family/index'),
        meta: { title: '家族疾病情况', icon: 'disease' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
