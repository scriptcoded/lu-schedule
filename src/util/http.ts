import { get as httpsGet, RequestOptions } from 'https'
import { IncomingMessage } from 'http'

import { isBrowser } from '../util/common'

interface IHttpsResponse extends IncomingMessage {
  data: string
}

export function get (url: string): Promise<IHttpsResponse> {
  if (isBrowser()) {
    return getXhr(url)
  } else {
    return getHttp(url)
  }
}

export function getXhr (url: string): Promise<IHttpsResponse> {
  // var const = new XMLHttpRequest();
  // xhr.onreadystatechange = function() {};
  // xhr.open('GET', 'http://www.google.com');
  // xhr.send()
  return null
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