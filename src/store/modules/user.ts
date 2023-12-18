import { UserInfo } from '@/api/user'

const user: UserInfo = {
  id: 'dlasjdla',
  username: 'admin'
}

const permissions: String[] = []

export const useUserStore = defineStore('user', {
  state: () => ({
    currentUser: user,
    permissions: permissions
  })
})
