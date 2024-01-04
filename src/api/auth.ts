export interface AuthInfo {
  token: string
}

export interface LoginParams {
  username: string
  password: string
}

export interface LoginRes {
  token: string
  expire: string
  refreshToken: string
  attachmentStatement: string
  tokenExpireAt: string
  refreshTokenExpireAt: string
}

const prefix = '/auth'
const baseUrl = getServiceName('admin')

export function loginApi(data: LoginParams) {
  return postRequest<LoginParams, LoginRes>(
    baseUrl + prefix + '/login',
    {},
    data
  )
}
