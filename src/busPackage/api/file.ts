import { Recordable } from '@/api'
import { postRequest } from '../../api'

export interface FileInfo {
  id?: string
  groupId?: string
  fileName?: string
  realFileId?: string
  ext?: string
  fileMd5?: string
  fileSize?: string
  sts?: string
}

export interface FileParams {
  path?: string
  gid?: string
  pid?: string
  businessKey?: string
  businessId?: string
  scopeId?: string
}

const baseUrl = getServiceName('opmcp')
const prefix = '/file'

export function getFileListByGidApi(gid: string) {
  return getRequest<Recordable, FileInfo[]>(baseUrl + prefix + '/list/gid', {
    gid
  })
}

export function delFileApi(fileId: string) {
  return postRequest<Recordable, undefined>(baseUrl + prefix + '/delete', {
    fileId
  })
}
