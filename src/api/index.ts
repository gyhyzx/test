// import { useAuthStore } from '@/store/modules/auth'
import Taro, { Chain, RequestTask } from '@tarojs/taro'
import qs from 'qs'

export interface PageParams {
  page: number
  size: number
  [key: string]: any
}

export interface RespPageBean<T = any> {
  current: number
  pages: number
  size: number
  total: number
  orders: T[]
  records: T[]
}

export type Recordable<T = any> = Record<string, T>

const keyMap: Recordable<string | undefined> = {
  admin: process.env.TARO_APP_ADMIN,
  opmcp: process.env.TARO_APP_OPMCP
}

export function getBaseUrl(type: 'admin' | 'opmcp'): string {
  return keyMap[type]!
}

// 请求拦截器
const interceptor = <T = any>(chain: Chain) => {
  const { requestParams } = chain
  const { url, header } = requestParams

  requestParams.timeout = 60000

  if (!_.get(header, 'content-type')) {
    _.set(header, 'content-type', 'application/json')
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

  return chain.proceed(requestParams).then((res: RequestTask<T>) => res)
}

const HTTP_STATUS: Recordable<number> = {
  SUCCESS: 200,
  CLIENT_ERROR: 400,
  AUTHENTICATE: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  BAD_GATEWAY: 502
}

// 响应拦截器
const responseInterceptor = <T = any>(chain: Chain): T => {
  const { requestParams } = chain
  return chain.proceed(requestParams).then(({ data }) => {
    if (data.status === HTTP_STATUS.SUCCESS) {
      if (data.message && data.message !== '操作成功') {
        Taro.showToast({
          title: data.message
        })
      }
    } else if (data.status === HTTP_STATUS.CLIENT_ERROR) {
      Taro.showToast({
        title: '错误请求'
      })
    } else if (data.status === HTTP_STATUS.AUTHENTICATE) {
      Taro.showToast({
        title: '没有权限'
      })
    } else if (data.status === HTTP_STATUS.FORBIDDEN) {
      Taro.showToast({
        title: '禁止访问'
      })
    } else if (data.status === HTTP_STATUS.NOT_FOUND) {
      Taro.showToast({
        title: '请求路径不存在'
      })
    } else if (data.status === HTTP_STATUS.SERVER_ERROR) {
      Taro.showToast({
        title: '服务器错误'
      })
    } else if (data.status === HTTP_STATUS.BAD_GATEWAY) {
      Taro.showToast({
        title: '网关错误'
      })
    }
    return data
  })
}
Taro.addInterceptor(interceptor)
Taro.addInterceptor(responseInterceptor)

// 请求封装
export async function postRequest<reqT = any, resT = any>(
  url: string,
  params: Recordable,
  data?: reqT,
  header: string = 'application/json'
): Promise<resT> {
  const _url = params ? `${url}?${qs.stringify(params)}` : url
  const res = await Taro.request({
    method: 'POST',
    url: _url,
    data: data,
    header: {
      'content-type': header
    }
  })
  return res.data
}

export async function getRequest<reqT = any, resT = any>(
  url: string,
  params?: reqT
): Promise<resT> {
  const res = await Taro.request<resT>({
    method: 'GET',
    url: url,
    data: params,
    header: {}
  })
  return res.data
}

export async function delRequest<reqT = string | number>(
  url: string,
  id: reqT
): Promise<void> {
  await Taro.request({
    method: 'DELETE',
    url: url + `/${id}`,
    header: {}
  })
}

export async function putRequest<reqT = any, resT = any>(
  url: string,
  data?: reqT,
  header: string = 'application/json'
): Promise<resT> {
  const res = await Taro.request({
    method: 'PUT',
    url: url,
    data: data,
    header: {
      'content-type': header
    }
  })
  return res.data
}
