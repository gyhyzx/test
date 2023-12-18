export function hasPermission(permission: string) {
  const { permissions } = useUserStore()
  if (!permissions) {
    return false
  }
  return permissions.includes(permission)
}
