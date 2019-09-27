/*
 * @Author: Fick 
 * 按钮权限管理
 * @Date: 2019-06-24 11:19:52 
 * @Last Modified by: Fick
 * @Last Modified time: 2019-06-24 11:22:26
 */

import store from '@/store'
//用来控制按钮的显示是否
export function hasPermission(permission){
    let myBtns = store.getters.btns;
    return myBtns.indexOf(permission) > -1;
}
