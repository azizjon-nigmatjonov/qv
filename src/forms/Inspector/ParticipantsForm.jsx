import { Modal } from '@mui/material'
import { format } from 'date-fns'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import ClearIcon from '@mui/icons-material/Clear'

import { BackupIcon, BankIcon, LogoutIcon, PersonIcon, PlusCircle } from '../../assets/icons'
import { BtnFiled, Card } from '../../components'
import { useObject, useUser } from '../../services'
import { permissions } from '../../settings/permissions'
import ProfilePhoto from '../../assets/images/profile.png'
import phoneNumberFormatter from '../../utils/phoneNumberFormatter'
import {
  AUTHOR_SUPERVISOR_ROLE_ID,
  ICHKI_NAZORATCHI_ROLE_ID,
  TEXNIK_NAZORATCHI_ROLE_ID,
} from '../../settings/constants'
import dateFormatter from '../../utils/dateFormatter'
import { useEffect } from 'react'

export function ParticipantsForm({ users, setIsOpen: setIsOpenModal }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const { roleId } = useSelector((state) => state.auth)

  const [previewUser, setPreviewUser] = useState([])
  const [open, setOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [employees, setEmployees] = useState()

  const { user } = useUser({ id: previewUser?.user_id })

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const { userHistoryByObjectId } = useObject({ showParicipantHistory: open, id })

  useEffect(() => {
    if (open) setEmployees(userHistoryByObjectId.data?.users)
    else setEmployees(users)
  }, [open, users, userHistoryByObjectId.data?.users])
  return (
    <Card
      title="Qatnashuvchilar"
      rightElement={
        open ? (
          <div
            onClick={() => setOpen((prev) => !prev)}
            className="cursor-pointer text-primary text-[14px] font-[400] flex items-center gap-[8px]"
          >
            <LogoutIcon />
            <span>Yopish</span>
          </div>
        ) : (
          <div
            className="flex items-center flex-col sm:flex-row text-[14px] leading-[24px] text-[#48535B] gap-[8px] cursor-pointer"
            onClick={() => setOpen((prev) => !prev)}
          >
            <BackupIcon />
            <span>Qatnashuvchilar tarixi</span>
          </div>
        )
      }
      bodyClassName="p-0"
    >
      {employees?.map((user, index) => (
        <div
          key={index}
          className={`p-4 ${index ? 'border-t' : ''} cursor-pointer hover:bg-blue-50`}
          onClick={() => {
            handleOpen()
            setPreviewUser(user)
          }}
        >
          <p className={`text-[16px] leading-[24px] font-semibold`}>
            {user?.role_id === ICHKI_NAZORATCHI_ROLE_ID
              ? 'Ichki nazoratchi - Pudrat tashkiloti'
              : user?.role_id === AUTHOR_SUPERVISOR_ROLE_ID
              ? 'Mualliflik nazorati - Loyihachi'
              : user?.role_id === TEXNIK_NAZORATCHI_ROLE_ID
              ? `Texnik nazoratchi - Buyurtmachi`
              : user?.role_name}
          </p>
          <div className="rounded-[8px]">
            <div className="grid tablet:grid-cols-2 mt-2 gap-3">
              <div className="flex items-center">
                <div className="w-[40px]">
                  <div className="w-[40px] h-[40px] bg-[#E0EEFF] flex justify-center items-center rounded-full">
                    <PersonIcon />
                  </div>
                </div>
                <div className="ml-2">
                  <p className="text-[14px] font-[400]">{`${user?.user_surname} ${user?.user_name} ${user?.user_middlename}`}</p>
                  <p className="text-primary text-[14px] font-[400]">{user?.phone}</p>
                  <p className="text-[14px] font-[400]">{user?.pinfl}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-[40px]">
                  <div className="w-[40px] h-[40px] flex justify-center items-center bg-blue-100 rounded-full">
                    <BankIcon />
                  </div>
                </div>
                <div className="ml-2">
                  <p className="text-[14px] font-[400]">{user?.organization_name || '-'}</p>
                </div>
              </div>
              {open && (
                <div className="col-span-12 flex items-center justify-between mt-[24px]">
                  <div className="border-dashed border-borderColor border w-full" />
                  <div className="px-2 text-[14px] font-[400] text-[#5B6871]">
                    {dateFormatter(format, new Date(user?.create_at), 'dd.MM.yyyy')}
                  </div>
                  <div className="border-dashed border-borderColor border w-full" />
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
      {/* {permissions[roleId]?.includes('OBJECTS/INSTRUCTIONS/PARTICIPANT/ADD') && (
        <div className="p-4" onClick={() => setIsOpenModal(true)}>
          <div className="border border-dashed border-[#0E73F6] py-2 rounded-md flex justify-center items-center gap-2.5 cursor-pointer hover:shadow duration-300">
            <span>
              <PlusCircle />{' '}
            </span>
            <span className="text-sm leading-6 text-[#0E73F6]">Qatnashuvchilarni qo'shish</span>
          </div>
        </div>
      )} */}
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="h-full flex justify-center items-center"
      >
        <div className="p-8 bg-white rounded-md outline-none w-2/5 relative">
          <div className="absolute top-3 right-3 cursor-pointer" onClick={handleClose}>
            <ClearIcon htmlColor="#6E8BB7" />
          </div>

          <div className="text-center border-b">
            <img
              src={
                user.data?.photo_url ? `${process.env.REACT_APP_CDN_IMAGE_URL}/${user.data?.photo_url}` : ProfilePhoto
              }
              alt="profile"
              className="w-[120px] h-[120px] mx-auto mb-6 rounded-full mb-2"
            />
            <p className="mb-1 text-[20px] leading-[30px] font-semibold">
              {`${previewUser?.user_surname} ${previewUser?.user_name} ${previewUser?.user_middlename}`}
            </p>
            <p className="mb-8 text-[18px] leading-[28px">{previewUser?.role_name}</p>
          </div>
          <div className="py-8">
            <div className="flex justify-between items-center pb-5">
              <span className="text-[#48535B] text-base leading-6">Manzil</span>
              <span className="text-base leading-6 font-medium">{user.data?.address}</span>
            </div>
            <div className="flex justify-between items-center pb-5">
              <span className="text-[#48535B] text-base leading-6">Telefon raqami</span>
              <span className="text-base leading-6 font-medium">{phoneNumberFormatter(user.data?.phone)}</span>
            </div>
            <div className="flex justify-between items-center pb-5">
              <span className="text-[#48535B] text-base leading-6">Ish joyi</span>
              <span className="text-base leading-6 font-medium">{user.data?.organization_name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#48535B] text-base leading-6">Sana</span>
              <span className="text-base leading-6 font-medium">
                {(previewUser?.created_at || previewUser?.create_at) &&
                  dateFormatter(format, new Date(previewUser?.created_at || previewUser?.create_at), 'dd.MM.yyyy')}
              </span>
            </div>
          </div>
          <BtnFiled className="w-full" size="large" onClick={handleClose}>
            Davom etish
          </BtnFiled>
        </div>
      </Modal>
    </Card>
  )
}
