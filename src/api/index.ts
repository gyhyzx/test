// import { useAuthStore } from '@/store/modules/auth'
import Taro, { Chain } from '@tarojs/taro'

export interface RespBean<T = any> {
  statusCode: number
  errMsg: string
  data: T
}

const keyMap = {
  admin: process.env.TARO_APP_ADMIN
}

export function getBaseUrl(type: 'admin') {
  return keyMap[type]
}

// 请求拦截器
const interceptor = (chain: Chain) => {
  const { requestParams } = chain
  const { url, header } = requestParams

  requestParams.timeout = 60000

  if (!_.get(header, 'content-type')) {
    _.set(header, 'content-type', 'application/json;charset=UTF-8')
  }

  _.set(
    header,
    'Authorization',
    `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lc3BhY2UiOiJpdGVtIiwiZXhwIjoxNjk5MjUzOTIzNDQ3LCJ1c2VySWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJ0aW1lc3RhbXAiOjE2OTkyNTM5MjI4NDN9.ufOeHSXqszBvoZRgFAs0K5LjiAyutkC_Wba8qxEKFyM`
  )

  // const authStore = useAuthStore()
  // if (authStore.token && !_.get(header, 'Authorization')) {
  //   _.set(header, 'Authorization', `Bearer ${authStore.token}`)
  // }

  const requestUrl = process.env.TARO_APP_BASE_URL + url

  requestParams.url = requestUrl
  requestParams.header = header

  return chain.proceed(requestParams).then((res: RespBean) => res)
}

const HTTP_STATUS: Record<string, number> = {
  SUCCESS: 200,
  CLIENT_ERROR: 400,
  AUTHENTICATE: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  BAD_GATEWAY: 502
}

// 响应拦截器
const responseInterceptor = (chain: Chain) => {
  const { requestParams } = chain
  return chain.proceed(requestParams).then(({ data }) => {
    if (data.status === HTTP_STATUS.SUCCESS) {
      if (data.message && data.message !== '操作成功') {
        Taro.showToast({
          title: data.message
        })
      }
    } else if (data.status === HTTP_STATUS.AUTHENTICATE) {
      Taro.showToast({
        title: '没有权限'
      })
    }
    return data.data
  })
}

Taro.addInterceptor(interceptor)
Taro.addInterceptor(responseInterceptor)

export function postRequest(
  url: string,
  data?: Record<string, string>,
  header: string = 'application/json;charset=UTF-8'
) {
  return Taro.request({
    method: 'POST',
    url: url,
    data: data,
    header: {
      'content-type': header
    },
    success: (res) => {
      return res
    }
  })
}

export function getRequest(url: string, data?: Record<string, string>) {
  return Taro.request({
    method: 'GET',
    url: url,
    data: data,
    header: {},
    success: (res) => {
      return res
    }
  })
}
