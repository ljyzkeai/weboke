// 一、配置axios
import axios from 'axios'
// import store from '@/store/index' 如果使用vuex，那么token，userinfo都可以在登录以后存储到store中，不需要使用storage
// 获取浏览器的接口地址。

const instance = axios.create({
  baseURL: window.location.origin,
  timeout: 5000,
  withCredentials: true,//表示跨域请求时是否需要使用凭证
  headers: {
    'access-control-allow-origin': '*',
    'Access-Control-Allow-Origin-Type': '*'
  }

})
// // 请求拦截器，设置token
instance.interceptors.request.use(config => {
  console.log('进入请求状态')
  return config
})

// axios.interceptors.request.use(config => {
//   if (localStorage && localStorage.getItem('token')) {
//     const token = localStorage.getItem('token')
//     token && (config.headers.Authorization = token)
//   }
//   return config
// }, error => {
//   // 可以安装elementui等ui组件，将错误信息输出到界面。
//   console.log(error)
//   return Promise.error(error)
// })
// 响应拦截器
// axios.interceptors.response.use(response => {
//   if (response.status === 200) {
//     // 993登录过期
//     if (response.data.code !== '993') {
//       return Promise.resolve(response)
//     } else {
//       console.log('登录过期')
//       // store.commit('clearUserInfo')  // 使用vuex存储过用户信息，这里需要清空一下。
//       window.location.href = '/#/login'
//     }
//   } else {
//     return Promise.reject(response)
//   }
// })

// 2、封装请求方式
// @param url 接口地址
// @param data 携带参数
// @param file 上传文件对象
// @param auth 是否携带token
export default function (method = 'get', url = '', params = {}) {
  return new Promise((resolve, reject) => {
    instance({ method, url, params })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
/* 旧版写法 */
/* export default class http {
  // get请求

  static get(url: string, data: any) {
    return new Promise((resolve, reject) => {
      axios.get(url, data)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  // post请求
  static post(url: string, data: any) {
    return new Promise((resolve, reject) => {
      axios.post(url, data)
        .then(res => {
          resolve(res.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
  // put请求
  static put(url: string, data: any) {
    return axios.put(url, data)
  }
  // delete 请求
  static del(url: string, data: any) {
    return axios.delete(url, data)
  }
  // upload 请求
  static uploader(url: string, file: any) {
    let params = new FormData()
    params.append('file', file)
    return axios.post(url, params)
  }
} */
