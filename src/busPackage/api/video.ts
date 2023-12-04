export interface VideoInfo {
  id?: string
  name: string
  stream?: string
  children?: VideoInfo[]
}

export const videos: VideoInfo[] = [
  {
    id: '1',
    name: '小金库',
    children: [
      {
        id: '1.1',
        name: '监控一',
        stream: 'rtmp://mobliestream.c3tv.com:554/live/goodtv.sdp'
      },
      {
        id: '1.2',
        name: '监控二',
        stream: 'rtmp://mobliestream.c3tv.com:554/live/goodtv.sdp'
      }
    ]
  },
  {
    id: '2',
    name: '大金库',
    children: [
      {
        id: '2.1',
        name: '监控三',
        stream: 'rtmp://mobliestream.c3tv.com:554/live/goodtv.sdp'
      }
    ]
  }
]
