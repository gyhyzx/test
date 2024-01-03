import type { Dayjs } from 'dayjs'
import { PageParams, Recordable, RespPageBean } from '.'

export interface MemberInfo {
  id?: string
  userId: string
  username?: string
  userType: 'LEADER' | 'MEMBER'
}

export interface ProjectInfo {
  id?: string
  name?: string
  code?: string
  address?: string
  totalInvestment?: number
  startTime?: string | Dayjs
  estimatedCompletionTime?: string | Dayjs
  content?: string
  cover?: string
  coverUrl?: string
  memberList?: MemberInfo[]
  projectLeader?: string[]
  projectMember?: string[]
}

const baseUrl = getServiceName('opmcp')
const prefix = '/project'

export function getProjectPageApi(params?: PageParams) {
  return getRequest<PageParams, RespPageBean<ProjectInfo>>(
    baseUrl + prefix + '/page',
    params
  )
}

export function getProjectInfoApi(id: string) {
  return getRequest<Recordable, ProjectInfo>(baseUrl + prefix + '/getById', {
    id
  })
}
