import { format } from 'date-fns'
import { uz } from 'date-fns/locale'
import { useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'

import ImageSliderPreview from '../../../components/ImageSliderPriview'
import MobileSkleton from '../../../components/MobileSkleton'
import { useObject } from '../../../services'
import dateFormatter from '../../../utils/dateFormatter'
import { AuthJournalList } from '../../Inspector/Journal/AuthJournalList'

const MobileJournalLenta = () => {
  const { id } = useParams()
  const { pathname } = useLocation()
  const { objectLog } = useObject({ id, objectLogQueryProps: { enabled: !!id } })

  const [previewItem, setPreviewItem] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  return (
    <div className="p-4 mobile-header-calc">
      {pathname.includes('author-journal') ? (
        <AuthJournalList />
      ) : objectLog.isLoading ? (
        <MobileSkleton />
      ) : (
        objectLog.data?.object_logs?.map((item, index) => (
          <div key={item.id} className={index === 0 ? 'mt-2' : 'mt-6'}>
            <p className="text-sm leading-6 text-[#5B6871] mb-2">
              {dateFormatter(format,new Date(item.created_at), 'dd-MMMM', { locale: uz })}
            </p>
            <div className="bg-white p-3 rounded-md">
              <div className="p-3 border bg-[#f6f6f6] text-sm leading-6 text-[#5B6871] rounded-md">
                {item?.description}
              </div>
              <span className="input-label mt-2">Fayl</span>
              <div className="grid grid-cols-12 gap-3">
                {item?.object_images?.map((image) => (
                  <div className="col-span-4" key={image.key}>
                    <img
                      onClick={() => {
                        handleOpen()
                        setPreviewItem(item.object_images)
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
        ))
      )}
      <ImageSliderPreview images={previewItem} isOpen={isOpen} handleClose={handleClose} />
    </div>
  )
}

export default MobileJournalLenta
