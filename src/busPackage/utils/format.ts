import type { ConfigType } from 'dayjs'
import dayjs from 'dayjs'

export function timeFormat(date: ConfigType, template = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(date).format(template)
}
