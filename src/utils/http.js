import axios from 'axios'
import {Message} from 'element-ui'
import router from '../router'
import {myMessage} from '@/utils/message'

axios.interceptors.response.use(success => {
  // if (success.status && success.status === 200 && success.data.status === 500) {
  // Message.error({message: success.data.msg})
  // return
  // }
  if (success.data.code === 500 || success.data.code === 400 || success.data.code === 403 || success.data.code === 401) {
    Message.error({message: success.data.msg})
    // Message.success({message: success.data.msg})
  }
  return success.data
}, error => {
  if (error.response.status === 504 || error.response.status === 404) {
    Message.error({message: '服务器被吃了( ╯□╰ )'})
  } else if (error.response.status === 403) {
    Message.error({message: '权限不足，请联系管理员'})
  } else if (error.response.status === 401) {
    myMessage.error({message: error.response.data.msg ? error.response.data.msg : '尚未登录，请登录'})
    router.replace('/')
  } else {
    if (error.response.data.msg) {
      Message.error({message: error.response.data.msg})
    } else {
      Message.error({message: '未知错误!'})
    }
  }
  return null
})

let base = ''

export const postKeyValueRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      for (let i in data) {
        ret += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
export const postRequest = (url, params, headers) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    headers: headers
  })
}
export const putRequest = (url, params, headers) => {
  return axios({
    method: 'put',
    url: `${base}${url}`,
    data: params,
    headers: headers
  })
}
export const getRequest = (url, params) => {
  return axios({
    method: 'get',
    url: `${base}${url}`,
    params: params
  })
}
export const deleteRequest = (url, params, headers) => {
  return axios({
    method: 'delete',
    url: `${base}${url}`,
    params: params,
    data: params,
    headers: headers
  })
}
