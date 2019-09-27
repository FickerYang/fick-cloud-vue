/*
 * 国际化 
 * @Author: Fick 
 * @Date: 2019-05-31 13:48:58 
 * @Last Modified by: Fick
 * @Last Modified time: 2019-08-06 15:27:00
 */
import Vue from 'vue'
import VueI18n from 'vue-i18n'

import {
  DEFAULT_LOCALE,
} from '@/store/mutation-types'
import util from '@/utils/util'

Vue.use(VueI18n)

//简体中文
import zhLocale from './lang/zh'  
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';

//Englih
import enLocale from './lang/en'  
import enGB from 'ant-design-vue/lib/locale-provider/en_GB';


const messages = {
  zh: {
    ...zhLocale,
    ...zhCN
  },
  en: {
    ...enLocale,
    ...enGB
  },
}


const i18n = new VueI18n({
    locale: util.cookies.get(DEFAULT_LOCALE) || 'zh', // 语言标识
    messages
  })

export default i18n


