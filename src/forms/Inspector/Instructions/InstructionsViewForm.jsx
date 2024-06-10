import { Modal } from '@mui/material'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { DownloadIcon, EyeIcon, PenaltyIcon, PersonIcon } from '../../../assets/icons'
import { BasicTable, BtnFiled, Card, Input, StatusTag, Tag } from '../../../components'
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined'
import AddIcon from '@mui/icons-material/Add'
import FileIcon from '../../../assets/images/file-icon.png'

import {
  ACT_TYPE_ID_EVENT,
  ACT_TYPE_ID_EVENT_APPROVED,
  ACT_TYPE_ID_EVENT_REJECTED,
  ACT_TYPE_ID_EXTENDATION_APPROVED,
  ACT_TYPE_ID_EXTENDATION_REJECTED,
  ADMINISTRATIVE_ADMINISTRATOR_ROLE_ID,
  BOSH_PRORAB_ROLE_ID,
  REGULATION_QURILISH_QATNASHUVCHILARI_TYPE_ID,
  REGULATION_STATUS_ID_IN_APPROVAL,
  TEXNIK_NAZORATCHI_ROLE_ID,
} from '../../../settings/constants'
import { regulationStatuses } from '../../../settings/status'
import phoneNumberFormatter from '../../../utils/phoneNumberFormatter'
import { permissions } from '../../../settings/permissions'
import ImageSliderPreview from '../../../components/ImageSliderPriview'
import { CustomDatePicker } from '../../../components/CustomDatePicker'
import fileDownloader from '../../../utils/fileDownloader'
import { useLocation } from 'react-router-dom'
import dateFormatter from '../../../utils/dateFormatter'

export function InstructionsViewForm({
  violationsStatus = [],
  setViolationStatus,
  deadlineError,
  actsByRegulation,
  navigate,
  disabled,
  deadline,
  setDeadline,
  instruction_id,
  violations,
  userId,
  regulation,
  instructionId,
  objectId,
  register,
  files,
  isNew = true,
}) {
  const activeTab = null
  const [isOpen, setIsOpen] = useState(false)
  const [previewItem, setPreviewItem] = useState('')
  const [images, setImages] = useState([])

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const { roleId } = useSelector((state) => state.auth)
  const status = regulationStatuses.find((item) => item.id === regulation?.regulation_status_id)
  const { pathname } = useLocation()

  useEffect(() => {
    if (violationsStatus && activeTab !== 0) {
      setViolationStatus(violationsStatus[activeTab - 1])
    }
  }, [activeTab])

  const headData = [
    {
      title: '№',
      key: 'order',
    },
    {
      title: 'Aniqlangan qoidabuzarlik',
      key: 'title',
    },
    {
      title: 'Bartaraf etish ijrosi',
      key: 'description',
    },
    {
      title: 'Blok',
      key: ['check_list_status', 'blocks'],
      render: (values) => (
        <div className="flex flex-col gap-2">
          {values[0] ? (
            values[1]?.map((item) => (
              <div
                key={item.id}
                className="bg-blue-tag_bg_color p-1 text-center rounded-[6px] text-[14px] text-primary font-medium"
              >
                {item.name}
              </div>
            ))
          ) : (
            <div className="bg-blue-tag_bg_color p-1 text-center rounded-[6px] text-[14px] text-primary font-medium">
              —
            </div>
          )}
        </div>
      ),
    },
    {
      title: 'Fotosuratlar',
      key: 'images',
      render: (images) => {
        let photos = []
        if (images) {
          photos = [...images]
        }
        return (
          <div
            className="grid grid-cols-2 gap-1 rounded-[8px] overflow-hidden"
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            {photos?.map((item, index) => (
              <div key={`${item}${index}`}>
                <img
                  onClick={() => {
                    handleOpen()
                    setImages(photos)
                  }}
                  src={`${process.env.REACT_APP_CDN_IMAGE_URL}${item}`}
                  alt="inspector"
                  className="w-full h-[40px] object-cover"
                />
              </div>
            ))}
          </div>
        )
      },
    },
    {
      title: 'Holati',
      key: 'check_list_status',
      render: (value) => {
        return <Tag color={value ? 'green' : 'red'} value={value ? "To'ldirilgan" : "To'ldirilmagan"} />
      },
    },
  ]

  const actHeadData = [
    {
      title: '№',
      key: 'order',
    },
    {
      title: 'Aniqlangan qoidabuzarlik',
      key: 'title',
    },
    {
      title: 'Izoh',
      key: 'comment',
      render: (value) => (value ? value : ''),
    },
    {
      title: 'Sana',
      key: 'created_at',
      render: (value) => value && dateFormatter(format, new Date(value), 'dd.MM.yyyy'),
    },
    {
      title: 'Holati',
      key: ['status', 'status_id'],
      render: (value) => <StatusTag statusId={value[1]} title={value[0]} />,
    },
    {
      title: "Ko'rish",
      key: 'id',
      render: (val) => (
        <div
          onClick={() =>
            setPreviewItem(
              actsByRegulation.data?.reduce((acc, cur) => [...acc, ...cur.data], [])?.find((i) => i.id === val)
            )
          }
          className="flex border bg-white p-1 rounded-md justify-center gap-2 hover:bg-gray-100 duration-300"
        >
          <EyeIcon />
          <span className="text-sm">Ko'rish</span>
        </div>
      ),
    },
  ]

  const deadlineDate = new Date(regulation?.deadline)
  deadlineDate.setHours(0, 0, 0, 0)
  const deadLineNow = new Date()
  deadLineNow.setHours(0, 0, 0, 0)
  // console.log(regulation?.guilty_user?.user_id === userId)
  // console.log('guilty:', regulation?.guilty_user?.user_id, 'user:', userId)
  return (
    <div>
      <div className="bg-white rounded-[6px]">
        <div className="p-4 flex justify-between items-start">
          <div className="flex items-center">
            <div className="w-[48px] h-[48px] rounded-full bg-primary flex items-center justify-center">
              <PenaltyIcon color="#fff" />
            </div>
            <div className="flex flex-col ml-3">
              <p className="text-[20px] font-semibold text-[#1A2024]">Yozma ko'rsatma</p>
              <div className="flex items-center">
                <p className="text-[14px]">
                  {`${
                    regulation?.created_at
                      ? dateFormatter(format, new Date(regulation.created_at), 'dd.MM.yyyy')
                      : '01.01.2022'
                  } -
                  ${
                    regulation?.deadline
                      ? dateFormatter(format, new Date(regulation.deadline), 'dd.MM.yyyy')
                      : '01.01.2022'
                  }`}
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-x-1.5">
            {(!pathname.includes('notifications') || !pathname.includes('notifications')) &&
            !pathname.includes('notifications')
              ? !pathname.includes('history/instructions') && <Tag color={status?.color} value={status?.status} />
              : null}
          </div>
        </div>
        <div>
          <div className="grid sm:grid-cols-12 gap-4 px-4">
            <div className="col-span-5">
              <p className="text-[14px] leading-6 font-semibold mb-2">Ko'rsatma beruvchi</p>
              <div className="sm:flex items-center justify-between px-4 py-3 bg-[#F6F6F6] rounded-[8px] sm:h-[64px]">
                <div>
                  <p className="text-[12px] text-[#48535B] leading-[18px]">{regulation?.user.role_name}</p>
                  <p className="text-[14px] leading-6">{regulation?.user.user_name}</p>
                </div>
                <p className="text-[14px] text-primary leading-6">{phoneNumberFormatter(regulation?.user?.phone)}</p>
              </div>
            </div>
            <div className="col-span-7 ">
              <p className="text-[14px] leading-6 font-semibold mb-2">Obyekt</p>
              <div className="text-[14px] sm:h-[64px] overflow-y-auto leading-6 text-black px-4 py-3 bg-[#F6F6F6] rounded-[8px]">
                {regulation?.object_name}
              </div>
            </div>
            <div className="col-span-12">
              <span className="input-label">Yopish muddati</span>
              <div className={`sm:w-1/5 rounded-md ${deadlineError ? '' : ''}`}>
                <CustomDatePicker
                  minDate={
                    roleId === BOSH_PRORAB_ROLE_ID
                      ? new Date()
                      : new Date(new Date(new Date().setDate(new Date().getDate() + 1)))
                  }
                  maxDate={new Date(new Date().setMonth(new Date().getMonth() + 2))}
                  disabled={disabled}
                  error={deadLineNow > deadlineDate}
                  date={deadline}
                  setDate={setDeadline}
                />
              </div>
            </div>
          </div>
          <div className="relative mt-3">
            {regulation?.guilty_user && (
              <div>
                <p className="text-lg leading-[22px] font-semibold p-4 border-t border-b">Ma'sul xodim</p>
                <div className="grid sm:grid-cols-5 gap-4 p-4">
                  <div
                    key={regulation.guilty_user?.user_id}
                    className="px-4 py-3 border border-borderColor rounded-[8px]"
                  >
                    <p className="leading-6 text-[16px] font-semibold mb-4">{regulation.guilty_user.role_name}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-9 h-9 rounded-full bg-[#E0EEFF] flex items-center justify-center">
                          <PersonIcon />
                        </div>
                        <div className="ml-2">
                          <p className="text-[14px] leading-[20px]">{regulation.guilty_user?.user_name}</p>
                          <p className="text-[12px] leading-[18px] mt-[2px] text-primary">
                            {phoneNumberFormatter(regulation.guilty_user?.phone)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {!isNew &&
                    permissions[roleId]?.includes('CHORA_TADBIR_BTN') &&
                    regulation?.guilty_user?.user_id === userId &&
                    status?.id !== REGULATION_STATUS_ID_IN_APPROVAL &&
                    regulation?.regulation_type_id !== REGULATION_QURILISH_QATNASHUVCHILARI_TYPE_ID &&
                    (((regulation?.act_status?.id === ACT_TYPE_ID_EVENT_REJECTED ||
                      regulation?.act_status?.id === ACT_TYPE_ID_EXTENDATION_REJECTED ||
                      regulation?.act_status?.id === ACT_TYPE_ID_EXTENDATION_APPROVED) &&
                      actsByRegulation.data?.length &&
                      !actsByRegulation.data[0].data?.some((i) => i.status_id === ACT_TYPE_ID_EVENT_APPROVED)) ||
                      !Object.values(regulation?.act_status).length) &&
                    deadlineDate >= deadLineNow && (
                      <div className="col-span-2 absolute bottom-4 right-4">
                        <BtnFiled
                          color="blue"
                          onClick={() => navigate(`/instructions/${instruction_id}/comment/${ACT_TYPE_ID_EVENT}`)}
                        >
                          Chora tadbir taqdim etish
                        </BtnFiled>
                      </div>
                    )}
                </div>
              </div>
            )}
            {roleId === ADMINISTRATIVE_ADMINISTRATOR_ROLE_ID && pathname.includes('history') && (
              <>
                <div className="mb-6">
                  <p className="text-lg leading-[22px] font-semibold p-4 border-t border-b">
                    Javobgarlikka tortilgan tashkilot
                  </p>
                  <div className="flex gap-x-4 p-4">
                    <div className="grow">
                      <span className="input-label">Tashkilot nomi</span>
                      <Input disabled widthFull wrapperClassName="mb-3" name="organization_name" register={register} />
                    </div>
                    <div className="grow">
                      <span className="input-label">STIRi</span>
                      <Input disabled widthFull wrapperClassName="mb-3" name="organization_stir" register={register} />
                    </div>
                  </div>
                </div>
                <div className="mb-6">
                  <p className="text-lg leading-[22px] font-semibold p-4 border-t border-b">
                    Javobgarlikka tortilgan shaxs
                  </p>
                  <div className="flex gap-x-4 p-4">
                    <div className="grow">
                      <span className="input-label">F.I.Sh</span>
                      <Input disabled widthFull wrapperClassName="mb-3" name="user_fullname" register={register} />
                    </div>
                    <div className="grow">
                      <span className="input-label">JShShIRi</span>
                      <Input disabled widthFull wrapperClassName="mb-3" name="user_jshshir" register={register} />
                    </div>
                    <div className="grow">
                      <span className="input-label">Lavozimi</span>
                      <Input disabled widthFull wrapperClassName="mb-3" name="user_role" register={register} />
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <p className="text-lg leading-[22px] font-semibold p-4 border-t border-b">
                      Ma'muriy javobgarlik buyrug'i
                    </p>
                    <div className="flex items-start justify-between p-4 gap-x-3">
                      <div className="mb-4 grow">
                        <span className="input-label mb-1">Qo’llanilgan modda</span>
                        <Input
                          disabled
                          widthFull
                          wrapperClassName="mb-3"
                          name="clause"
                          register={register}
                          required={true}
                        />
                        <span className="input-label mb-1">Jarima miqdori</span>
                        <Input
                          disabled
                          widthFull
                          wrapperClassName="mb-3"
                          name="clause_sum"
                          register={register}
                          required={true}
                        />
                        <span className="input-label mb-1">Qo’llanilgan sana</span>
                        <Input
                          disabled
                          widthFull
                          wrapperClassName="mb-3"
                          name="clause_date"
                          register={register}
                          required={true}
                        />
                      </div>
                      <div className="grow">
                        <span className="input-label">Buyruq fayli</span>
                        {files?.map((file) => (
                          <div className="flex items-center border-b-2 gap-x-2 bg-[#F4F6FA] p-2 rounded">
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
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Card className="mt-4" title="Qoidabuzarlik" bodyClassName="p-4">
        <BasicTable
          heightFit
          headColumns={headData}
          bodyColumns={violations?.data?.violations}
          rowLink={
            pathname.includes('technician') || roleId === TEXNIK_NAZORATCHI_ROLE_ID
              ? `/inspectors/${objectId}/instructions/${instructionId}/violation/monitoring`
              : pathname.includes('notifications')
              ? `/notifications/${objectId}/instructions/${instructionId}/violation`
              : `/inspectors/${objectId}/instructions/${instructionId}/violation`
          }
          isLoading={violations.isLoading}
        />
      </Card>
      {actsByRegulation?.data?.map((item) =>
        item.data.length ? (
          <div key={item.key}>
            <Card
              className="mt-4"
              title={
                (item.key === 'act' && 'Dalolatnoma') ||
                (item.key === 'extendation' && 'Muddat uzaytirish') ||
                (item.key === 'events' && 'Chora tadbirlar')
              }
              bodyClassName="p-4"
            >
              <BasicTable
                heightFit
                isLoading={actsByRegulation.isLoading}
                headColumns={item.key === 'extendation' ? actHeadData.filter((i) => i.key !== 'title') : actHeadData}
                bodyColumns={item.data}
              />
            </Card>
          </div>
        ) : null
      )}
      <Modal
        open={!!Object.values(previewItem).length}
        onClose={() => setPreviewItem([])}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="h-full flex justify-center items-center"
      >
        <div className="mt-4 w-3/5 outline-none">
          <Card
            className="w-full"
            title={previewItem?.act_type?.type}
            bodyClassName="p-4"
            rightElement={
              <div className="hover:scale-110 duration-300" onClick={() => setPreviewItem([])}>
                <AddIcon className="rotate-45 cursor-pointer" fontSize="large" />
              </div>
            }
          >
            <div className="flex justify-between gap-3">
              <div className="w-1/2 grow-1">
                <div className="mb-3">
                  <span className="text-base font-semibold">Muddati</span>
                  <p className="text-sm mt-1">
                    {previewItem?.created_at && dateFormatter(format, new Date(previewItem.created_at), 'dd.MM.yyyy')}
                  </p>
                </div>
                {previewItem?.comment && (
                  <div className="mb-3">
                    <span className="text-base font-semibold">Izoh</span>
                    <p className="text-sm mt-1">{previewItem?.comment}</p>
                  </div>
                )}
                <div className="mb-3">
                  <span className="text-base font-semibold">Aniqlangan qoidabuzarlik</span>
                  <p className="text-sm mt-1">{previewItem?.title}</p>
                </div>
                <div>
                  <span className="text-base font-semibold">Holati</span>
                  <StatusTag className="mt-2" statusId={previewItem?.status_id} title={previewItem?.status} />
                </div>
              </div>
              {previewItem?.images?.length || previewItem.files?.length ? (
                <div className="w-1/2 grid grid-cols-12 gap-2 relative">
                  {previewItem.images?.map((i) => (
                    <div className="col-span-4" key={i}>
                      <img
                        onClick={handleOpen}
                        className="w-full rounded-md"
                        src={`${process.env.REACT_APP_CDN_IMAGE_URL}${i}`}
                        alt="qoidabuzarlik"
                      />
                    </div>
                  ))}
                  {previewItem.files?.length ? (
                    <div
                      className="flex items-center gap-2 absolute bottom-0 left-0 text-xs inline-block cursor-pointer inline-block"
                      onClick={() => {
                        previewItem.files[0] && fileDownloader(previewItem.files[0])
                      }}
                    >
                      <span>
                        <InsertDriveFileOutlinedIcon />
                      </span>
                      {previewItem.files[0]}
                    </div>
                  ) : null}
                </div>
              ) : (
                <div className="flex justify-center items-center w-1/2 rounded-md bg-gray-100">Fayllar topilmadi</div>
              )}
            </div>
          </Card>
        </div>
      </Modal>
      <ImageSliderPreview
        isOpen={isOpen}
        handleClose={handleClose}
        images={previewItem ? previewItem?.images : images}
      />
    </div>
  )
}
