/* 
 * Description: 菜单动态路由设置
 * @Author: Fick 
 * @Date: 2019-08-08 11:49:18 
 * @Last Modified by: Fick
 * @Last Modified time: 2019-08-09 10:22:36
 */
import { BasicLayout} from '@/layouts'
import { lazy } from '@util/lazyLoading'
export default (routers, data) => {
  //要重新遍历一下，是因为，通常我们动态路由的时候，
  //是获取服务端数据，这个component属性是一个字符串转化成组件
  generaMenu(routers, data)
}
function generaMenu(routers, data) {
  data.forEach((item) => {
    let menu = {...item}
    if(menu.parentId === null && menu.type === 1 && (menu.path === "" || menu.path === "#")){
      menu.component = BasicLayout
    }else{
      menu.component = lazy(menu.path)
    }
    menu.meta = { title: menu.title , unid:menu.id}
    menu.name = item.title;
    menu.path = menu.path === "#" ? menu.path : "/"+menu.path;
    if (item.children && item.children.length>0) {
      menu.children = []
      generaMenu(menu.children, item.children)
    }else{
      delete menu.children
    }
    routers.push(menu)
  })

}


