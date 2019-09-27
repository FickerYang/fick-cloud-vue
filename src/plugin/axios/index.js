/*
    HTTP_GET
    HTTP_POST
    HTTP_PUT
    HTTP_DELETE
    HTTP_FILE
 * AXIOS 插件管理
 * @Author: Fick
 * @Date: 2019-03-21 15:00:00
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-09-18 17:19:09
 */
import axios from 'axios'
import qs from 'qs'
import util from '@/utils/util'
import router from '@/router'

const tokenName="access-token";   //默认token名称

// axios.defaults.headers.post['Access-control-Allow-Credentials'] = true
// axios.defaults.headers.post['Access-Control-Allow-Headers'] = 'Content-Type,Access-Token'
// axios.defaults.headers.post['Access-Control-Expose-Headers'] = '*'

// 配置接口地址
axios.defaults.baseURL = ''

// POST传参序列化(添加请求拦截器)
axios.interceptors.request.use(
  config => {
   // loadingInstance = Loading.service({
   //  lock: true,
   //  text: '数据加载中，请稍后...',
   //  background: 'rgba(0, 0, 0, 0.7)'
   //  spinner: 'el-icon-loading',
   // })
   if (config.method === 'post') {
    config.data = qs.stringify(config.data)
   }
   if (config.method === 'put') {
    config.data = qs.stringify(config.data)
   }
   //登录接口特殊处理
  if(config.url.split("/auth/login").length>1){
    let Base64 = require('js-base64').Base64;
    // config.headers.Authorization = "Basic " + Base64.encode("icl:admin")
   return config;
  }

  let token = util.cookies.get(tokenName);  
  if(!((config.url.split("/auth/token").length>1))){
    if(!token){ //token被清除 跳转登录页面
      router.push('/');
    }
  }
//   if(!((config.url.split("/login").length>1) || (config.url.split("/user/signup/checkProperty").length>1)) ){
//      if(!token){ //token被清除 跳转登录页面
//        router.push('/login');
//      }
//   }
  //  config.headers.Authorization='Bearer '+token;  //赋值最新的token
   config.headers.Authorization = token;  //赋值最新的token
   return config;
  },
  err => {
   // loadingInstance.close()
   // 发送失败
  //  console.log(err)
   Promise.reject(err)
  }
 )

// 响应拦截器
axios.interceptors.response.use(
  res => {
    // loadingInstance.close();
    // return res;
    // console.log("aaaaa",res)
    return res;
   // if (res.data.code === 200) {
   //  loadingInstance.close()
   //  return res
   // } else {
   //  loadingInstance.close()
   //  //Message.error(res.data.msg)
   // }
  },
  err => {
   // loadingInstance.close()
   // console.log("aaaa",err)
   // Message.error('请求失败，请重新登录!')
   // router.push('/login');   //
   return Promise.reject(err)
  }
)

/**
 * @description GET 请求
 * @param {String} url 请求地址
 * @param {String} params 请求参数
 */
export function HTTP_GET (url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}


/**
 * @description POST 请求
 * @param {String} url 请求地址
 * @param {String} params 请求参数
 */
export function HTTP_POST (url, params) {
  return new Promise((resolve, reject) => {
   axios({
       method:'post',
       url:url, 
       data:params
    }
    ).then(res => {
      resolve(res.data)
    },err => {
      reject(err)
     }
    ).catch(err => {
     reject(err.data)
    })
  })
 }

/**
 * @description PUT 请求
 * @param {String} url 请求地址
 * @param {String} params 请求参数
 */
 export function HTTP_PUT (url, params) {
  return new Promise((resolve, reject) => {
   axios.put(url,params)
    .then(res => {
     resolve(res.data)
    }).catch(err => {
     reject(err.data)
    })
  })
 }


/**
 * @description DELETE 请求
 * @param {String} url 请求地址
 * @param {String} params 请求参数
 */
export function HTTP_DELETE (url, params) {
  return new Promise((resolve, reject) => {
   axios.delete(url, {
     params: params
    }).then(res => {
     resolve(res.data)
    }).catch(err => {
     reject(err.data)
    })
  })
}


/**
 * @description 文件上传用
 * @param {String} url 请求地址
 * @param {String} params 请求参数
 */
export function HTTP_FILE (url, params) {
  return new Promise((resolve, reject) => {
    const instance=axios.create({
       withCredentials: true
    })
    instance.post(url, params).then(
     res => {
      resolve(res.data)
     },err => {
      reject(err.data)
     }
    ).catch(err => {
     reject(err.data)
    })
  })
 }

