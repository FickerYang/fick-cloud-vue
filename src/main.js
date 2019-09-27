/*
 * @Author: Fick 
 * @Date: 2019-05-21 11:16:09 
 * @Last Modified by: Fick
 * @Last Modified time: 2019-08-08 15:59:52
 */
// import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'

/**路由 */
import router from './router'  
import store from './store/'
import api from '@/api';

import './core/use'
// mock
import './mock'

import './icons' // icon
import i18n from './i18n' // 多国语
import GeminiScrollbar from 'vue-gemini-scrollbar'  //滚动条

import bootstrap from './core/bootstrap'
import './utils/filter' // global filter

import {hasPermission} from'./public/js/btnPermissions.js';  //按钮权限
import { VIEWKEY } from '@/public/js/dataView.js' //数据视图

Vue.config.productionTip = false
Vue.prototype.$api = api;  //api
Vue.prototype.hasPerm = hasPermission;  //按钮权限
Vue.prototype.$VIEWKEY = VIEWKEY;  //数据视图

Vue.use(GeminiScrollbar)




//用户手动刷新页面，这是路由会被重设，要重新新增
if (localStorage.getItem('menu_data') && localStorage.getItem('menu_data').length > 0) {
  let addRouters = JSON.parse(localStorage.getItem('menu_data'))
  if (addRouters) {
    store.dispatch("admin/add_Routes", { addRouters })
  }
}

new Vue({
  router,
  store,
  i18n,
  data () {
    return {
      locale:null,
    }
  },
  created () {
    bootstrap()
  },
  render: function (h) { return h(App) },
}).$mount('#app')
