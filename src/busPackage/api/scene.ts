import { PageParams, RespPageBean } from '@/api'

export interface SceneInfo {
  id?: string
  type?: string
  title?: string
  description?: string
  status?: string
  latitude?: number
  longitude?: number
  responsiblePersonList?: string
  fileGid?: string
  serviceType?: string
}

const baseUrl = getBaseUrl('opmcp')
const prefix = '/site_matter'

export function getScenePageApi(params: PageParams) {
  return getRequest<PageParams, RespPageBean<SceneInfo>>(
    baseUrl + prefix + '/page',
    params
  )
}

export function saveSceneApi(data: SceneInfo) {
  return postRequest<SceneInfo, SceneInfo>(baseUrl + prefix + '/save', {}, data)
}

export function delSceneApi(id: string) {
  return delRequest<string>(baseUrl + prefix, id)
}

export function updateSceneApi(data: SceneInfo) {
  return putRequest<SceneInfo, SceneInfo>(
    baseUrl + prefix + `/${data.id}`,
    data
  )
}
