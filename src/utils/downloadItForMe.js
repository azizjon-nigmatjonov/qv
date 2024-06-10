import { request } from '../services/http-client'
import fileDownloader from './fileDownloader'

const downloadItForMe = ({ bucketName, expiresAt, filename, hasItsOwnLink }) =>
  request.post('/get-file-link', { bucketName, expiresAt, filename }).then((res) => {
    fileDownloader(res.data.data.filename, hasItsOwnLink)
    // return res.data?.data?.filename
  })

export default downloadItForMe
