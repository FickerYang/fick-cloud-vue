/*
 * @Author: Fick 
 * @Date: 2019-05-21 11:14:11 
 * @Last Modified by: Fick
 * @Last Modified time: 2019-08-09 09:51:44
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store'
import util from '@/utils/util'
import NProgress from 'nprogress' // progress bar
import notification from 'ant-design-vue/es/notification'

// 路由数据
import routes from './routes'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

Vue.use(VueRouter);

// 导出路由 在 main.js 里使用
const router = new VueRouter({
    routes
})

const whiteList = ['login', 'register', 'registerResult'] // 路由权限白名单


//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    console.log("to",to)
    NProgress.start() // start progress bar
    let token = util.cookies.get();  //获取token
    if(token){
        if (to.path === '/user/login') {
            next({ path: '/dashboard' })
            NProgress.done()
        }else{      
            // next()
            if (store.getters.roles.length === 0) {
                store
                .dispatch('admin/GetInfo')
                .then(res => {
                    const roles = res.item.loginAppUser && res.item.loginAppUser.role
                    const menus = roles.menus;
                    localStorage.setItem('menu_data', JSON.stringify(menus))
                    store.dispatch('admin/GenerateRoutes', { menus }).then(() => {
                        // 根据roles权限生成可访问的路由表
                        // 动态添加可访问路由表
                        const redirect = decodeURIComponent(from.query.redirect || to.path)
                        if (to.path === redirect) {
                            // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
                            next({ ...to, replace: true })
                        } else {
                            // 跳转到目的路由
                            next({ path: redirect })
                        }
                    })
                    next();
                })
                .catch(() => {
                    notification.error({
                        message: '错误',
                        description: '请求用户信息失败，请重试'
                    })
                    store.dispatch('admin/Logout').then(() => {
                        next({ path: '/user/login', query: { redirect: to.fullPath } })
                    })
                })
            }else{
                next()
            }
        }
    }else{
        if (whiteList.includes(to.name)) {
            // 在免登录白名单，直接进入
            next()
        } else {
            next({ path: '/user/login', query: { redirect: to.fullPath } })
            NProgress.done()
        }
    }
})

export default router