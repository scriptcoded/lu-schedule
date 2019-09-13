import { get as httpsGet, RequestOptions } from 'https'
import { IncomingMessage } from 'http'

interface IHttpsResponse extends IncomingMessage {
  data: string
}

export function get (url: string, options: RequestOptions = {}): Promise<IHttpsResponse> {
  return new Promise<IHttpsResponse>((resolve, reject) => {
    httpsGet(url, options, (response) => {
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