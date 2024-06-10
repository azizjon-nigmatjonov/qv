import { format } from 'date-fns'
import uz from 'date-fns/esm/locale/uz/index.js'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { BtnFiled, PhotoUpload } from '../../../components'
import ImageSliderPreview from '../../../components/ImageSliderPriview'
import { useObject } from '../../../services'
import dateFormatter from '../../../utils/dateFormatter'

const MobilePhotoReport = () => {
  const { id } = useParams()
  const { userId } = useSelector((state) => state.auth)

  const [images, setImages] = useState([])
  const [previewItem, setPreviewItem] = useState([])
  const [value, setValue] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [valueError, setValueError] = useState(false)

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const { objectPhotoReports, createMutationPhotoReport } = useObject({
    id,
    user_id: userId,
    createMutationProps: {
      onSuccess: () => {
        objectPhotoReports.refetch()
        toast.success("Muvaffaqiyatli qo'shildi")
        setValue('')
        setImages([])
      },
    },
    objectPhotoReportsProps: {
      enabled: !!id,
    },
  })

  const onSave = () => {
    if (value) {
      createMutationPhotoReport.mutate({
        comment: value,
        object_id: id,
        photos: images,
        user_id: userId,
      })
    } else {
      setValueError(true)
    }
  }

  return (
    <div className="relative">
      <div className="mobile-header-calc p-4 bg-[#f6f6f6]">
        <div>
          <p className="text-sm leading-6 text-[#5B6871] mb-2">
            {dateFormatter(format, new Date(), 'dd-MMMM', { locale: uz })}
          </p>
          <div className="bg-white p-3 rounded-md">
            <textarea
              rows={4}
              className="border flex w-full border-borderColor hover:border-primary p-3 outline-none duration-500 rounded-[6px] focus-within:border-primary"
              onChange={(e) => setValue(e.target.value)}
              value={value}
            />
            {valueError ? <div className="mt-1 text-sm font-medium text-red-500">To'ldirilishi shart</div> : null}
            <span className="input-label mt-2">Fayl</span>
            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-4">
                <PhotoUpload onChange={(e) => setImages((p) => [...p, e])} />
              </div>
              {images.length
                ? images.map((image) => (
                    <div key={image} className="col-span-6 h-[88px]">
                      <img
                        onClick={() => {
                          handleOpen()
                          setPreviewItem(images.photos)
                        }}
                        className="rounded-md h-full"
                        src={`${process.env.REACT_APP_CDN_IMAGE_URL}${image}`}
                        alt="report"
                      />
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
        {objectPhotoReports.data?.photo_reports?.map((item) => (
          <div key={item.id} className="mt-6">
            <p className="text-sm leading-6 text-[#5B6871] mb-2">
              {dateFormatter(format, new Date(item.created_at), 'dd-MMMM', { locale: uz })}
            </p>
            <div className="bg-white p-3 rounded-md">
              <div className="p-3 border bg-[#f6f6f6] text-sm leading-6 text-[#5B6871] rounded-md">{item?.comment}</div>
              <span className="input-label mt-2">Fayl</span>
              <div className="grid grid-cols-12 gap-3">
                {item?.photos?.map((image) => (
                  <div className="col-span-4" key={image.key}>
                    <img
                      onClick={() => {
                        handleOpen()
                        setPreviewItem(item.photos)
                      }}
                      className="rounded-md h-[120px]"
                      src={`${process.env.REACT_APP_CDN_IMAGE_URL}${image}`}
                      alt="report"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      {(images.length || value) && (
        <div className="fixed bottom-0 bg-white w-full p-4 shadow-lg shadow-black">
          <BtnFiled className="w-full" onClick={onSave}>
            Saqlash
          </BtnFiled>
        </div>
      )}
      <ImageSliderPreview images={previewItem} isOpen={isOpen} handleClose={handleClose} />
    </div>
  )
}

export default MobilePhotoReport
