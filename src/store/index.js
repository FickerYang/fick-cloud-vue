/*
 * VUEX 管理
 * @Author: Fick 
 * @Date: 2019-05-21 14:23:40 
 * @Last Modified by: Fick
 * @Last Modified time: 2019-05-29 11:11:24
 */
import Vue from 'vue'
import Vuex from 'vuex'

import admin from './modules/'
import getters from './getters'

Vue.use(Vuex)
export default new Vuex.Store({
    modules: {
      admin
    },
    state: {
  
    },
    mutations: {
    },
    actions: {
  
    },
    getters
  })
