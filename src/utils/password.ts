// 至少一个大写字母，一个字母，一个数字，至少 8 个字符
export function validatePassword(password: string) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\s\S]{8,}$/
  return regex.test(password)
}

// 作用于表单上的密码验证器
export function formValidatePass(password: string) {
  if (!validatePassword(password))
    return Promise.reject(
      '密码需包含至少一个大写字母，一个小写字母，一个数字，并至少 8 个字符'
    )
  else return Promise.resolve()
}
