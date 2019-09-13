import { get as httpsGet, RequestOptions } from 'https'
import { IncomingMessage } from 'http'

interface IHttpsResponse {
  data: string
}

export function get (url: string): Promise<IHttpsResponse> {
  return getHttp(url)
}

export function getHttp (url: string): Promise<IHttpsResponse> {
  return new Promise<IHttpsResponse>((resolve, reject) => {
    httpsGet(url, (response) => {
      let data = ''
    
      response.on('data', chunk => {
        return data += chunk
      })
      response.on('end', () => {
        const resp: IHttpsResponse = Object.assign({}, response, {
          data
        })

        resolve(resp)
      })
      response.on('error', reject)
    }).on('error', reject)
  })
}