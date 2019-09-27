import Vue from 'vue'
import SvgIcon from '@com/SvgIcon'// svg组件

// register globally
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)



//   <svg-icon icon-class="logo"/>
