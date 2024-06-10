import toast from 'react-hot-toast'
import { DownloadIcon, UploadIcon } from '../../assets/icons'
import { request } from '../../services/http-client'
import FileIcon from '../../assets/images/file-icon.png'
import fileDownloader from '../../utils/fileDownloader'

export const FileUploadField = ({ setFileNames = () => {}, onSuccess = () => {}, fileNames, className }) => {
  const onFileUpload = (e) => {
    const isCurrentFileType = Array.from(e.target.files).every((file) => file.name.split('.').reverse()[0] === 'pdf')

    if (isCurrentFileType) {
      const files = []

      if (e.target.files.length > 0) {
        for (let i = 0; i < e.target.files.length; i++) {
          const formData = new FormData()
          formData.append('file', e.target.files[i])
          files.push(formData)
        }
        Promise.all(
          files.map((file) => {
            return request.post(`${process.env.REACT_APP_BASE_URL_ADMIN}/upload-file`, file, {
              headers: {
                'Content-Type': 'mulpipart/form-data',
              },
            })
          })
        ).then((res) => {
          setFileNames(res.map((file) => file.data?.data.filename))
          onSuccess()
        })
      }
    } else {
      toast.error('Faqatgina PDF formatidagi file yuklash mumkin')
    }
  }
  return (
    <>
      {fileNames.length > 0 ? (
        fileNames?.map((file, index) => {
          return (
            <div className="flex items-center gap-x-2 bg-[#F4F6FA] p-2 rounded" key={index + file}>
              <img src={FileIcon} alt="pdf file" width="30" height="40" />
              <div className="flex justify-between grow items-center">
                <p className="flex flex-col">
                  <b className="text-sm font-normal">{file.slice(36)}</b>
                </p>
                <span
                  onClick={() => fileDownloader(file)}
                  className="inline-block rounded-lg border p-1 bg-white cursor-pointer"
                >
                  <DownloadIcon />
                </span>
              </div>
            </div>
          )
        })
      ) : (
        <div className={`relative w-full rounded border border-dashed p-7 ${className}`}>
          <div className="flex flex-col justify-center items-center">
            <UploadIcon color="disabled" />
            <p className="mt-2">Drag and drop files here</p>
          </div>
          <input
            widthFull
            className="absolute top-0 left-0 w-full h-full opacity-0"
            type="file"
            draggable
            multiple={true}
            onInput={(e) => {
              onFileUpload(e)
            }}
            onChange={(e) => {
              onFileUpload(e)
            }}
            onDrop={(e) => {
              onFileUpload(e)
            }}
          />
          <div className="text-center mt-4">
            <span className="inline-block border rounded-md cursor-pointer" style={{ padding: '4px 12px' }}>
              Browse
            </span>
          </div>
        </div>
      )}
    </>
  )
}
