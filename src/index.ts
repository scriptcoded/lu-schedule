import { Schedule } from './Schedule'

export function fromUrl (url: string) {
  const matched = url.match(/^https?:\/\/cloud.timeedit.net\/lu\/web\/([^/]+)\/([a-z0-9]+)/i)
  
  if (!matched) {
    throw new Error('Invalid URL. Must be a LU TimeEdit URL.') 
  }

  return new Schedule(matched[1], matched[2])
}
