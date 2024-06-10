import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { UploadFileOutlined } from '@mui/icons-material'
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined'

import { request } from '../../services/http-client'
import ImageSliderPreview from '../ImageSliderPriview'
import LinearProgressWithLabel from '../../components/LinearProgressWithLabel'
import fileDownloader from '../../utils/fileDownloader'
import { CancelIcon } from '../../assets/icons'

export function FileUpload({
  widthFull = false,
  clearErrors = () => {},
  disabled = false,
  label = 'Fayl yuklash',
  setValue = () => {},
  shape = 'rectangle',
  errors = {},
  handleFile = () => {},
  watch = () => {},
  nameImage = '',
  nameFile = '',
  required = false,
  register = () => {},
  showSmallPreview = false,
}) {
  const supportedFormats = ['zip', 'jpeg', 'jpg', 'png', 'pdf']

  const hiddenFileInput = useRef(null)
  const [filename, setFilename] = useState('')
  const [progress, setProgress] = useState(0)
  const [files, setFiles] = useState('')
  const [images, setImages] = useState([])

  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const handleClick = () => {
    hiddenFileInput.current.click()
  }

  useEffect(() => {
    if (watch(nameFile)) {
      setFilename(watch(nameFile))
    } else {
      setFilename('')
    }
  }, [watch(nameFile)])

  const handleChange = (event) => {
    if (supportedFormats.includes(event.target.files[0].name.split('.').reverse()[0])) {
      const formData = new FormData()
      formData.append('file', event.target.files[0])

      const type = event.target.files[0].type.split('/')[0] === 'application' ? 'file' : 'image'
      formData.append('file', event.target.files[0])

      request
        .post(type === 'file' ? '/upload-file' : 'upload-image', formData, {
          headers: {
            'Content-Type': 'mulpipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            setProgress(percentCompleted)
          },
        })
        .then((res) => {
          if (res.status === 200) {
            if (type === 'file') {
              setFiles(res.data.data.filename)
              setValue(nameFile, res.data.data.filename)
              clearErrors(nameFile)
            } else if (type === 'image') {
              const images = watch(nameImage)
              images.push(res.data.data.filename)
              setValue(nameImage, images)
              setImages((p) => [...p, res.data.data.filename])
            }
            handleFile(res.data.data.filename)
            setFilename(res.data.data.filename)
          }
        })
        .finally(() => {
          setProgress(0)
        })
    } else {
      toast.error(`Qo'llab quvvatlangan fayl turlari: zip, jpeg, jpg, png, pdf`)
    }
  }

  return (
    <div>
      {shape === 'input' ? (
        <div>
          <div
            className={`relative w-full h-full border transition-all duration-500 rounded-md
        hover:border-primary focus-within:border-primary text-[#303940] text-sm leading-6 ${
          errors && errors[nameFile] ? 'border-red-400' : ''
        }`}
          >
            <div
              className={`py-2 px-4 relative ${
                filename ? 'cursor-pointer duration-300 hover:bg-blue-100 rounded-md' : ''
              }`}
            >
              {filename && !disabled && (
                <div
                  className="absolute -top-1.5 -left-1.5 bg-white rounded-full"
                  onClick={() => {
                    setValue(nameFile, '')
                    setFilename('')
                  }}
                >
                  <CancelIcon />
                </div>
              )}
              {progress ? (
                <div className="absolute w-full z-10 bg-gray-200 h-full top-0 left-0 px-3 py-3 rounded-md">
                  <LinearProgressWithLabel value={progress} />
                </div>
              ) : null}
              <div onClick={() => filename && fileDownloader(filename)}>
                {filename ? filename.slice(-34) : 'Fayl tanlanmagan'}
              </div>
            </div>

            <label
              className={`absolute right-0 top-0 bg-white py-2 px-4 border-l rounded-r-md hover:bg-gray-100 duration-300 cursor-pointer ${
                disabled ? 'hidden' : ''
              }`}
            >
              Faylni tanlash
              <input {...register(nameFile, { required })} type="file" id="upload" hidden onChange={handleChange} />
            </label>
          </div>
          <div
            className="text-red-600 transition-all text-[12px] mt-1"
            style={{
              height: errors && errors[nameFile] ? 18 : 0,
            }}
          >
            {errors && errors[nameFile] && 'Toldirilishi shart'}
          </div>
        </div>
      ) : (
        <>
          <div
            className={`h-[80px] ${
              widthFull ? 'w-[full]' : 'w-[164px]'
            } relative border border-dashed border-borderColor flex flex-col justify-center items-center rounded-[8px] cursor-pointer`}
            onClick={handleClick}
          >
            <UploadFileOutlined className="text-primary" style={{ fontSize: '22px' }} />
            <p className="text-[14px] mt-3">{label}</p>
            <input
              className="visually-hidden"
              required={required}
              type="file"
              ref={hiddenFileInput}
              onChange={handleChange}
              disabled={progress}
            />
            {progress ? (
              <div
                className={`absolute top-0 left-0 z-10 h-full w-full bg-gray-100 opacity-1 rounded-md p-3 text-center`}
              >
                <p className="text-sm mb-2">{`${progress}%`} yuklab bo'lindi</p>
                <div className="bg-blue-200 h-2 rounded-sm" style={{ width: `${progress}%` }}></div>
              </div>
            ) : null}
          </div>
          {showSmallPreview ? (
            <div className="grid grid-cols-12 gap-4 mt-4">
              {files ? (
                <div className="col-span-3 ">
                  <div>
                    <a
                      href={`${process.env.REACT_APP_CDN_FILE_URL}${files}`}
                      type="downlad"
                      rel="noreferrer"
                      target="SELF"
                    >
                      <p className="text-center">
                        <InsertDriveFileOutlinedIcon fontSize="large" />
                      </p>
                      <p className="text-xs text-center">{files.slice(-15)}</p>
                    </a>
                  </div>
                </div>
              ) : null}
              {images.length ? (
                <div className="col-span-9 grid grid-cols-12 gap-2 auto-rows-auto">
                  {images.map((i) => (
                    <div className="col-span-4 rounded-md overlfow-hidden auto-rows-auto" key={i} onClick={handleOpen}>
                      <img
                        src={`${process.env.REACT_APP_CDN_IMAGE_URL}${i}`}
                        alt="reject file"
                        className="rounded-md overflow-hidden w-full h-full"
                      />
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}
          <ImageSliderPreview isOpen={isOpen} handleClose={handleClose} images={images} />
        </>
      )}
    </div>
  )
}
