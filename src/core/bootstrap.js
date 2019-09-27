/*
 * @Author: Fick 
 * @Date: 2019-05-29 09:07:17 
 * @Last Modified by: Fick
 * @Last Modified time: 2019-05-30 11:42:18
 */
import Vue from 'vue'
import util from '@/utils/util'
import store from '@/store'
import {
    ACCESS_TOKEN,
    DEFAULT_COLOR,
    DEFAULT_THEME,
    DEFAULT_LAYOUT_MODE,
    DEFAULT_COLOR_WEAK,
    SIDEBAR_TYPE,
    DEFAULT_FIXED_HEADER,
    DEFAULT_FIXED_HEADER_HIDDEN,
    DEFAULT_FIXED_SIDEMENU,
    DEFAULT_CONTENT_WIDTH_TYPE,
    DEFAULT_MULTI_TAB
} from '@/store/mutation-types'
import config from '@/config/defaultSettings'


  export default function Initializer () {
    // store.commit('admin/TOGGLE_LAYOUT_MODE', util.cookies.get(DEFAULT_LAYOUT_MODE) === undefined ? config.layout :  util.cookies.get(DEFAULT_LAYOUT_MODE))
    // store.commit('admin/TOGGLE_THEME', util.cookies.get(DEFAULT_THEME) == undefined ? config.navTheme :  util.cookies.get(DEFAULT_THEME))
    // store.commit('admin/TOGGLE_FIXED_SIDERBAR', util.cookies.get(DEFAULT_FIXED_SIDEMENU) == undefined ? config.fixSiderbar :  util.cookies.get(DEFAULT_FIXED_SIDEMENU))
    // store.commit('admin/TOGGLE_COLOR', util.cookies.get(DEFAULT_COLOR) == undefined ? config.primaryColor :  util.cookies.get(DEFAULT_COLOR))

    store.commit('admin/TOGGLE_LAYOUT_MODE', fomat(DEFAULT_LAYOUT_MODE,config.layout))
    store.commit('admin/TOGGLE_THEME', fomat(DEFAULT_THEME,config.navTheme))
    store.commit('admin/TOGGLE_FIXED_SIDERBAR', fomat(DEFAULT_FIXED_SIDEMENU,config.fixSiderbar))
    store.commit('admin/TOGGLE_COLOR', fomat(DEFAULT_COLOR,config.primaryColor))

  }

  /** 格式化处理 */
  function fomat(cookieName,value){
     let even = util.cookies.get(cookieName) === undefined ? value : util.cookies.get(cookieName);
     if(cookieName === "DEFAULT_FIXED_SIDEMENU"){
      even = Boolean(even);
     }
     return even;
  }