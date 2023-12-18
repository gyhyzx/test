export const useThemeStore = defineStore('theme', {
  state: () => ({
    currentTheme: ''
  }),
  actions: {
    setTheme(theme: string) {
      this.currentTheme = theme
    }
  }
})
