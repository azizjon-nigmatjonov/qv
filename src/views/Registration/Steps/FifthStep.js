import { useState } from 'react'
import { Modal } from '@mui/material'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant'
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined'

import { BtnFiled, BtnOutlined, Card, Input, Textarea } from '../../../components'
import ConfirmModal from '../../../components/ConfirmModal'
import ImageSliderPreview from '../../../components/ImageSliderPriview'
import { BigDoneIcon, CancelIcon, DownloadIcon } from '../../../assets/icons'
import { permissions } from '../../../settings/permissions'
import { useAdministrativeUpdate } from '../../../services/administrative'
import { useNavigate } from 'react-router-dom'
import { administrativeStatuses, REPUBLIC_APPARAT_ROLE_ID } from '../../../settings/constants'
import { FileUploadModal } from '../../../components/FileUploadModal'
import { ModalPortal } from '../../../components/Portal/ModalPortal'
import fileDownloader from '../../../utils/fileDownloader'
import FileIcon from '../../../assets/images/file-icon.png'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { addZero } from '../../../utils/addZero'
import { validations } from '../../../validations'
import { useYupValidationResolver } from '../../../hooks/useYupValidationResolver'
import { InfoIconForModal } from '../../../assets/icons/icons'
import { ConnectLabContractModal } from '../../../components/ConnectLabContractModal'
import StatusModal from '../../../components/StatusModal'

const FifthStep = ({
  register,
  onSubmitAccept,
  scrollToEl,
  pathname,
  registration,
  isDisabled,
  onSubmitAcceptReject,
  roleId,
  id,
  isLinear,
  administrativeId,
  userId,
  administrativeStatusId,
  canCancel,
  taskId,
}) => {
  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(false)
  const [isOpenConfirmAccept, setIsOpenConfirmAccept] = useState(false)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [confirmAcceptTitle, setConfirmAcceptTitle] = useState('Obyektni tizimga kiritishni tasdiqlaysizmi')
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [isOpenConfirmLab, setIsOpenConfirmLab] = useState(false)
  const [isFileUploaderOpen, setIsFileUploaderOpen] = useState(false)
  const [isToCourt, setIsToCourt] = useState(false)
  const [isOpenConnectLab, setIsOpenConnectLab] = useState(false)
  const [selectedContract, setSelectedContract] = useState(null)
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false)

  const [date, setDate] = useState(new Date())
  const [fileNames, setFileNames] = useState([])

  const [value, setValue] = useState('')

  const handleFileUploadClose = () => setIsFileUploaderOpen(false)

  const handleSuccessModalClose = () => setIsSuccessModalOpen(false)

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const handleOpenConfirm = () => setIsOpenConfirmAccept(true)
  const handleCloseConfirmAccept = () => setIsOpenConfirmAccept(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const handleModalOpen = () => setIsOpenModal(true)
  const handleModalClose = () => setIsOpenModal(false)
  const handleAcceptRegistration = () => {
    console.log('pressed')
    setIsOpenConfirmAccept(false)
    setIsOpenConfirmLab(true)
    setConfirmAcceptTitle(
      'Ushbu obyekt Qurilish Davlat Nazorati Inspeksiyasining Laboratoriyasida ro’yxatdan o’tganmi?'
    )
    // onSubmitAccept()
  }
  const handleAcceptLab = () => {
    setIsOpenConfirmLab(false)
    setConfirmAcceptTitle('Obyektni tizimga kiritishni tasdiqlaysizmi')
    setIsOpenConnectLab(true)
  }
  const handleConnectLabToObject = () => {
    console.log(selectedContract)
    setIsOpenConnectLab(false)
    setIsStatusModalOpen(true)
  }

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState('')

  const isAdministrationAdmin = permissions[roleId].includes('ADMINISTRATIVE/ADMINISTRATOR')
  const schema = yup.object({
    penalty: validations.number,
  })
  const {
    handleSubmit,
    register: register2,
    getValues,
    formState: { errors },
    setError,
  } = useForm({
    resolver: useYupValidationResolver(schema),
    mode: 'onBlur',
  })

  const { updateAdministrativeMutation } = useAdministrativeUpdate({
    updateAdministrativeMutationProps: {
      onSuccess: () => {
        navigate(-1)
        setIsFileUploaderOpen(false)
        handleSuccessModalClose()
      },
    },
  })
  const handleConfirm = (data) => {
    const selectedDate = date.getFullYear() + '-' + addZero(date.getMonth() + 1) + '-' + addZero(date.getDate())

    const { clause, clause_substance, organization_stir, organization_name, position, penalty, fullname, jshir } =
      getValues()

    const isValid =
      (clause?.trim() &&
        clause_substance?.trim() &&
        organization_stir?.trim() &&
        organization_name?.trim() &&
        position?.trim() &&
        penalty?.trim() &&
        fullname?.trim() &&
        jshir?.trim()) ||
      administrativeStatusId === administrativeStatuses.new ||
      administrativeStatusId === administrativeStatuses.beingConsidered
    if (isValid) {
      updateAdministrativeMutation.mutate({
        clause,
        clause_substance,
        clause_date: administrativeStatusId === administrativeStatuses.new ? '' : selectedDate,
        clause_sum: +penalty,
        person_role: position,
        org_inn: organization_stir,
        org_name: organization_name,
        person_fio: fullname,
        person_inn: jshir,
        dxa_response_id: !isLinear && administrativeStatusId === administrativeStatuses.beingConsidered ? id : '',
        dxa_linear_response_id: isLinear && administrativeStatusId === administrativeStatuses.beingConsidered ? id : '',
        files: fileNames,
        id: administrativeId,
        status_id: !isToCourt
          ? administrativeStatusId === administrativeStatuses.beingConsidered ||
            administrativeStatusId === administrativeStatuses.sendToCourt
            ? administrativeStatuses.actionTaken
            : administrativeStatuses.beingConsidered
          : administrativeStatuses.sendToCourt,
        updated_by: userId,
        task_id: taskId.toString(),
      })
    } else {
      for (let key in data) {
        if (typeof data[key] !== 'object' && !data[key].trim())
          setError(toString(data[key]), { message: "To'ldirilishi shart" })
      }
    }
  }

  return (
    <div className="w-full grid grid-cols-12 gap-4">
      <Card className="col-span-6" title="Xizmatning ko'rsatilish natijasi">
        <div className="grid grid-cols-12 gap-4">
          {registration.data?.inspector_images?.map((i) => (
            <div className="col-span-3 mb-2" key={i} onClick={handleModalOpen}>
              <img src={`${process.env.REACT_APP_CDN_IMAGE_URL}${i}`} alt="inspektor" className="rounded-md" />
            </div>
          ))}
        </div>
        <span className="input-label">Obyekt holati</span>
        <Input className="not-resizable" widthFull register={register} name="object_status_id" disabled />
        <span className="input-label mt-4">Izoh</span>
        <Textarea className="not-resizable" widthFull register={register} name="description" disabled />
        <span className="input-label mt-4">Nazorat xizmati narxi</span>
        <Input widthFull register={register} name="price_supervision_service" addonAfter="So'm" disabled />
        <span className="input-label mt-4">Rekvizit</span>
        {/* <Input widthFull register={register} name="requisite" disabled /> */}
        <textarea
          disabled
          rows={2}
          className="border not-resizable p-3 w-full flex items-center border-borderColor hover:border-primary transition-all duration-500 rounded-[6px] focus-within:border-primary"
          {...register('requisite')}
        />
        {(isAdministrationAdmin || roleId === REPUBLIC_APPARAT_ROLE_ID) && pathname.includes('history') && (
          <>
            <span className="input-label mt-4">Javobgarlikka tortilgan tashkilot nomi</span>
            <Input className="not-resizable" widthFull register={register} name="org_name" disabled />
            <span className="input-label mt-4">Javobgarlikka tortilgan tashkilot STIRi</span>
            <Input className="not-resizable" widthFull register={register} name="org_inn" disabled />
            <span className="input-label mt-4">Javobgarlikka tortilgan shaxs F.I.Sh</span>
            <Input className="not-resizable" widthFull register={register} name="user_fullname" disabled />
            <span className="input-label mt-4">Javobgarlikka tortilgan shaxs JShShIRi</span>
            <Input className="not-resizable" widthFull register={register} name="user_jshshir" disabled />
            <span className="input-label mt-4">Javobgarlikka tortilgan shaxs lavozimi</span>
            <Input className="not-resizable" widthFull register={register} name="user_role" disabled />
            <span className="input-label mt-4">Qo'llanilgan modda</span>
            <Input className="not-resizable" widthFull register={register} name="clause" disabled />
            <span className="input-label mt-4">Jarima miqdori</span>
            <Input className="not-resizable" widthFull register={register} name="clause_sum" disabled />
            <span className="input-label mt-4">Qo'llanilgan sana</span>
            <Input className="not-resizable" widthFull register={register} name="clause_date" disabled />
          </>
        )}
        {registration.data?.administrative_files?.length > 0 &&
          (administrativeStatusId === administrativeStatuses.beingConsidered ||
            administrativeStatusId === administrativeStatuses.actionTaken) && (
            <>
              <span className="input-label mt-4">Buyruqlar</span>
              {registration.data?.administrative_files?.map((file) => (
                <div className="flex items-center gap-x-2 bg-[#F4F6FA] p-2 rounded">
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
            </>
          )}

        <div className="flex gap-3 justify-between mt-4">
          {isAdministrationAdmin && administrativeStatusId === administrativeStatuses.new ? (
            <div className="grow flex justify-end gap-3">
              <BtnOutlined
                onClick={() => {
                  openModal()
                  setModalTitle("Hujjatlar sudga jo'natildimi?")
                  setIsToCourt(true)
                }}
                color="blue"
                leftIcon={<NotificationImportantIcon color="primary" />}
              >
                Hujjatlar sudga jo’natildi
              </BtnOutlined>
              <BtnFiled
                onClick={() => {
                  openModal()
                  setModalTitle('Hujjatlarni qabul qilmoqchimisiz?')
                  setIsToCourt(false)
                }}
                color="blue"
                leftIcon={<CheckOutlinedIcon />}
              >
                Hujjatlarni qabul qildim
              </BtnFiled>
            </div>
          ) : isAdministrationAdmin &&
            (administrativeStatusId === administrativeStatuses.beingConsidered ||
              administrativeStatusId === administrativeStatuses.sendToCourt) ? (
            <div className="flex justify-end grow">
              <BtnFiled
                onClick={() => {
                  setIsFileUploaderOpen(true)
                  setIsToCourt(false)
                }}
                color="blue"
                leftIcon={<CheckOutlinedIcon />}
              >
                Qaror qabul qilindi
              </BtnFiled>
            </div>
          ) : administrativeStatusId === administrativeStatuses.actionTaken ? (
            ''
          ) : (
            <>
              <BtnFiled leftIcon={<ArrowBackOutlinedIcon />} onClick={() => scrollToEl(4)}>
                Oldingisi
              </BtnFiled>
              {!pathname.includes('history') && (
                <div className="flex gap-3">
                  <BtnOutlined color="red" leftIcon={<CancelIcon />} onClick={handleOpen}>
                    Bekor qilish
                  </BtnOutlined>
                  <BtnFiled
                    leftIcon={<CheckOutlinedIcon />}
                    disabled={isDisabled || canCancel}
                    onClick={handleOpenConfirm}
                  >
                    Qabul qilish
                  </BtnFiled>
                </div>
              )}
            </>
          )}
        </div>
      </Card>
      {registration.data?.rejection_comment && (
        <Card className="col-span-6 h-fit" title="Rad etilish sababi">
          <Textarea
            className="not-resizable"
            widthFull
            register={register}
            name="rejection_comment"
            disabled
            rows={4}
          />
        </Card>
      )}
      <Modal //This is for canceling registration
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex justify-center items-center"
      >
        <div className="w-2/5 bg-white rounded-md p-4">
          <div className="relative flex justify-center items-center mb-4">
            <span className="text-2xl font-semibold">Bekor qilish</span>
            <span className="absolute top-1 right-4 cursor-pointer" onClick={handleClose}>
              <CloseOutlinedIcon />
            </span>
          </div>
          <div className="mb-4">
            <textarea
              rows={4}
              placeholder="Izoh ... "
              className="border p-3 w-full flex items-center border-borderColor hover:border-primary transition-all duration-500 rounded-[6px] focus-within:border-primary overflow-hidden"
              onChange={(e) => setValue(e.target.value)}
              value={value}
            />
            {!value && <span className="text-sm text-red-400 mt-1">Izoh kiritish shart</span>}
          </div>
          <BtnFiled
            disabled={!value.trim() ? true : isDisabled ? true : false}
            className="w-full"
            onClick={() => value && onSubmitAcceptReject(value)}
          >
            Yuborish
          </BtnFiled>
        </div>
      </Modal>
      <ConfirmModal //This is for accepting registration
        isDisabled={isDisabled}
        isOpen={isOpenConfirmAccept}
        title="Obyektni tizimga kiritishni tasdiqlaysizmi"
        handleClose={handleCloseConfirmAccept}
        fn={() => {
          onSubmitAccept()
          handleCloseConfirmAccept()
        }}
        fn2={() => {}}
        icon={<InfoIconForModal />}
        // oneButton={true}
      />
      {/* <ConfirmModal //This is for accepting registration
        isDisabled={isDisabled}
        isOpen={isOpenConfirmAccept}
        title={confirmAcceptTitle}
        handleClose={handleCloseConfirmAccept}
        fn={() => {
          handleAcceptRegistration()
        }}
        fn2={() => {}}
        icon={<InfoIconForModal />}
        // yesNo={true}
        // oneButton={true}
      />
      <ConfirmModal //This is for connecting Labaratory contract
        isDisabled={isDisabled}
        isOpen={isOpenConfirmLab}
        title={confirmAcceptTitle}
        handleClose={() => setIsOpenConfirmLab(false)}
        fn={() => {
          // handleAcceptRegistration()
          handleAcceptLab()
        }}
        fn2={() => {}}
        icon={<InfoIconForModal />}
        yesNo={true}
        // oneButton={true}
      />
      <ModalPortal open={isOpenConnectLab} closeModal={() => setIsOpenConnectLab(false)}>
        <ConnectLabContractModal //this is for selecting lab contract and connecting it to registration
          open={isOpenConnectLab}
          onClose={() => setIsOpenConnectLab(false)}
          title="Shartnoma biriktirish"
          selectedContract={selectedContract}
          setSelectedContract={setSelectedContract}
          handleContineu={handleConnectLabToObject}
        />
      </ModalPortal> */}
      <ConfirmModal //this modal is for sending to court (I think)
        isDisabled={isDisabled}
        isOpen={isModalOpen}
        title={modalTitle}
        handleClose={closeModal}
        fn={handleConfirm}
        fn2={() => {}}
        oneButton={false}
      />

      <ImageSliderPreview
        isOpen={isOpenModal}
        handleClose={handleModalClose}
        images={registration.data?.inspector_images}
      />
      <ModalPortal open={isFileUploaderOpen} closeModal={handleFileUploadClose}>
        <FileUploadModal
          setFileNames={setFileNames}
          fileNames={fileNames}
          open={isFileUploaderOpen}
          onClose={handleFileUploadClose}
          title="Buyruqni kiriting"
          handleSubmit={handleSubmit}
          onSubmit={handleConfirm}
          date={date}
          setDate={setDate}
          register={register2}
          errors={errors}
        />
      </ModalPortal>
      <StatusModal
        isOpen={isStatusModalOpen}
        title="Obyekt muvaffaqiyatli tizimga kiritildi"
        handleClose={() => setIsStatusModalOpen(false)}
        handleClickOk={() => navigate(-1)}
        status="success"
      />
    </div>
  )
}

export default FifthStep
