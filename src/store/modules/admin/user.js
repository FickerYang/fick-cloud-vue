/*
 * @Author: Fick 
 * @Date: 2019-05-28 10:05:57 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-09-18 18:25:20
 */
import { login,getInfo,logout } from '@/api'
import util from '@/utils/util'
import { welcome } from '@/utils/util'

const user = {
    state: {
        token: '',
        name: '',
        welcome: '',
        avatar: '',
        roles: [],
        info: {}
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_NAME: (state, { name, welcome }) => {
            state.name = name
            state.welcome = welcome
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
        SET_INFO: (state, info) => {
            state.info = info
        }
    },
    actions: {
        // 登录
        Login ({ commit }, userInfo) {
            return new Promise((resolve, reject) => {
                login(userInfo).then(response => {
                    if(response.status === 200){
                        const item = response.item;
                        const token = item.access_token;
                        util.cookies.set(token)
                        commit('SET_TOKEN', token)
                        resolve()
                    }else{
                        reject(response);
                    }
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 获取用户信息
        GetInfo ({ commit }) {
            return new Promise((resolve, reject) => {
                getInfo().then(response => {
                    if(response.status === 200){
                        const item = response.item;
                        const result = item.loginAppUser;
                        if(result){
                            const role = result.roles[0];
                            // const menus = role.menus;  //菜单
                            // commit('SET_ROUTERS', menus)

                            commit('SET_ROLES', role.name)
                            commit('SET_INFO', result)
                            commit('SET_NAME', { name: result.nickName, welcome: welcome() })
                            commit('SET_AVATAR', result.avatar === null ? '/avatar1.jpg':result.avatar)
                        }
                        resolve(response)
                    }else{
                        reject(new Error(response.msg))
                    }

                    // const result = response.result;
                    // if (result.role && result.role.permissions.length > 0) {
                    //     const role = result.role
                    //     role.permissions = result.role.permissions
                    //     role.permissions.map(per => {
                    //       if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
                    //         const action = per.actionEntitySet.map(action => { return action.action })
                    //         per.actionList = action
                    //       }
                    //     })
                    //     role.permissionList = role.permissions.map(permission => { return permission.permissionId })
                    //     commit('SET_ROLES', result.role)
                    //     commit('SET_INFO', result)
                    // } else {
                    //     reject(new Error('getInfo: roles must be a non-null array !'))
                    // }
                    // commit('SET_NAME', { name: result.name, welcome: welcome() })
                    // commit('SET_AVATAR', result.avatar)
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 登出
        Logout ({ commit, state }) {
            return new Promise((resolve) => {
                commit('SET_TOKEN', '')
                commit('SET_ROLES', [])
                util.cookies.remove();  
        
                logout(state.token).then(() => {
                    resolve()
                }).catch(() => {
                    resolve()
                })
            })
        }
    }
}
export default user