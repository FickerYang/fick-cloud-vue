/*
 * @Author: Fick 
 * @Date: 2019-05-21 16:33:42 
 * @Last Modified by: Fick
 * @Last Modified time: 2019-07-01 14:32:05
 */

// import Vue from 'vue'
import util from '@/utils/util'
import {
    SIDEBAR_TYPE,
    DEFAULT_LAYOUT_MODE,
    DEFAULT_THEME,
    DEFAULT_FIXED_SIDEMENU,
    DEFAULT_COLOR,
    DEFAULT_LOCALE,
  } from '@/store/mutation-types'

const app = {
    state: {
        sidebar: true,
        device: 'desktop',
        theme: '',  //dark
        layout: '',  //sidemenu
        contentWidth: '',
        fixedHeader: false,
        fixSiderbar: false,
        Locale:'zh', //多语言
        autoHideHeader: false,
        color: null,
        weak: false,
        multiTab: true
    },
    mutations: {
      SET_SIDEBAR_TYPE: (state, type) => {
        state.sidebar = type
        util.cookies.set(type,SIDEBAR_TYPE)
      },
      TOGGLE_LAYOUT_MODE: (state, layout) => {
        util.cookies.set(layout,DEFAULT_LAYOUT_MODE)
        state.layout = layout
      },
      TOGGLE_THEME: (state, theme) => {
        // setStore('_DEFAULT_THEME', theme)
        util.cookies.set(theme,DEFAULT_THEME)
        state.theme = theme
      },
      TOGGLE_FIXED_SIDERBAR: (state, fixed) => {
        util.cookies.set(fixed,DEFAULT_FIXED_SIDEMENU)
        state.fixSiderbar = fixed
      },
      TOGGLE_COLOR: (state, color) => {
        util.cookies.set(color,DEFAULT_COLOR)
        state.color = color
      },
      TOGGLE_LOCALE: (state, locale) => {
        util.cookies.set(locale,DEFAULT_LOCALE)
        state.Locale = locale
      },
    },
    actions: {
      setSidebar ({ commit }, type) {
        commit('SET_SIDEBAR_TYPE', type)
      },
      ToggleLayoutMode ({ commit }, mode) {
        commit('TOGGLE_LAYOUT_MODE', mode)
      },
      ToggleTheme ({ commit }, theme) {
        commit('TOGGLE_THEME', theme)
      },
      ToggleFixSiderbar ({ commit }, fixSiderbar) {
        commit('TOGGLE_FIXED_SIDERBAR', fixSiderbar)
      },
      ToggleColor ({ commit }, color) {
        commit('TOGGLE_COLOR', color)
      },
      ToggleLocale ({ commit }, locale) {
        commit('TOGGLE_LOCALE', locale)
      },
      
    },
    getters:{
      getLocale:state => {
        return state.Locale;
      }
    }
}

export default app