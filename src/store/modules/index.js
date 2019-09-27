/*
 * @Author: Fick 
 * @Date: 2019-05-21 14:33:23 
 * @Last Modified by: Fick
 * @Last Modified time: 2019-05-29 10:41:14
 */

const files = require.context('./admin', false, /\.js$/)
const modules = {}
files.keys().forEach(key => {
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
});

export default{
  namespaced:true,
  modules
}