/* 
 * Description: 菜单 路由管理
 * @Author: Fick 
 * @Date: 2019-08-09 10:14:07 
 * @Last Modified by: Fick
 * @Last Modified time: 2019-08-09 10:20:04
 */
import Menufilter from '@util/menufilter'
import router from '@/router'
import { BasicLayout} from '@/layouts'
import {
  ADD_ROUTES
} from '@/store/mutation-types.js'
const permission = {
    state: {
        addRouters: []
    },
    mutations: {
        SET_ROUTERS: (state, routers) => {
          state.addRouters = routers
        },
        [ADD_ROUTES](state, menus) {
          //处理一级菜单  路由
          let addrouter = [];
          menus.forEach(menu => {
            if((menu.path !== "" || menu.path !== "#") &&  !menu.children){
              let temp_menu = {...menu};
              temp_menu.component = BasicLayout;
              temp_menu.children = [];
              temp_menu.children.push(menu);
              temp_menu.redirect= "/"+menu.path,
              addrouter.push(temp_menu);
            }else{
              addrouter.push(menu);
            }
          });
          router.addRoutes(addrouter) // 添加路由
        }
      },
    actions: {
        add_Routes({
          commit
        }, menus) {
          let accessedRouters = [];
          if(menus.addRouters){
            Menufilter(accessedRouters, menus.addRouters)
          }
          commit(ADD_ROUTES, accessedRouters)
        },
        GenerateRoutes ({ commit }, data) {
          return new Promise(resolve => {
            const { menus } = data;
            let accessedRouters = [];
            if(menus){
              Menufilter(accessedRouters, menus)
            }


            // accessedRouters.push({
            //           icon:'home',
            //           title:'dashboard',
            //           name: "dashboard",
            //           path: "/dashboard",
            //           redirect: "/dashboard",
            //           type:1,
            //       },{
            //                   icon:'',
            //                   title:'language',
            //                   name: "language",
            //                   path: "/demo/language",
            //                   redirect: "/demo/language",
            //                   type:1,
            //                 });

            // const accessedRouters = roles[0].menus
            // const accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
            // let accessedRouters = [
            //     {
            //         icon:'dashboard',
            //         title:'dashboard',
            //         name: "dashboarda",
            //         path: "/ccc",
            //         redirect: "/ccc",
            //         type:2,
            //     },{
            //         icon:'home',
            //         title:'dashboard',
            //         name: "dashboard",
            //         path: "/dashboard",
            //         redirect: "/dashboard",
            //         type:1,
            //     },
            //     {
            //       icon:'bug',
            //       title: "demo",
            //       name: "demo",
            //       path: "/demo",
            //       type:1,
            //       children: [
            //         {
            //           icon:'',
            //           title:'basics_table',
            //           name: "base-form",
            //           path: "/demo/base-form",
            //           redirect: "/demo/base-form",
            //           type:1,
            //         },
            //         {
            //           icon:'',
            //           title:'icons',
            //           name: "icons",
            //           path: "/demo/icon",
            //           redirect: "/demo/icon",
            //           type:1,
            //         },
            //         // {
            //         //   icon:'',
            //         //   title:'table',
            //         //   name: "table-list",
            //         //   path: "/demo/list-table",
            //         //   redirect: "/demo/list-table",
            //         //   type:1,
            //         // },
            //         {
            //           icon:'',
            //           title:'table-list',
            //           name: "table-list",
            //           path: "/demo/list-table",
            //           redirect: "/demo/list-table",
            //           type:1,
            //         },
            //         {
            //           icon:'',
            //           title:'language',
            //           name: "language",
            //           path: "/demo/language",
            //           redirect: "/demo/language",
            //           type:1,
            //         }
            //       ]
            //     }
            //   ]
            commit('SET_ROUTERS', accessedRouters)
            commit(ADD_ROUTES, accessedRouters)
            resolve()
          })
        }
    }
}
export default permission