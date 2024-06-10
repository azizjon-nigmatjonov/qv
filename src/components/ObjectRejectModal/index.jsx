import { useState, useRef } from 'react'
import { format } from 'date-fns'
import { AnimatePresence, motion } from 'framer-motion'
import { Modal } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { Close } from '@mui/icons-material'

import { ArrowDownIcon, ArrowUpIcon, DocIcon, PhotoSvgFiled } from '../../assets/icons'
import { BtnFiled } from '../Buttons/BtnFilled'
import requestPhotoUpload from '../../services/requestPhotoUpload'
import requestFileUpload from '../../services/requestFileUpload'
import ImageSliderPreview from '../ImageSliderPriview'
import fileDownloader from '../../utils/fileDownloader'
import { useEffect } from 'react'
import dateFormatter from '../../utils/dateFormatter'

function ObjectRejectModal({ isOpen, handleClose, blocks, onSubmit }) {
  const imgInputRef = useRef()
  const fileInputRef = useRef()

  const [showBlocks, setShowBlocks] = useState(false)
  const [isSliderOpen, setIsSliderOpen] = useState(false)
  const [startChecking, setStartChecking] = useState(false)
  const [imgProgress, setImgProgress] = useState(0)
  const [fileProgress, setFileProgress] = useState(0)
  const [imageUrl, setImageUrl] = useState([])
  const [fileUrl, setFileUrl] = useState([])
  const [description, setDescription] = useState('')

  const [showFileError, setShowFileError] = useState(false)
  const [showDescError, setShowDescError] = useState(false)

  const handleSliderOpen = () => setIsSliderOpen(true)
  const handleSliderClose = () => setIsSliderOpen(false)

  const onInnerSubmit = () => {
    setStartChecking(true)
    if (!fileUrl.length) {
      setShowFileError(true)
    }
    if (!description) {
      setShowDescError(true)
    }
    if (fileUrl.length && description) {
      onSubmit(description, fileUrl)
    }
  }

  useEffect(() => {
    if (startChecking) {
      if (fileUrl.length) {
        setShowFileError(false)
      } else {
        setShowFileError(true)
      }
      if (description) {
        setShowDescError(false)
      } else {
        setShowDescError(true)
      }
    }
  }, [startChecking, fileUrl, description])

  return (
    <Modal
      open={isOpen}
      onClose={() => {
        handleClose()
        setFileUrl([])
        setImageUrl([])
        setDescription('')
        setStartChecking(false)
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="flex justify-center items-center"
    >
      <div className="relative bg-white rounded-md p-8 w-1/2 outline-none">
        <p className="text-center text-[24px] leading-8 font-semibold mb-6">Izoh kiriting</p>
        <span
          className="absolute top-5 right-8 text-[32px] cursor-pointer"
          onClick={() => {
            handleClose()
            setFileUrl([])
            setImageUrl([])
            setDescription('')
            setStartChecking(false)
          }}
        >
          <CloseIcon fontSize="inherit" htmlColor="#6E8BB7" />
        </span>
        <textarea
          name="description"
          className={`text-sm p-3 border border-dashed rounded-md h-[124px] w-full ${
            showDescError ? 'border-red-400' : 'hover:border-primary duration-300 focus-within:border-primary'
          }`}
          onChange={({ target: { value } }) => setDescription(value)}
        />
        {showDescError && <p className="text-red-600 text-[12px]">To'ldirilishi shart</p>}
        <div className="mt-6 flex justify-between gap-6">
          <div className="grow">
            <div
              className={`px-4 border border-dashed rounded-md h-[124px] w-full flex flex-col justify-center items-center cursor-pointer ${
                showFileError ? 'border-red-400' : 'hover:border-primary duration-300 focus-within:border-primary'
              }`}
              onClick={() => (imgProgress ? {} : fileInputRef.current.click())}
            >
              <div className="bg-blue-100 w-10 h-10 rounded-full flex justify-center items-center mb-2">
                <DocIcon />
              </div>
              {fileProgress ? (
                <div className={`h-1 mt-2 bg-blue-400 rounded-full self-start`} style={{ width: `${fileProgress}%` }} />
              ) : (
                <p className="text-center text-sm leading-6 font-medium">Fayl yuklash</p>
              )}
              <input
                hidden
                type="file"
                ref={fileInputRef}
                onChange={(event) =>
                  requestFileUpload({
                    event,
                    setProgress: setFileProgress,
                    onChange: (url) => {
                      setFileUrl((p) => [...p, url])
                    },
                  })
                }
              />
            </div>
            {showFileError && <p className="text-red-600 text-sm mt-1">To'ldirilishi shart</p>}
          </div>
          {/* <div
            className="grow px-4 border border-dashed rounded-md h-[124px] flex flex-col justify-center items-center cursor-pointer hover:border-primary duration-300 focus-within:border-primary"
            onClick={() => (fileProgress ? {} : imgInputRef.current.click())}
          >
            <div className="bg-[#fef8dc] w-10 h-10 rounded-full flex justify-center items-center mb-2">
              <PhotoSvgFiled />
            </div>
            {imgProgress ? (
              <div className={`h-1 mt-2 bg-blue-400 rounded-full self-start`} style={{ width: `${imgProgress}%` }} />
            ) : (
              <p className="text-center text-sm leading-6 font-medium">Rasm yuklash</p>
            )}
            <input
              hidden
              type="file"
              ref={imgInputRef}
              onChange={(event) =>
                requestPhotoUpload({
                  event,
                  setProgress: setImgProgress,
                  onChange: (url) => {
                    setFileUrl((p) => [...p, url])
                  },
                })
              }
            />
          </div> */}
        </div>
        <div className="grid grid-cols-12 gap-6 my-3">
          <div className="col-span-6 flex flex-wrap gap-2 justify-between">
            {fileUrl.length
              ? fileUrl.map((url) => (
                  <div className="flex items-center gap-1 cursor-pointer" key={url}>
                    <p className="relative">
                      <span onClick={() => fileDownloader(url)}>
                        <DocIcon />
                      </span>
                      <span
                        className="w-4 h-4 absolute -top-2 -left-2 rounded-full text-xs bg-red-400 text-center cursor-pointer"
                        onClick={() => setFileUrl((p) => p.filter((i) => i !== url))}
                      >
                        <Close fontSize="inherit" htmlColor="white" />
                      </span>
                    </p>
                    <span onClick={() => fileDownloader(url)} className="ml-1 text-xs">{`${url.slice(0, 6)}...${
                      url.split('.')[url.split('.').length - 1]
                    }`}</span>
                  </div>
                ))
              : null}
          </div>
          <div className="col-span-6 grid grid-cols-12 gap-3">
            {/* {imageUrl.length
              ? imageUrl.map((img) => (
                  <div className="h-12 col-span-6 relative" key={img}>
                    <span
                      className="w-4 h-4 absolute -top-2 -left-2 rounded-full text-xs bg-red-400 text-center cursor-pointer"
                      onClick={() => setImageUrl((p) => p.filter((i) => i !== img))}
                    >
                      <Close fontSize="inherit" htmlColor="white" />
                    </span>
                    <img
                      onClick={handleSliderOpen}
                      src={`${process.env.REACT_APP_CDN_IMAGE_URL}${img}`}
                      alt="rasm"
                      className="w-full h-full rounded-md"
                    />
                  </div>
                ))
              : null} */}
          </div>
        </div>
        {blocks?.length ? (
          <div className="border rounded-md mb-6">
            <div className={`p-4 flex justify-between ${showBlocks ? 'border-b' : ''}`}>
              <span className="leading-[26px] font-semibold">Topshirilgan bloklar</span>
              <span onClick={() => setShowBlocks((p) => !p)} className="cursor-pointer">
                {showBlocks ? (
                  <ArrowUpIcon className="w-8 h-8" color="#6E8BB7" />
                ) : (
                  <ArrowDownIcon className="w-8 h-8" color="#6E8BB7" />
                )}
              </span>
            </div>
            <AnimatePresence>
              {showBlocks && (
                <motion.div
                  initial={{ opacity: 0, display: 'none' }}
                  animate={{ opacity: 1, display: 'grid' }}
                  exit={{ opacity: 0, display: 'none' }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-12 gap-3 p-4"
                >
                  {blocks?.map((block) => (
                    <div key={block.id} className="bg-[#f6f6f6] rounded-md px-4 py-2.5 col-span-4 flex justify-between">
                      <span className="text-sm leading-6">{block.name}</span>
                      <span className="text-sm leading-6 border-l border-[#ddd] pl-4">
                        {dateFormatter(format, new Date(block.created_at), 'dd.MM.yyyy')}
                      </span>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : null}
        <BtnFiled className="w-full h-10" onClick={onInnerSubmit}>
          Yuborish
        </BtnFiled>
        <ImageSliderPreview handleClose={handleSliderClose} isOpen={isSliderOpen} images={imageUrl} />
      </div>
    </Modal>
  )
}

export default ObjectRejectModal
