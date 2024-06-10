import { request } from '../services/http-client'

export default function getFileSize(url) {
  request
    .get(url, {
      responseType: 'blob',
    })
    .then((response) => {
      const file = new Blob([response.data], { type: 'application/zip' })
      return file.size
    })
    .catch((error) => {})
}
