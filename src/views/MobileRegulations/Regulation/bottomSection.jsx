import { useSelector } from 'react-redux'
import { AddIcon, CancelIcon, SaveIcon } from '../../../assets/icons'
import { BtnFiled, BtnOutlined } from '../../../components'
import {
  ACT_TYPE_ID_ACT,
  ACT_TYPE_ID_ACT_APPROVED,
  ACT_TYPE_ID_ACT_CLOSED,
  ACT_TYPE_ID_ACT_PRESENTED,
  ACT_TYPE_ID_ACT_REJECTED,
  ACT_TYPE_ID_EVENT,
  ACT_TYPE_ID_EVENT_APPROVED,
  ACT_TYPE_ID_EVENT_PRESENTED,
  ACT_TYPE_ID_EVENT_REJECTED,
  ACT_TYPE_ID_EXTENDATION,
  ACT_TYPE_ID_EXTENDATION_APPROVED,
  ACT_TYPE_ID_EXTENDATION_REJECTED,
  ACT_TYPE_ID_EXTENDATION_REQUESTED,
  INSPEKSIYA_BOSHLIGI_ROLE_ID,
  INSPEKSIYA_BOSS_FIRST_ZAM_ROLE_ID,
  INSPEKSIYA_BOSS_ZAM_ROLE_ID,
  REGULATION_QURILISH_QATNASHUVCHILARI_TYPE_ID,
  REGULATION_STATUS_ID_IN_APPROVAL,
  SMR_BOSHLIGI_ROLE_ID,
  SMR_BOSS,
  TEXNIK_NAZORATCHI_ROLE_ID,
  administrativeStatuses,
} from '../../../settings/constants'
import { Add, CheckOutlined, NotificationImportant } from '@mui/icons-material'
import { useMemo } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { permissions } from '../../../settings/permissions'
import { regulationStatuses } from '../../../settings/status'

export default function BottomSection({
  actsByRegulation,
  regulation,
  handleOpen,
  setModalData,
  handleOpenAccept,
  deadline,
  instruction_id,
  openModal,
  setModalTitle,
  setIsToCourt,
  setIsFileUploaderOpen,
  violations,
  deadlineError,
  onSubmit,
  ids,
}) {
  const { roleId, userId } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { pathname } = useLocation()
 const isInspectionOrSmrBoss = [
    INSPEKSIYA_BOSHLIGI_ROLE_ID,
    INSPEKSIYA_BOSS_FIRST_ZAM_ROLE_ID,
    INSPEKSIYA_BOSS_ZAM_ROLE_ID,
    SMR_BOSS,
    SMR_BOSHLIGI_ROLE_ID,
  ].some((role) => role === roleId)
  const dateNow = useMemo(() => {
    const date = new Date()
    date.setHours(0, 0, 0, 0)
    return date
  }, [])
  const deadlineDate = useMemo(() => {
    deadline.setHours(0, 0, 0, 0)
    return deadline
  }, [deadline])

  // const deadlineDate = new Date(regulation?.deadline)
  const deadLineNow = new Date()
  deadLineNow.setHours(0, 0, 0, 0)

  return searchParams.get('tab') == 0 ? (
    <>
      {isInspectionOrSmrBoss && actsByRegulation.data ? (
        <>
          {regulation.data?.regulation_status_id !== ACT_TYPE_ID_ACT_CLOSED && (
            <>
              <BtnOutlined
                leftIcon={<CancelIcon />}
                color="red"
                className="w-full"
                onClick={() => {
                  handleOpen()
                  setModalData({ title: 'Bekor qilish', key: 'reject' })
                }}
              >
                Bekor qilish
              </BtnOutlined>
              <BtnFiled
                className="w-full"
                leftIcon={<CheckOutlined />}
                onClick={() => {
                  handleOpenAccept()
                  setModalData({ title: 'Tasdiqlash', key: 'approve' })
                }}
              >
                Tasdiqlash
              </BtnFiled>
            </>
          )}
        </>
      ) : null}
      {userId === regulation.data?.user.user_id &&
        regulation.data?.regulation_status_id !== ACT_TYPE_ID_ACT_CLOSED &&
        (regulation.data?.act_status.id === ACT_TYPE_ID_EXTENDATION_REQUESTED ||
          regulation.data?.act_status.id === ACT_TYPE_ID_ACT_PRESENTED) && (
          <>
            <BtnOutlined
              leftIcon={<CancelIcon />}
              className="w-full"
              color="red"
              onClick={() => {
                handleOpen()
                setModalData({ title: 'Bekor qilish', key: 'reject' })
              }}
            >
              Bekor qilish
            </BtnOutlined>
            <BtnFiled
              leftIcon={<CheckOutlined />}
              className="w-full"
              onClick={() => {
                handleOpen()
                setModalData({ title: 'Tasdiqlash', key: 'approve' })
              }}
            >
              Tasdiqlash
            </BtnFiled>
          </>
        )}
      {regulation.data?.guilty_user?.user_id === userId &&
        (regulation.data?.regulation_type_id === REGULATION_QURILISH_QATNASHUVCHILARI_TYPE_ID ? (
          roleId !== TEXNIK_NAZORATCHI_ROLE_ID &&
          regulation.data?.regulation_status_id !== ACT_TYPE_ID_ACT_CLOSED &&
          regulation.data?.act_status.id !== ACT_TYPE_ID_EXTENDATION_REQUESTED &&
          regulation.data?.act_status.id !== ACT_TYPE_ID_ACT_PRESENTED &&
          (deadlineDate >= dateNow ||
            regulation.data?.administrative_status_id === administrativeStatuses.actionTaken) && (
            <>
              {/* These two buttons are for Qurilish Qatnashuvchilari regulation type only. */}
              <BtnFiled
                color="red"
                className="w-full"
                onClick={() => navigate(`/m/instructions/${instruction_id}/comment/${ACT_TYPE_ID_EXTENDATION}`)}
              >
                Muddat so'rash
              </BtnFiled>
              <BtnFiled
                color="blue"
                className="w-full"
                leftIcon={<AddIcon />}
                onClick={() => navigate(`/m/instructions/${instruction_id}/comment/${ACT_TYPE_ID_ACT}`)}
              >
                Dalolatnoma rasmiylashtirish
              </BtnFiled>
            </>
          )
        ) : (
          <>
            {/* These two buttons are for Davlat Xizmatchilari regulation type only. */}
            {!pathname.includes('confirmations') &&
              // regulation.data?.regulation_status_id !== REGULATION_STATUS_ID_IN_NEW &&
              regulation.data?.regulation_status_id !== REGULATION_STATUS_ID_IN_APPROVAL &&
              regulation.data?.act_status.id !== ACT_TYPE_ID_ACT_PRESENTED &&
              regulation.data?.act_status.id !== ACT_TYPE_ID_EXTENDATION_REQUESTED &&
              regulation.data?.act_status.id !== ACT_TYPE_ID_ACT_APPROVED &&
              regulation.data?.act_status.id !== ACT_TYPE_ID_EVENT_PRESENTED &&
              (deadlineDate >= dateNow ||
                regulation.data?.administrative_status_id === administrativeStatuses.actionTaken) && (
                <BtnFiled
                  color="red"
                  className="w-full"
                  onClick={() => navigate(`/m/instructions/${instruction_id}/comment/${ACT_TYPE_ID_EXTENDATION}`)}
                >
                  Muddat so'rash
                </BtnFiled>
              )}
            {permissions[roleId]?.includes('DALOLATNOMA_RASMIYLASHTIRISH_BTN') &&
              actsByRegulation.data?.length &&
              regulation.data?.act_status?.id !== ACT_TYPE_ID_ACT_APPROVED &&
              (regulation.data?.act_status?.id === ACT_TYPE_ID_EXTENDATION_REJECTED || //false
                (regulation.data?.act_status?.id === ACT_TYPE_ID_EXTENDATION_APPROVED && //false
                  actsByRegulation.data[0].data?.some((i) => i.status_id === ACT_TYPE_ID_EVENT_APPROVED)) ||
                regulation.data?.act_status?.id === ACT_TYPE_ID_ACT_REJECTED || //true
                regulation.data?.act_status?.id === ACT_TYPE_ID_EVENT_APPROVED) && (
                <BtnFiled
                  className="w-full"
                  color="blue"
                  leftIcon={<AddIcon />}
                  onClick={() => navigate(`/m/instructions/${instruction_id}/comment/${ACT_TYPE_ID_ACT}`)}
                >
                  Dalolatnoma rasmiylashtirish
                </BtnFiled>
              )}
          </>
        ))}
      {pathname.includes('notifications') ? (
        <div className="flex gap-x-2">
          {regulation.data?.administrative_status_id === administrativeStatuses.new ? (
            <>
              <BtnOutlined
                className="w-full"
                onClick={() => {
                  openModal()
                  setModalTitle('Hujjatlar sudga jo’natildimi?')
                  setIsToCourt(true)
                }}
                color="blue"
                leftIcon={<NotificationImportant color="primary" />}
              >
                Hujjatlar sudga jo’natildi
              </BtnOutlined>
              <BtnFiled
                onClick={() => {
                  openModal()
                  setModalTitle('Hujjatlarni qabul qilmoqchimisiz?')
                  setIsToCourt(false)
                }}
                className="w-full"
                color="blue"
                leftIcon={<CheckOutlined />}
              >
                Hujjatlarni qabul qildim
              </BtnFiled>
            </>
          ) : (
            <BtnFiled
              onClick={() => {
                setIsFileUploaderOpen(true)
                setIsToCourt(false)
              }}
              className="w-full"
              color="blue"
              leftIcon={<CheckOutlined />}
            >
              Qaror qabul qilindi
            </BtnFiled>
          )}
        </div>
      ) : (
        deadlineDate >= dateNow &&
        !pathname.includes('history') && (
          <BtnFiled
            disabled={
              !(
                violations.data?.violations?.every((i) => i.check_list_status) &&
                !deadlineError &&
                permissions[roleId]?.includes('PROVIDE_MONITORING') &&
                ids?.includes(instruction_id)
              )
            }
            onClick={onSubmit}
            className="w-full"
            leftIcon={<SaveIcon />}
          >
            Saqlash
          </BtnFiled>
        )
      )}
      
    </>
  ) : (
    pathname.includes('/instructions/view/') && (
      <>
        <BtnOutlined
          onClick={() => {
            navigate('violation/add')
          }}
          color="blue"
          className="w-full"
          leftIcon={<Add color="primary" />}
        >
          Qoidabuzarlik qo'shish
        </BtnOutlined>
      </>
    )
  )
}
