export interface UserInfo {
  id: string
  username: string
}

const baseUrl = getServiceName('admin')

export function getAllUserApi() {
  return getRequest<undefined, UserInfo[]>(baseUrl + '/user/listAll')
}
