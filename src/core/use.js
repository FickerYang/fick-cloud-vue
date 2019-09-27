/*
 * @Author: Fick 
 * @Date: 2019-05-21 13:13:30 
 * @Last Modified by: Fick
 * @Last Modified time: 2019-05-21 13:36:01
 */
import Vue from 'vue'


// base library
import Antd from 'ant-design-vue'
import Viser from 'viser-vue'
import VueCropper from 'vue-cropper'
import 'ant-design-vue/dist/antd.less'


// ext library
import VueClipboard from 'vue-clipboard2'

VueClipboard.config.autoSetContainer = true

Vue.use(Antd)
Vue.use(Viser)