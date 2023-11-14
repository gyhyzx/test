import { UserInfo } from '@/api/user'
import { defineStore } from 'pinia'

const user: UserInfo = {
  id: 'dlasjdla',
  username: 'admin'
}

export const useUserStore = defineStore('user', {
  state: () => ({
    currentUser: user
  })
})
