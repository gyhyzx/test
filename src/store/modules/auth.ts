import { AuthInfo } from '@/api/auth'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: ''
  }),
  actions: {
    resetAuth() {
      this.token = ''
    },
    setAuth(auth: AuthInfo) {
      this.token = auth.token
    }
  }
})
