export interface UserInfo {
  id: string
  username: string
}

const baseUrl = getBaseUrl('admin')

export function getAllUser() {
  return getRequest<undefined, UserInfo[]>(baseUrl + '/user/listAll')
}
