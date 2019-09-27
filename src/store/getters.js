/*
 * @Author: Fick 
 * @Date: 2019-05-21 14:31:45 
 * @Last Modified by: Fick
 * @Last Modified time: 2019-07-01 14:31:28
 */

const getters = {
    device: state => state.app.device,
    locale: state => state.admin.app.Locale,
    roles: state => state.admin.user.roles,
    theme: state => state.admin.app.theme,
    avatar: state => state.admin.user.avatar,
    nickname: state => state.admin.user.name,
    addRouters: state => state.admin.permission.addRouters,
    // locale:(state)=>{
    //     let bb = state.admin.app.locale
    //     return bb;
    // }
    // roles:(state)=>{
    //     debugger;
    // }
}

export default getters