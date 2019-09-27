/*
 * Cookies 管理
 * @Author: Fick
 * @Date: 2019-03-21 15:12:53
 * @Last Modified by: Fick
 * @Last Modified time: 2019-05-29 13:51:28
 */

import Cookies from 'js-cookie'


const defaultName="access-token";   //默认token名称
const cookies = {}

/**
 * @description 存储 cookie 值
 * @param {String} token cookie value
 * @param {String} cookeName cookie name
 */
cookies.set = (token,cookeName = defaultName) => {
  // 设置token，并填写有效期
  let maxAge = new Date(new Date().getTime() + 1000*60*60*24*7);  //默认保存7天
  Cookies.set(cookeName, token, {
      expires: maxAge
  })
}

/**
 * @description 拿到 cookie 值
 * @param {String} cookeName cookie name
 */
cookies.get = (cookeName = defaultName) => {
  return Cookies.get(cookeName)
}

/**
 * @description 删除 cookie
 * @param {String} cookeName cookie name
 */
cookies.remove = (cookeName = defaultName) => {
  Cookies.remove(cookeName)
}


export default cookies
