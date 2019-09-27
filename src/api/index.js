/*
 * API
 * @Author: Fick 
 * @Date: 2019-05-28 10:18:59 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-09-18 17:20:01
 */
import {
    HTTP_GET,
    HTTP_POST,
    HTTP_PUT,
    HTTP_DELETE,
    HTTP_FILE
  } from '@/plugin/axios'
  
  // const _host= 'http://127.0.0.1:8080';
  // const _host= 'http://acl.itlp.top:8090/cloud-platform-web';
  // const _host= 'http://47.111.164.39:8092/cloud-platform-web';
  // const _host= 'http://127.0.0.1:8086';
  const _host= 'http://10.30.30.163:8086';
  
  export default {
    getGridUrl(params) {return HTTP_GET(_host+params.url, params)},  //数据视图
    
    getUserList(params) {return HTTP_GET(_host+'/system/user', params)},  //用户管理
    getUserById(params) {return HTTP_GET(_host+'/system/user/'+params.id, params)},  //用户管理
    getByUserName(params) {return HTTP_GET(_host+'/system/user/check', params)},  //
    addSystemUser(params) {return HTTP_POST(_host+'/system/user', params)},  //用户管理
    updateSystemUser(params) {return HTTP_PUT(_host+'/system/user', params)},  //用户管理
    deleteSystemUser(params) {return HTTP_DELETE(_host+'/system/user', params)},  //删除用户管理
    getGridList(params) {return HTTP_GET(_host+'/system/grid', params)},  //数据视图
    saveGrid(params) {return HTTP_POST(_host+'/system/grid', params)},  //数据视图
    updateGrid(params) {return HTTP_PUT(_host+'/system/grid', params)},  //修改数据视图
    getGridById(params) {return HTTP_GET(_host+'/system/grid/'+params.id, params)},  //修改数据视图
    deleteGridById(params) {return HTTP_DELETE(_host+'/system/grid/'+params.id, params)},  //删除数据视图
  }
  
  //   this.$api.getGridById({
//     username:username
// }).then(res => {

// })

/**
 * 登 录
 * @param {*} data 参数
 */
export function login (params) {
  return HTTP_POST( _host + '/account/login', params)
}

/**
 * 退出登录
 * @param {*} data 参数
 */
export function logout () {
  return HTTP_POST( _host + '/auth/logout', {})
}

/**
 * 获取用户信息
 * @param {*} data 参数
 */
export function getInfo () {
  return HTTP_GET( _host + '/system/user/info', {})
}

// /**
//  * 获取用户信息
//  * @param {*} data 参数
//  */
// export function getUserInfo () {
//   return HTTP_GET( _host + '/rbac/user/', {})
// }


