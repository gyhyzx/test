export interface UserInfo {
  id: string
  username: string
}

const baseUrl = getBaseUrl('admin')

export function getAllUser() {
  return getRequest(baseUrl + '/user/listAll')
}
