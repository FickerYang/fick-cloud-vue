/* 
 * Description: 懒加载组件
 * @Author: Fick 
 * @Date: 2019-08-06 17:09:44 
 * @Last Modified by: Fick
 * @Last Modified time: 2019-08-08 13:40:14
 */

function lazy(name) {
  try {
    if (name == 'main') {
      return () =>
      import (`@/layouts/RouteView.vue`)
        // import (`@/components/${name}`)
    }else if (name == 'parentView') {
      return () =>
        import ("@com/parent-view")
    } else {
      //let file = name.split('_')[0]
      return () =>
        import (`@view/${name}`)
        // import (`@view/${name}.vue`)
    }
  } catch (ex) {
      console.error(ex); 
  }
}
export {
  lazy
}
