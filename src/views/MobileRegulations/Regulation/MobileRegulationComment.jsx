import { useEffect, useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined'

import { CancelIcon, SaveIcon } from '../../../assets/icons'
import { BtnFiled, BtnOutlined, Card, FileUpload, Header, Textarea } from '../../../components'
import ImageSliderPreview from '../../../components/ImageSliderPriview'
import { useViolation } from '../../../services'
import { ACT_TYPE_ID_EVENT, ACT_TYPE_ID_ACT, ACT_TYPE_ID_EXTENDATION } from '../../../settings/constants'
import MobilePhotoReport from '../../MobileObjects/tabs/MobilePhotoReport'
import { MobileFilterHeader } from '../../../components/FilterHeader/MobileFilterHeader'
import { FileView } from '../../../components/FileView/FileView'
import MobileBottomElm from '../../../components/MobileBottomElm'

export default function MobileregulationComment() {
  const { instruction_id, act_type } = useParams()
  const { userId } = useSelector((state) => state.auth)

  const [isOpen, setIsOpen] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)

  const navigate = useNavigate()

  const { violations } = useViolation({ regulationId: instruction_id })

  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
    watch,
    getValues,
  } = useForm({
    defaultValues: { test: [] },
  })

  const { fields } = useFieldArray({
    control,
    name: 'test',
  })

  useEffect(() => {
    if (violations?.data?.violations?.length) {
      act_type !== ACT_TYPE_ID_EXTENDATION
        ? reset({
            test: violations.data.violations.map((item) => ({
              id: item.id,
              title: item.title,
              deadline: item.deadline,
              images: [],
              file: '',
            })),
          })
        : reset({
            test: [
              {
                id: violations.data.violations[0].id,
                title: '',
                images: [],
                file: '',
              },
            ],
          })
    }
  }, [violations?.data?.violations, reset, act_type])

  useEffect(() => () => setIsDisabled(false), [])

  const { createMutationAct } = useViolation({
    createActMutationProps: {
      onSuccess: () => {
        navigate(-1)
      },
    },
  })

  const onSubmit = (data) => {
    setIsDisabled(true)
    createMutationAct.mutate({
      act_type,
      acts: data.test.map((item) => ({
        comment: item.description,
        violation_id: item.id,
        images: item.images,
        files: [item.file],
      })),
      regulation_id: instruction_id,
      user_id: userId,
    })
  }

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <MobileFilterHeader
        title={`${act_type === ACT_TYPE_ID_EVENT ? 'Chora tadbir taqdim etish' : ''}${
          act_type === ACT_TYPE_ID_EXTENDATION ? 'Muddat uzaytirish' : ''
        }${act_type === ACT_TYPE_ID_ACT ? 'Dalolatnoma rasmiylashtirish' : ''}`}
        // rightElement={
        //   <div className="flex items-center gap-[12px]">
        //     <BtnOutlined leftIcon={<CancelIcon />} color="red" onClick={() => navigate(-1)}>
        //       Bekor qilish
        //     </BtnOutlined>
        //     <BtnFiled disabled={isDisabled} color="blue" type="submit" leftIcon={<SaveIcon />}>
        //       Saqlash
        //     </BtnFiled>
        //   </div>
        // }
      />
      <div className="mobile-header-title-calc p-4 flex flex-col gap-4">
        {fields.length > 0 &&
          fields.map((field, index) => (
            <div key={field.id} className={`grid grid-cols-12 bg-white rounded-md p-4`}>
              {act_type !== ACT_TYPE_ID_EXTENDATION && (
                <>
                  <div className="col-span-12 font-semibold mb-4">Aniqlangan qoidabuzarliklar</div>
                  <div className="col-span-12 border border-[#E5E9EB] rounded-md bg-[#F6F8F9] py-[8px] px-[16px] mb-4">
                    <p className="text-sm text-[#5B6871]">{field?.title}</p>
                  </div>
                </>
              )}
              <div className={`col-span-12  font-semibold mb-4`}>Izoh</div>
              <div className={`col-span-12 mb-4`}>
                <Textarea
                  register={register}
                  required
                  name={`test.${index}.description`}
                  className="h-full"
                  errors={errors}
                  widthFull
                  heightFull
                />
              </div>
              <div className="col-span-12 font-semibold">Fayllar</div>
              <div className="col-span-12">
                {watch(`test.${index}.file`) ? (
                  <div className="text-xs gap-2 flex items-center mb-2 cursor-pointer relative w-full">
                    <FileView
                      className="w-full"
                      fileName={watch(`test.${index}.file`)?.slice(-21)}
                      ownLink="https://test.cdn.ccnis.uz/files"
                    />
                    {/* <span>
                        <InsertDriveFileOutlinedIcon />
                      </span>
                      {watch(`test.${index}.file`)?.slice(-21)}
                      <div
                        className="absolute -top-1.5  w-5 h-5 p-px -right-1.5 bg-gray-100 rounded-full cursor-pointer flex justify-center items-center"
                        onClick={() => setValue(`test.${index}.file`, '')}
                      >
                        <CancelIcon />
                      </div> */}
                  </div>
                ) : null}
                <div className="grid grid-cols-12 gap-[2px] w-fit rounded-md">
                  {watch(`test.${index}.images`)?.map((elem, elemIndex) => (
                    <div key={`${elemIndex}${index}`} className="relative">
                      <div
                        className="absolute -top-1.5  w-5 h-5 p-px -right-1.5 bg-gray-100 rounded-full cursor-pointer flex justify-center items-center"
                        onClick={() =>
                          setValue(
                            `test.${index}.images`,
                            watch(`test.${index}.images`).filter((i) => i !== elem)
                          )
                        }
                      >
                        <CancelIcon />
                      </div>
                      <img
                        alt={elem}
                        onClick={handleOpen}
                        className="col-span-4 h-10 rounded-md"
                        src={`${process.env.REACT_APP_CDN_IMAGE_URL}${elem}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-span-12 px-3 py-2">
                <div className="bg-white border rounded-md p-1 cursor-pointer hover:bg-gray-100 duration-300">
                  <FileUpload
                    required
                    watch={watch}
                    setValue={setValue}
                    register={register}
                    widthFull
                    nameImage={`test.${index}.images`}
                    nameFile={`test.${index}.file`}
                  />
                </div>
              </div>
              <ImageSliderPreview
                isOpen={isOpen}
                handleClose={handleClose}
                images={getValues(`test.${index}.images`)}
              />
            </div>
          ))}
      </div>
      <MobileBottomElm>
        <div className="flex w-full items-center gap-[12px]">
          <BtnOutlined className="w-full" leftIcon={<CancelIcon />} color="red" onClick={() => navigate(-1)}>
            Bekor qilish
          </BtnOutlined>
          <BtnFiled className="w-full" disabled={isDisabled} color="blue" type="submit" leftIcon={<SaveIcon />}>
            Saqlash
          </BtnFiled>
        </div>
      </MobileBottomElm>
    </form>
  )
}
