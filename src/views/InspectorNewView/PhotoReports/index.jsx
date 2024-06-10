import { format } from 'date-fns'
import { uz } from 'date-fns/locale'
import { useState } from 'react'

import { useParams } from 'react-router-dom'
import { useObject } from '../../../services'
import MonthPicker from '../../../components/MonthPicker'
import dateFormatter from '../../../utils/dateFormatter'
import ImageSliderPreview from '../../../components/ImageSliderPriview'
import NoDataPng from '../../../assets/images/no-data.png'
import { BasicLayout, FilterHeader } from '../../../components'

const PhotoReportsV2 = () => {
  const { id } = useParams()

  const [isOpen, setIsOpen] = useState(false)
  const [photos, setPhotos] = useState([])
  const [date, setDate] = useState({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  })

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const { objectPhotoReports } = useObject({
    region_id: id,
    objectPhotoReportsProps: {
      enabled: !!id,
    },
    id,
  })

  return (
    <div className="h-screen">
      <FilterHeader leftElements={[<MonthPicker date={date} setDate={setDate} />]} />
      <div className="sidebar-header-filter-calc">
        <BasicLayout title="Foto hisobot">
          <div className="bg-white m-4 rounded-md overflow-y-auto">
            {objectPhotoReports.data?.photo_reports?.length ? (
              <div className="border rounded-md overflow-hidden">
                {objectPhotoReports.data?.photo_reports?.map((item, index) => (
                  <div key={item.id} className="">
                    <div
                      className={`text-[12px] leading-6 font-bold text-center py-1 text-[#5B6871] bg-[#F6F8F9] border-b ${
                        index !== 0 ? 'border-t' : ''
                      }`}
                    >
                      {dateFormatter(format, new Date(item.created_at), 'dd-MMMM', { locale: uz })}
                    </div>
                    <div className="bg-white p-4 rounded-md">
                      <div className="p-3 border bg-[#F6F8F9] text-sm leading-6 text-[#5B6871] rounded-md">
                        {item?.comment}
                      </div>
                      <span className="input-label mt-2">Foto</span>
                      <div className="grid grid-cols-12 gap-3">
                        {item?.photos?.map((image) => (
                          <div
                            className="col-span-2"
                            key={image}
                            onClick={() => {
                              handleOpen()
                              setPhotos(item.photos)
                            }}
                          >
                            <img
                              className="rounded-md h-full"
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
            ) : (
              <div className="h-full text-center flex justify-center items-center w-full text-[18px] font-[500] opacity-50 py-10">
                <div>
                  <img
                    className="mx-auto mb-5 pointer-events-none"
                    width={200}
                    src={NoDataPng}
                    alt="Ma'lumot topilmadi"
                  />
                  <p>Malumotlar mavjud emas</p>
                </div>
              </div>
            )}
          </div>
        </BasicLayout>
        <ImageSliderPreview isOpen={isOpen} handleClose={handleClose} images={photos} />
      </div>
    </div>
  )
}

export default PhotoReportsV2
