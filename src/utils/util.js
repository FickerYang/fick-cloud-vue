/*
 * @Description: 插件
 * @Author: Fick
 * @Date: 2019-09-19 09:13:29
 * @LastEditTime: 2019-09-24 10:41:13
 * @LastEditors: Fick
 */
import cookies from './util.cookies'

const util = {
  cookies,
}


/**
 * @description 打开新页面
 * @param {String} url 地址
 */
util.open = function (url) {
  var a = document.createElement('a')
  a.setAttribute('href', url)
  a.setAttribute('target', '_blank')
  a.setAttribute('id', 'd2admin-link-temp')
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(document.getElementById('d2admin-link-temp'))
}

/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent () {
  const event = document.createEvent('HTMLEvents')
  event.initEvent('resize', true, true)
  event.eventType = 'message'
  window.dispatchEvent(event)
}

export function timeFix () {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
}
export function welcome () {
  const arr = ['休息一会儿吧', '准备吃什么呢?', '要不要打一把 DOTA', '我猜你可能累了']
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}
/**
 * 时间格式化  
 * @param {*} date 
 * @param {*} fmt 
 * 使用 let nowDate = formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')
 */
export function formatDate(date, fmt="yyyy-MM-dd hh:mm:ss") {
  if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
  };
  for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
          let str = o[k] + '';
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
      }
  }
  return fmt;
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}

/** 消息提示 */
export const csMessage = {
  //TODO 需要实现国际化
  success:(_this)=>{
    _this.$message.success('操作成功！',5);
  },
  error:(_this) => {
    _this.$message.error('操作失败!',5);
  },
  warningCustom:(_this) => {
    _this.$message.warning('必须选择一条数据！',5);
  },
}

export default util
