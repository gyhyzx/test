export interface UserInfo {
  id: string
  username: string
}

const baseUrl = getBaseUrl('admin')

export function getAllUserApi() {
  return getRequest<undefined, UserInfo[]>(baseUrl + '/user/listAll')
}
