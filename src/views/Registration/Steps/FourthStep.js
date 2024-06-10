import { useEffect, useState } from 'react'
import ReactSelect from 'react-select'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { IconButton, Modal } from '@mui/material'

import { useObject, useUser } from '../../../services'
import { BasicTable, BtnFiled, BtnOutlined, Card } from '../../../components'
import ConfirmModal from '../../../components/ConfirmModal'
import { BigDoneIcon, CancelIcon, RightArrowIcon } from '../../../assets/icons'
import CustomizedAccordion from '../../../components/CustomizedAccordion'
import {
  REGISTARTION_ARCHIEVE_STATUS_ID,
  REGISTARTION_REREGISTRATION_STATUS_ID,
  REGISTRATION_CHECKED_STATUS_ID,
  REGISTRATION_NEW_STATUS_ID,
} from '../../../settings/constants'
import { InfoIcon } from '../../../assets/icons/icons'
import CustomModal from '../../../components/CustomModal'
import { Close } from '@mui/icons-material'
import ObjectModal from '../ObjectModal'

const FourthStep = ({
  isDisabled,
  onSubmitAccept,
  onSubmit,
  activeRoleId,
  pathname,
  scrollToPrev,
  usersOption,
  statusId,
  scrollToNext,
  users,
  registration,
  setActiveRoleId,
  onSubmitAcceptReject,
  showInspectorSelect,
  isAdministration,
  isLinear,
  inspectorComment,
  registrationUsersData,
  rejectionComment,
  showComments,
}) => {
  const [selectedUser, setSelectedUser] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenReject, setIsOpenReject] = useState(false)
  const [isOpenConfirm, setIsOpenConfirm] = useState(false)
  const [isOpenUserObjectsModal, setIsOpenUserObjectsModal] = useState(false)
  const [userIdForObjectData, setUserIdForObjectData] = useState('')

  const [value, setValue] = useState('')

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const handleOpenReject = () => setIsOpenReject(true)
  const handleCloseReject = () => setIsOpenReject(false)

  const handleOpenConfirm = () => setIsOpenConfirm(true)
  const handleCloseConfirm = () => setIsOpenConfirm(false)

  const handleOpenObjectsModal = () => setIsOpenUserObjectsModal(true)
  const handleCloseObjectsModal = () => setIsOpenUserObjectsModal(false)

  const { user } = useUser({ id: registration.data?.inspector_id })

  useEffect(() => {
    if (user.status === 'success') {
      setSelectedUser({ label: `${user.data.surname} ${user.data.name} ${user.data.middle_name}`, value: user.data.id })
    }
  }, [user.data])

  const roleNames = {
    Пудратчи: 'Ichki nazoratchi',
    Лойихачи: 'Mualliflik nazorati',
    Буюртмачи: 'Texnik nazoratchi',
  }

  useEffect(() => {
    if (!isOpenReject) {
      setValue('')
    }
  }, [isOpenReject])

  const showNextButton = () => {
    if (showInspectorSelect) return ''
    else if (
      registration.data?.status_id === REGISTARTION_ARCHIEVE_STATUS_ID ||
      registration.data?.status_id === REGISTRATION_CHECKED_STATUS_ID ||
      registration.data?.status_id === REGISTRATION_NEW_STATUS_ID ||
      isAdministration
    ) {
      return (
        <BtnFiled
          disabled={!selectedUser?.value}
          onClick={() => (statusId !== REGISTRATION_NEW_STATUS_ID ? scrollToNext() : handleOpen())}
          rightIcon={<RightArrowIcon color="white" />}
        >
          Keyingisi
        </BtnFiled>
      )
    }
  }

  return (
    <div className="w-full overflow-auto min-h-[4180px]">
      <div className="bg-white rounded-md mb-4 text-lg font-bold overflow-auto">
        <div className="p-4 border-b">Ko'rib chiqishga qabul qilish</div>
        <div className="p-4">
          {users?.map((user) => {
            const userData = registrationUsersData?.find((el) => user?.head_pinfl === el?.pinfl)

            return (
              <CustomizedAccordion
                id={activeRoleId}
                key={user.id || user.role_id}
                header={roleNames[user.role] || user.role_name}
                setActiveId={setActiveRoleId}
              >
                {users?.find((i) => i.id === user.id)?.head_fname}
                <span className="input-label">Obyektda mas'ul shaxsning lavozimi</span>
                <div className="bg-[#eee] text-base h-[40px] leading-[40px] px-4 rounded-md">
                  {!isLinear ? user?.role : user?.role_name}
                </div>
                <span className="input-label mt-4">Tashkilot nomi</span>
                <div className="bg-[#eee] text-base h-[40px] leading-[40px] px-4 rounded-md">{user?.name_org}</div>
                <span className="input-label mt-4">Tashkilot INN raqami</span>
                <div className="bg-[#eee] text-base h-[40px] leading-[40px] px-4 rounded-md">{user?.tin_org}</div>
                <span className="input-label mt-4">Mas'ul shaxsning PINFL raqami</span>
                <div className="bg-[#eee] text-base h-[40px] leading-[40px] px-4 rounded-md">{user?.head_pinfl}</div>
                <span className="input-label mt-4">Mas'ul shaxsning ism-sharifi</span>
                <div className="bg-[#eee] text-base h-[40px] leading-[40px] px-4 rounded-md">{user?.head_fname}</div>
                <span className="input-label mt-4">Pasport ma`lumotlar (seriya va raqami)</span>
                <div className="bg-[#eee] text-base h-[40px] leading-[40px] px-4 rounded-md">
                  {user?.passpnm_data_series}
                </div>
                <span className="input-label mt-4">Oliy o'quv markazi nomi</span>
                <div className="bg-[#eee] text-base h-[40px] leading-[40px] px-4 rounded-md">
                  {user?.name_graduate_study}
                </div>
                <span className="input-label mt-4">Mutaxassisligi</span>
                <div className="bg-[#eee] text-base h-[40px] leading-[40px] px-4 rounded-md">
                  {user?.specialization}
                </div>
                <span className="input-label mt-4">Diplom raqami</span>
                <div className="bg-[#eee] text-base h-[40px] leading-[40px] px-4 rounded-md">
                  {user?.diploma_number}
                </div>
                <span className="input-label mt-4">Diplom berish sanasi</span>
                <div className="bg-[#eee] text-base h-[40px] leading-[40px] px-4 rounded-md">
                  {user?.date_issue_diploma}
                </div>
                <span className="input-label mt-4">Maxsus kurslarni o'tash to'g'risidagi sertifikat raqami</span>
                <div className="bg-[#eee] text-base h-[40px] leading-[40px] px-4 rounded-md">
                  {user?.certificate_courses}
                </div>
                <span className="input-label mt-4">Izoh</span>
                <div className="bg-[#eee] text-base h-[40px] leading-[40px] px-4 rounded-md">{user?.comment}</div>
                <span className="input-label mt-4">Telefon raqami</span>
                <div className="bg-[#eee] text-base h-[40px] leading-[40px] px-4 rounded-md">{user?.phone_number}</div>
                <span className="input-label mt-4">Rollar</span>
                <div className="bg-[#eee] text-base h-[40px] leading-[40px] px-4 rounded-md">
                  {roleNames[user.role] || user.role_name}
                </div>
                <div className="flex rounded-md justify-between  bg-[#EBF7FF] border-[#D7EDFF] mt-4 py-3 px-4 ">
                  <div className="flex items-center gap-4">
                    <InfoIcon />
                    <p>
                      Ushbu foydalanuvchi tizimda {userData?.role_name} rolida ro'yxatdan o'tgan. Ushbu foydalanuvchida{' '}
                      {userData?.object_count} ta obyekt bor.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      handleOpenObjectsModal()
                      setUserIdForObjectData(userData?.user_id)
                    }}
                    className="bg-no text-[#0E73F6] border-b-[#4094F7]"
                  >
                    Batafsil
                  </button>
                </div>
              </CustomizedAccordion>
            )
          })}
          {inspectorComment && !showComments && (
            <>
              <span className="input label mt-3">Inspektor izohi</span>
              <textarea
                disabled
                rows={4}
                className="text-xs border not-resizable p-3 w-full flex items-center border-borderColor hover:border-primary transition-all duration-500 rounded-[6px] focus-within:border-primary "
                name="inspector_comment"
                value={inspectorComment}
              />
            </>
          )}
          {rejectionComment && !showComments && (
            <>
              <span className="input-label mt-3">Rad etilish sababi</span>
              <textarea
                disabled
                rows={4}
                className="text-xs border not-resizable p-3 w-full flex items-center border-borderColor hover:border-primary transition-all duration-500 rounded-[6px] focus-within:border-primary "
                name="rejection_comment"
                value={rejectionComment}
              />
            </>
          )}
        </div>

        <div className="flex justify-between px-4 pb-4">
          <BtnFiled leftIcon={<ArrowBackIcon fontSize="small" />} onClick={scrollToPrev}>
            Oldingisi
          </BtnFiled>
          {registration.data?.status_id === REGISTARTION_REREGISTRATION_STATUS_ID ? (
            <div className="flex gap-3 justify-end">
              {!pathname.includes('history') && (
                <div className="flex gap-3">
                  <BtnOutlined color="red" leftIcon={<CancelIcon />} onClick={handleOpenReject}>
                    Bekor qilish
                  </BtnOutlined>
                  <BtnFiled leftIcon={<CheckOutlinedIcon />} disabled={isDisabled} onClick={handleOpenConfirm}>
                    Qabul qilish
                  </BtnFiled>
                </div>
              )}
            </div>
          ) : (
            showNextButton()
          )}
        </div>
      </div>

      {registration.data?.status_id !== REGISTARTION_REREGISTRATION_STATUS_ID && !showInspectorSelect && (
        <Card className="col-span-6 h-fit overflow-visible" title="Inspektor">
          <span className="input-label">Inspektor</span>
          <ReactSelect
            onChange={(e) => setSelectedUser(e)}
            value={selectedUser}
            // menuPosition="absolute"
            menuPlacement="auto"
            name="inspektor"
            options={usersOption?.map((i) => ({ label: `${i.surname} ${i.name} ${i.middle_name} `, value: i.id }))}
            isDisabled={pathname.includes('history') || registration.data?.inspector_id}
          />
          {!selectedUser && <div className="text-red-400 mt-2 text-sm">Tanlanishi shart</div>}
        </Card>
      )}

      <Modal
        open={isOpenReject}
        onClose={handleCloseReject}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex justify-center items-center"
      >
        <div className="w-2/5 bg-white rounded-md p-4">
          <div className="relative flex justify-center items-center mb-4">
            <span className="text-2xl font-semibold">Bekor qilish</span>
            <span className="absolute top-1 right-4 cursor-pointer" onClick={handleCloseReject}>
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
            disabled={isDisabled}
            className="w-full"
            onClick={() => value.trim() && onSubmitAcceptReject(value)}
          >
            Yuborish
          </BtnFiled>
        </div>
      </Modal>
      <ConfirmModal
        isDisabled={isDisabled}
        isOpen={isOpenConfirm}
        title="Obyektni tizimga kiritish"
        handleClose={handleCloseConfirm}
        fn={() => {}}
        fn2={() => onSubmitAccept()}
        icon={<BigDoneIcon />}
        oneButton={true}
      />
      <ObjectModal open={isOpenUserObjectsModal} onClose={handleCloseObjectsModal} user_id={userIdForObjectData} />
      <ConfirmModal
        isDisabled={isDisabled}
        isOpen={isOpen}
        title="Inspektorga yuborish"
        handleClose={handleClose}
        fn={() => {}}
        fn2={() => onSubmit(selectedUser)}
        icon={<BigDoneIcon />}
        oneButton={true}
      />
    </div>
  )
}

export default FourthStep
