import { Card, Checkbox, ImageViewer, Input, PhotoUpload, Textarea } from '../../../components'
import ClearIcon from '@mui/icons-material/Clear'
import { useState } from 'react'
import ImageSliderPreview from '../../../components/ImageSliderPriview'
import { permissions } from '../../../settings/permissions'
import { TEXNIK_NAZORATCHI_ROLE_ID } from '../../../settings/constants'
import { useParams } from 'react-router-dom'
import { CustomDatePicker } from '../../../components/CustomDatePicker'
import CustomMuiDatePicker from '../../../components/CustomMuiDatePicker'

export function ViolationForm({
  register,
  setValue,
  roleId,
  watch,
  disabled,
  isBlockDisabled,
  fields,
  regulationNumber,
  canCheck,
  control,
}) {
  const [currentImage, setCurrentImage] = useState(undefined)
  const [isOpen, setIsOpen] = useState(false)
  const [imgUrl, setImgUrl] = useState('')
  const { violation_id } = useParams()
  const handleModalOpen = () => setIsOpen(true)
  const handleModalClose = () => setIsOpen(false)

  // const isDisable = (item) => (roleId === TEXNIK_NAZORATCHI_ROLE_ID && !item.name ? false : )

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="md:col-span-7 col-span-12">
        <Card
          title={!!violation_id ? "Yozma ko'rsatma raqami" : "Yozma ko'rsatnoma"}
          rightElement={regulationNumber || ''}
        >
          <div className="mb-4">
            <span className="input-label mb-1">Aniqlangan qoidabuzarlik</span>
            <Input widthFull register={register} name="title" disabled={disabled} />
          </div>

          <div className="mb-4">
            <span className="input-label mb-1">Berilgan ko'rsatma</span>
            <Textarea widthFull register={register} name="description" disabled={disabled} />
          </div>
          <div className="mb-4">
            <span className="input-label mb-1">Asoslovchi me'yoriy hujjat</span>
            <Textarea widthFull register={register} name="snip" disabled={disabled} />
          </div>
          {!violation_id && (
            <div className="mb-4">
              <span className="input-label mb-1">Muddati</span>
              <CustomMuiDatePicker control={control} name="deadline" disabled={disabled} />
            </div>
          )}
          <div className="mb-4">
            {fields?.length && (
              <>
                <span className="input-label mb-1">Blok</span>
                <div className="flex flex-col gap-4">
                  {fields?.map((item, index) => {
                    return item?.is_send ? null : (
                      <div key={item.id} className="py-3 px-4 bg-[#F6F6F6] flex items-center rounded-[8px]">
                        <div className="pr-4 border-r border-borderColor flex items-center">
                          <Checkbox
                            name={`blocks.${index}.value`}
                            register={register}
                            disabled={!canCheck}
                            // required={true}
                          />
                          <p className="ml-4 text-[14px] text-[#000]">{item.number}</p>
                        </div>
                        <p className="ml-4 text-[14px]">{item.name}</p>
                      </div>
                    )
                  })}
                </div>
              </>
            )}
          </div>
        </Card>
      </div>
      <div className="md:col-span-5 col-span-12 ">
        <Card title="Fotosuratlar">
          {permissions[roleId]?.includes('OBJECTS/INSTRUCTIONS/VIOLATIONS/PHOTO_ADD') ? (
            <div className="grid grid-cols-2 gap-3">
              {!disabled && !isBlockDisabled && (
                <PhotoUpload onChange={(value) => setValue('images', [...(watch('images') || []), value])} />
              )}
              {watch('images')?.map((item, index) => (
                <div
                  key={item}
                  onClick={() => setCurrentImage(index)}
                  className="h-[80px] rounded-[8px] relative overflow-hidden cursor-pointer col-span-1"
                >
                  <img
                    src={`${process.env.REACT_APP_CDN_IMAGE_URL}${item}`}
                    alt="inspector"
                    className="w-full h-full object-cover duration-700 transition-all scale-100 hover:scale-125"
                  />
                  {!disabled && !isBlockDisabled && (
                    <div
                      onClick={() =>
                        setValue(
                          'images',
                          watch('images')?.filter((filename) => filename !== item)
                        )
                      }
                      className="cursor-pointer h-[20px] w-[20px] close-bg rounded-full flex items-center justify-center absolute top-[10px] right-[10px] transition-all scale-100 hover:scale-125"
                    >
                      <ClearIcon style={{ fontSize: '12px' }} className="text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-12 gap-3">
              {watch('images')?.map((item, index) => (
                <div
                  key={`${item}${index}`}
                  onClick={() => {
                    setImgUrl(item)
                    handleModalOpen()
                  }}
                  className="col-span-6 rounded-md overflow-hidden h-[105px]"
                >
                  <img src={`${process.env.REACT_APP_CDN_IMAGE_URL}${item}`} className="object-fit" alt="violation" />
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
      <ImageSliderPreview isOpen={isOpen} handleClose={handleModalClose} images={watch('images')} />
      <ImageViewer photos={watch('images')} currentImage={currentImage} setCurrentImage={setCurrentImage} />
    </div>
  )
}
