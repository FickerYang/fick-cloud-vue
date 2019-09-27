/*
 * @Author: Fick 
 * @Date: 2019-05-21 13:54:11 
 * @Last Modified by: Fick
 * @Last Modified time: 2019-08-08 14:00:57
 */
import { UserLayout,BasicLayout,RouteView,PageView} from '@/layouts'
// import { bxAnaalyse } from '@/core/icons'
const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard', //   /sys/monitoring
        name: 'dashboarda',
        // redirect: '/Home',
        component: () => import('@view/dashboard/Home'),
        meta: { title: 'Home'},
      },
      // {
      //   path: '/demo/form/BasicForm',
      //   component: () => import('@view/demo/form/BasicForm'),
      //   meta: { title: '基础表格'},
      //   children: []
      // },
      {
        path: '/demo',
        redirect: '/demo/base-form',
        component: RouteView,  //PageView   RouteView
        meta: { title: 'Demo'},
        children: [
          {
            path: '/demo/base-form',
            component: () => import('@view/demo/form/BasicForm'),
            meta: { title: '基础表格'},
            children: []
          },
          {
            path: '/demo/icon',
            component: () => import('@view/demo/icons'),
            meta: { title: '图标'},
            children: []
          },{
            path: '/demo/list-table',
            component: () => import('@view/demo/table/TableList'),
            meta: { title: '表格'},
            children: []
          },{
            path: '/demo/language',
            component: () => import('@view/demo/language'),
            meta: { title: '多语言测试',},
          }
        ]
      }
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
  // {
  //   path: '/',
  //   name: 'index',
  //   component: BasicLayout,
  //   meta: { title: '首页' },
  //   redirect: '/dashboard',
  //   children: [
  //     {
  //       path: '/dashboard',
  //       name: 'demo',
  //       redirect: '/demo/base-form',
  //       component: RouteView,
  //       meta: { title: '首页11'},
  //       children: [
  //         {
  //           path: '/aa/Home',
  //           name: 'Home',
  //           // redirect: '/Home',
  //           component: () => import('@view/dashboard/Home'),
  //           meta: { title: 'Home'},
  //         },
  //         {
  //           path: '/demo/base-form',
  //           component: () => import('@view/demo/form/BasicForm'),
  //           meta: { title: '基础表格'},
  //           children: []
  //         }
  //       ]
  //     },
  //   ]
  // },
  
]

const frameIn= [ 
    // {
    //     path: '/',
    //     component: resolve => require(['@view/login'], resolve)
    // },
    // {
    //       path: '/login',
    //       component: resolve => require(['@view/login'], resolve)
    // }
 ]

 /**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
    {
        path: '/user',
        component: UserLayout,
        redirect: '/user/login',
        hidden: true,
        children: [
          {
            path: 'login',
            name: 'login',
            component: () => import(/* webpackChunkName: "user" */ '@view/user/Login')
          },
        //   {
        //     path: 'register',
        //     name: 'register',
        //     component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
        //   },
        //   {
        //     path: 'register-result',
        //     name: 'registerResult',
        //     component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
        //   }
        ]
    },
    {
      path: '/404',
      component: () => import(/* webpackChunkName: "fail" */ '@view/exception/404')
    }
]


export default [
...asyncRouterMap,
...frameIn,
...constantRouterMap,
]