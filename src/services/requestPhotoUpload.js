import toast from 'react-hot-toast'
import { request } from './http-client'

const requestPhotoUpload = ({ event, setProgress, onChange }) => {
  const fileUploaded = event.target.files[0]
  const data = new FormData()
  data.append('file', fileUploaded)

  if (!event.target.files[0].type.includes('image')) {
    toast.error('Faqat rasm yuklay olasiz')
    return
  }
  request
    .post('/upload-image', data, {
      headers: {
        'Content-Type': 'mulpipart/form-data',
      },
      onUploadProgress: function (progressEvent) {
        var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        setProgress(percentCompleted)
      },
    })
    .then((res) => {
      if (res.status === 200) {
        if (res?.data?.data?.filename) {
          onChange(res.data.data.filename)
        }
      }
    })
    .finally(() => {
      setProgress(0)
    })
}

export default requestPhotoUpload
