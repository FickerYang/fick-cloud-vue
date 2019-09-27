/*
 * @Author: Fick 
 * @Date: 2019-05-21 16:25:46 
 * @Last Modified by: Fick
 * @Last Modified time: 2019-05-29 13:56:00
 */
import {DEVICE_TYPE } from '@/utils/device'
import { mapState } from 'vuex'


const mixin = {
  computed: {
    ...mapState({
      layoutMode: state => state.admin.app.layout,
      navTheme: state => state.admin.app.theme,
      primaryColor: state => state.admin.app.color,
      colorWeak: state => state.admin.app.weak,
      fixedHeader: state => state.admin.app.fixedHeader,
      fixSiderbar: state => state.admin.app.fixSiderbar,
      fixSidebar: state => state.admin.app.fixSiderbar,
      contentWidth: state => state.admin.app.contentWidth,
      autoHideHeader: state => state.admin.app.autoHideHeader,
      sidebarOpened: state => state.admin.app.sidebar,
      multiTab: state => state.admin.app.multiTab
    })
  },
  methods: {
    isTopMenu () {
      return this.layoutMode === 'topmenu'
    },
    isSideMenu () {
      return !this.isTopMenu()
    }
  }
}

const mixinDevice = {
    computed: {
      ...mapState({
        device: state => state.admin.app.device
      })
    },
    methods: {
      isMobile () {
        return this.device === DEVICE_TYPE.MOBILE
      },
      isDesktop () {
        return this.device === DEVICE_TYPE.DESKTOP
      },
      isTablet () {
        return this.device === DEVICE_TYPE.TABLET
      }
    }
  }


  export {mixin,mixinDevice }