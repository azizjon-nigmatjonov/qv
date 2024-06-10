import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { format } from 'date-fns'
import uz from 'date-fns/esm/locale/uz/index.js'
import { useForm } from 'react-hook-form'
import { Save } from '@mui/icons-material'
import ClearIcon from '@mui/icons-material/Clear'
import toast from 'react-hot-toast'
import * as yup from 'yup'

import { BtnFiled, FilterHeader, Header, Input, PhotoUpload, Tabs, Textarea } from '../../../components'
import MonthPicker from '../../../components/MonthPicker'
import DefaultImage from '../../../assets/images/inspector.jpg'
import { permissions } from '../../../settings/permissions'
import { useObject } from '../../../services'
import { useYupValidationResolver } from '../../../hooks/useYupValidationResolver'
import { validations } from '../../../validations'
import ImageSliderPreview from '../../../components/ImageSliderPriview'
import dateFormatter from '../../../utils/dateFormatter'

export function JournalLenta() {
  const { id, journal_id } = useParams()
  const { pathname } = useLocation()
  const { roleId, userId } = useSelector((state) => state.auth)

  const schema = yup.object({
    title: validations.string,
    description: validations.string,
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
    },
    resolver: useYupValidationResolver(schema),
  })

  const [isOpen, setIsOpen] = useState(false)
  const [previewItem, setPreviewItem] = useState([])
  const [images, setImages] = useState([])
  const [errorImage, setErrorImage] = useState(false)

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const [date, setDate] = useState({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  })

  const tabLinks = [
    {
      key: 'main-data',
      title: "Asosiy ma'lumotlar",
      path: `/inspectors/${id}`,
    },
    {
      key: 'hujjatlar',
      title: 'Hujjatlar',
      path: `/inspectors/${id}/documents`,
    },
    {
      key: 'monitoring',
      title: 'Monitoring',
      path: `/inspectors/${id}/monitoring`,
    },
    {
      key: 'instructions',
      title: "Yozma ko'rsatmalar",
      path: `/inspectors/${id}/instructions`,
    },
    {
      key: 'journal',
      title: 'Ijro hujjatlari',
      path: `/inspectors/${id}/journal`,
    },
    {
      key: 'photo-reports',
      title: 'Foto hisobot',
      path: `/inspectors/${id}/photo-reports`,
    },
  ]

  const { objectLog, createObjectLogMutation } = useObject({
    id,
    offset: 1,
    limit: 10,
    objectLogQueryProps: {
      enabled: true,
    },
    objectLogMutationProps: {
      onSuccess: () => {
        toast.success("Muvaffaqiyatli qo'shildi")
        objectLog.refetch()
        reset({ title: '', description: '' })
        setImages([])
      },
    },
  })

  const onSave = (data) => {
    if (images.length === 0) {
      setErrorImage(true)
    } else {
      setErrorImage(false)
      createObjectLogMutation.mutate({
        category_id: journal_id,
        description: data.description,
        object_id: id,
        object_images: images,
        title: data.title,
        user_id: userId,
      })
    }
  }

  return (
    <div className="h-screen">
      <form onSubmit={handleSubmit(onSave)}>
        <Header
          title={pathname.includes('photo-report') ? '' : 'Umumiy ish jurnali'}
          backLink={-1}
          centerElement={
            pathname.includes('photo-report') && (
              <Tabs
                elements={
                  permissions[roleId]?.includes('MONITORING_TAB')
                    ? tabLinks
                    : tabLinks.filter((i) => i.key !== 'monitoring')
                }
              />
            )
          }
          rightElement={
            permissions[roleId]?.includes('UMUMIY_JOURNAL') && (
              <BtnFiled leftIcon={<Save />} type="submit">
                Saqlash
              </BtnFiled>
            )
          }
        />
        <FilterHeader leftElements={[<MonthPicker date={date} setDate={setDate} />]} />
        <div className="sidebar-header-filter-calc">
          {permissions[roleId]?.includes('UMUMIY_JOURNAL') && (
            <div className="p-4 rounded-md bg-white">
              <div className="border rounded-t-md">
                <div className="bg-gray-100 rounded-t-md py-1 mb-2 border-b">
                  <p className="text-sm text-[#303940] text-center font-bold">
                    {dateFormatter(format,new Date(), 'dd-MMMM', { locale: uz })}
                  </p>
                </div>
                <div className="bg-white p-3 rounded-t-md">
                  <span className="input-label">Sarlavha</span>
                  <Input name="title" register={register} widthFull />
                  <span className="text-red-400 text-sm">{errors?.title?.message}</span>
                  <span className="input-label mt-2">Izoh</span>
                  <Textarea rows={4} widthFull register={register} name="description" />
                  <span className="text-red-400 text-sm">{errors?.description?.message}</span>
                  <span className="input-label mt-2">Fayl</span>
                  <div className="grid grid-cols-12 gap-3">
                    <div className="col-span-3">
                      <PhotoUpload onChange={(e) => setImages((p) => [...p, e])} />
                      {errorImage ? <span className="text-red-400 text-sm">To'ldirilishi shart maydon</span> : ''}
                    </div>
                    <div className="col-span-9 grid grid-cols-12 gap-4 overflow-hidden rounded-md">
                      {images.length
                        ? images.map((image) => (
                            <div key={image} className="col-span-4 relative">
                              <img
                                onClick={() => {
                                  setPreviewItem(images)
                                  handleOpen()
                                }}
                                className="rounded-md  h-[88px] w-full object-cover"
                                src={`${process.env.REACT_APP_CDN_IMAGE_URL}${image}`}
                                alt="report"
                              />
                              <div
                                onClick={() => setImages((p) => p.filter((i) => i !== image))}
                                className="cursor-pointer h-[20px] w-[20px] close-bg rounded-full flex items-center justify-center absolute top-[10px] right-[10px] transition-all scale-100 hover:scale-125"
                              >
                                <ClearIcon style={{ fontSize: '12px' }} className="text-white" />
                              </div>
                            </div>
                          ))
                        : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {objectLog.data?.object_logs?.length ? (
            objectLog.data?.object_logs.map((item, index, array) => (
              <div
                key={item.id}
                className={`border ${permissions[roleId]?.includes('UMUMIY_JOURNAL') ? 'border-t-0' : ''} bg-white ${
                  index === array.length - 1 ? 'rounded-b-md' : ''
                }`}
              >
                <div
                  className={`bg-gray-100 font-bold text-[#303940] rounded-b-none text-center py-1 border-b mb-4 text-sm`}
                >
                  {dateFormatter(format,new Date(item.created_at), 'dd-MMMM')}
                </div>
                <div className="mb-4 px-4">
                  <span className="input-label">Sarlavha</span>
                  <div className="border break-words rounded-md py-2 px-4 text-sm">{item.title}</div>
                </div>
                {item?.description && (
                  <div className="px-4">
                    <span className="input-label">Izoh</span>
                    <div className="break-words bg-gray-100 border rounded-md p-4 text-sm mb-4 mx-4 text-[#5B6871]">
                      {item.description}
                    </div>
                  </div>
                )}
                <div className="mb-4 px-4">
                  <span className="input-label">Foto</span>
                  <div className="w-full grid grid-cols-12 gap-2">
                    {item?.object_images?.length ? (
                      item.object_images.map((img) => (
                        <img
                          onClick={() => {
                            setPreviewItem(item.object_images)
                            handleOpen()
                          }}
                          className="col-span-2 rounded-md"
                          src={`${process.env.REACT_APP_CDN_IMAGE_URL}${img}`}
                          key={img}
                          alt="lenta"
                        />
                      ))
                    ) : (
                      <img className="col-span-2" src={DefaultImage} alt="Preview" />
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="h-full bg-white rounded-md text-16 font-medium flex justify-center items-center">
              Malumotlar mavjud emas
            </div>
          )}
        </div>
      </form>
      <ImageSliderPreview images={previewItem} isOpen={isOpen} handleClose={handleClose} />
    </div>
  )
}
