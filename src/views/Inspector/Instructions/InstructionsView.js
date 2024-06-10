import { CheckOutlined, NotificationImportant } from '@mui/icons-material'
import { format } from 'date-fns'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { AddIcon, CancelIcon, DownloadIcon, SaveIcon } from '../../../assets/icons'
import { BtnFiled, BtnOutlined, Header } from '../../../components'
import ConfirmModal from '../../../components/ConfirmModal'
import CountdownTag from '../../../components/CountdownTag'
import { FileUploadModal } from '../../../components/FileUploadModal'
import ModalComment from '../../../components/ModalComment/ModalComment'
import ModalGiveReason from '../../../components/ModalGiveReason'
import { InstructionsViewForm } from '../../../forms'
import { useYupValidationResolver } from '../../../hooks/useYupValidationResolver'
import { clearRegulationDeadlineUpdating } from '../../../redux/actions/regulationActions'
import { useObject, useRegulation, useViolation } from '../../../services'
import { useAdministrativeUpdate } from '../../../services/administrative'
import { useMyGo } from '../../../services/useMyGo'
import useTimeStamp from '../../../services/useTimeStamp'
import { addHours } from '../../../utils/addHour'
import {
  ACT_TYPE_ID_ACT,
  ACT_TYPE_ID_ACT_APPROVED,
  ACT_TYPE_ID_ACT_CLOSED,
  ACT_TYPE_ID_ACT_PRESENTED,
  ACT_TYPE_ID_ACT_REJECTED,
  ACT_TYPE_ID_EVENT,
  ACT_TYPE_ID_EVENT_APPROVED,
  ACT_TYPE_ID_EVENT_PRESENTED,
  ACT_TYPE_ID_EXTENDATION,
  ACT_TYPE_ID_EXTENDATION_APPROVED,
  ACT_TYPE_ID_EXTENDATION_REJECTED,
  ACT_TYPE_ID_EXTENDATION_REQUESTED,
  ACT_TYPE_ID_EXTENDATION_REVIEWED,
  administrativeStatuses,
  BOSH_PRORAB_ROLE_ID,
  INSPEKSIYA_BOSHLIGI_ROLE_ID,
  INSPEKSIYA_BOSS_FIRST_ZAM_ROLE_ID,
  INSPEKSIYA_BOSS_ZAM_ROLE_ID,
  REGULATION_QURILISH_QATNASHUVCHILARI_TYPE_ID,
  REGULATION_STATUS_ID_IN_APPROVAL,
  REGULATION_STATUS_ID_IN_PROGRESS,
  SMR_BOSHLIGI_ROLE_ID,
  SMR_BOSS,
  TEXNIK_NAZORATCHI_ROLE_ID,
} from '../../../settings/constants'
import { permissions } from '../../../settings/permissions'
import dateFormatter from '../../../utils/dateFormatter'
import fileDownloader from '../../../utils/fileDownloader'
import getNextDate from '../../../utils/getNextDate'
import { validations } from '../../../validations'
import { addZero } from '../../../utils/addZero'

export function InstructionsView() {
  const { pathname } = useLocation()
  const { roleId, userId } = useSelector((state) => state.auth)
  const { ids } = useSelector((state) => state.regulation)
  const { instruction_id, id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [isOpen, setIsOpen] = useState(false)
  const [isOpenAccept, setIsOpenAccept] = useState(false)
  const [modalData, setModalData] = useState({ title: '', key: '' })
  const [isToCourt, setIsToCourt] = useState(false)
  const [deadline, setDeadline] = useState(new Date())
  const [modalTitle, setModalTitle] = useState('')
  const [fileNames, setFileNames] = useState([])
  const [isFileUploaderOpen, setIsFileUploaderOpen] = useState(false)

  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  const [date, setDate] = useState(new Date())

  const schema = yup.object({
    penalty: validations.number,
  })

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    setError,
  } = useForm({
    resolver: useYupValidationResolver(schema),
    mode: 'onBlur',
  })
  const { register: register2, reset } = useForm()

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const handleCloseFileUploader = () => {
    setIsFileUploaderOpen(false)
    setFileNames([])
  }

  const handleOpenAccept = () => setIsOpenAccept(true)
  const handleCloseAccept = () => setIsOpenAccept(false)

  const openModal = () => setIsConfirmOpen(true)
  const closeModal = () => setIsConfirmOpen(false)
  // const handleFileSuccessfulUploaded = () => {
  //   setIsFileUploaderOpen(false)
  //   setIsSuccessModalOpen(true)
  // }

  const isInspeksiya =
    roleId === INSPEKSIYA_BOSHLIGI_ROLE_ID ||
    roleId === INSPEKSIYA_BOSS_FIRST_ZAM_ROLE_ID ||
    roleId === INSPEKSIYA_BOSS_ZAM_ROLE_ID

  const [violationStatus, setViolationStatus] = useState(null)

  const { violationsStatus, violations } = useViolation({
    violationsStatusQueryProps: {
      enabled: true,
    },
    regulationId: instruction_id,
    regulationParams: {
      limit: 100,
      status_id: violationStatus?.id,
    },
  })

  const { actsByRegulation, regulation, updateRegulationDeadlineMutation } = useRegulation({
    updateRegulationDeadlineProps: {
      onSuccess: () => {
        dispatch(clearRegulationDeadlineUpdating(instruction_id))
        navigate(`/inspectors/${id}/instructions`)
      },
    },
    regulationId: instruction_id,
    id: instruction_id,
    actsByRegulationParams: {
      regulation_id: instruction_id,
      // pm, squad said to do so
      limit: 1000,
    },
    actsByRegulationProps: {
      enabled: !!instruction_id,
      select: (data) => {
        const skletOfData = [
          { key: 'events', data: [] },
          { key: 'act', data: [] },
          { key: 'extendation', data: [] },
        ]
        return data?.data?.act_status_logs?.reduce((acc, cur) => {
          switch (cur.act_type.id) {
            case ACT_TYPE_ID_EVENT:
              acc[0].data.push(cur)
              break
            case ACT_TYPE_ID_ACT:
              acc[1].data.push(cur)
              break
            case ACT_TYPE_ID_EXTENDATION:
              acc[2].data.push(cur)
              break
            default:
              return acc
          }
          return acc
        }, skletOfData)
      },
    },
  })
  const { updateRegulationActMutation } = useObject({
    updateRegulationActMutationProps: {
      onSuccess: () => navigate(-1),
    },
  })

  const handleUpdateRegulationActMutation = (data, isAccept) =>
    updateRegulationActMutation.mutate({
      act_status_id: modalData.key === 'approve' ? ACT_TYPE_ID_ACT_APPROVED : ACT_TYPE_ID_ACT_REJECTED,
      acts: !isAccept
        ? data?.comments?.map((comment, index) => {
            return {
              act_id: actsByRegulation.data[1]?.data?.[index]?.act_id,
              comment: comment.name,
              file: [data.file],
              images: data.images,
              deadline: regulation.data?.deadline,
            }
          })
        : violations.data?.violations?.map((violation, index) => ({
            act_id: actsByRegulation.data[1]?.data?.[index]?.act_id,
            deadline: regulation.data?.deadline,
          })),
      user_id: userId,
      regulation_status_id:
        modalData.key === 'approve'
          ? isInspeksiya
            ? ACT_TYPE_ID_ACT_CLOSED
            : REGULATION_STATUS_ID_IN_APPROVAL
          : REGULATION_STATUS_ID_IN_PROGRESS,
      regulation_id: instruction_id,
    })
  const handleUpdateRegulationActMutationTexnik = (data) => {
    if (modalData.key === 'approve') {
      updateRegulationActMutation.mutate({
        act_status_id:
          regulation.data?.act_status.id === ACT_TYPE_ID_EXTENDATION_REQUESTED
            ? ACT_TYPE_ID_EXTENDATION_APPROVED
            : ACT_TYPE_ID_ACT_APPROVED,
        acts:
          regulation.data?.act_status.id === ACT_TYPE_ID_EXTENDATION_REQUESTED
            ? [
                {
                  act_id: actsByRegulation.data[2].data?.find(
                    (i) => i.status_id === ACT_TYPE_ID_EXTENDATION_REQUESTED && !i.isRejected
                  )?.act_id,
                  comment: data.reason_text,
                  deadline: dateFormatter(
                    format,
                    new Date(new Date(deadline).setDate(new Date(deadline).getDate() + 1)),
                    'yyyy-MM-dd'
                  ),
                },
              ]
            : actsByRegulation.data[1].data
                ?.filter((i) => i.status_id === ACT_TYPE_ID_ACT_PRESENTED && !i.isRejected)
                ?.map((i) => ({
                  act_id: i?.act_id,
                  comment: data.reason_text,
                  deadline: dateFormatter(format, new Date(deadline), 'yyyy-MM-dd'),
                })),
        user_id: userId,
        regulation_status_id:
          regulation.data?.act_status.id === ACT_TYPE_ID_EXTENDATION_REQUESTED
            ? REGULATION_STATUS_ID_IN_PROGRESS
            : ACT_TYPE_ID_ACT_CLOSED,
        regulation_id: instruction_id,
      })
    } else {
      updateRegulationActMutation.mutate({
        act_status_id:
          regulation.data?.act_status.id === ACT_TYPE_ID_EXTENDATION_REQUESTED
            ? ACT_TYPE_ID_EXTENDATION_REJECTED
            : ACT_TYPE_ID_ACT_REJECTED,
        acts:
          regulation.data?.act_status.id === ACT_TYPE_ID_EXTENDATION_REQUESTED
            ? [
                {
                  act_id: actsByRegulation.data[2].data?.find(
                    (i) => i.status_id === ACT_TYPE_ID_EXTENDATION_REQUESTED && !i.isRejected
                  )?.act_id,
                  comment: data.reason_text,
                  deadline: regulation.data?.deadline,
                },
              ]
            : actsByRegulation.data[1].data
                ?.filter((i) => i.status_id === ACT_TYPE_ID_ACT_PRESENTED && !i.isRejected)
                ?.map((i) => ({
                  act_id: i?.act_id,
                  comment: data.reason_text,
                  deadline: regulation.data?.deadline,
                })),
        user_id: userId,
        regulation_status_id: REGULATION_STATUS_ID_IN_PROGRESS,
        regulation_id: instruction_id,
      })
    }
  }

  const minDate = useMemo(() => {
    if (pathname.includes('instructions/view/technician'))
      return new Date(new Date(new Date().setDate(new Date().getDate() + 1)))
    else if (regulation.data) {
      const deadline = new Date(regulation.data?.deadline)
      return new Date(deadline.setDate(deadline.getDate() + 1))
    }
  }, [regulation.data])

  const maxDate = useMemo(() => {
    if (pathname.includes('instructions/view/technician'))
      return new Date(new Date(new Date().setDate(new Date().getDate() + 60)))
    else if (regulation.data) {
      const deadline = new Date(regulation.data?.deadline)
      return new Date(deadline.setMonth(deadline.getMonth() + 2))
    }
  }, [regulation.data])

  const deadlineError = useMemo(() => {
    if (roleId === BOSH_PRORAB_ROLE_ID) {
      return deadline.getDate() === getNextDate().getDate() && deadline.getMonth() === new Date().getMonth()
    } else if (pathname.includes('instructions/view/technician')) {
      const deadlineDate = deadline
      deadlineDate.setHours(0, 0, 0, 0)
      const minDeadline = minDate
      minDeadline.setHours(0, 0, 0, 0)
      const maxDeadline = maxDate
      maxDeadline.setHours(0, 0, 0, 0)

      if (deadlineDate < minDeadline || deadlineDate > maxDeadline) {
        return true
      } else {
        return false
      }
    }
  }, [deadline])

  const onSubmit = () => {
    if (!deadlineError) {
      updateRegulationDeadlineMutation.mutate({ id: instruction_id, deadline })
    }
  }

  const [canDownload, setCanDownload] = useState(false)
  const { getPdfByIdQuery } = useMyGo({
    getPdfByIdQueryProps: {
      enabled: canDownload,
      onSuccess: (res) => {
        const pdf = res?.data?.file
        fileDownloader(pdf)
        setCanDownload(false)
      },
    },
    getPdfByIdQueryParams: {
      id: instruction_id,
    },
  })

  useEffect(() => {
    if (regulation.data) {
      setDeadline(new Date(regulation.data?.deadline))
    }
  }, [regulation.data, violations.data])

  const { serverTime } = useTimeStamp({
    serverTimeProps: {
      enabled: pathname.includes('confirmations'),
      refetchInterval: 8000,
    },
  })

  const { updateAdministrativeRegulationMutation } = useAdministrativeUpdate({
    updateAdministrativeRegulationProps: {
      onSuccess: () => navigate(-1),
    },
  })

  const statusId = regulation?.data?.administrative_status_id

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
      statusId === administrativeStatuses.new ||
      statusId === administrativeStatuses.beingConsidered

    if (!isValid && !clause_substance.trim()) setError('substance', { type: 'string', message: "To'ldirilishi shart" })
    if (!isValid && !penalty.trim()) setError('penalty', { type: 'string', message: "To'ldirilishi shart" })
    if (!isValid && !fileNames.length) setError('document', { message: 'File yuklash shart' })

    if (isValid) {
      updateAdministrativeRegulationMutation.mutate({
        clause,
        clause_substance,
        clause_date: statusId === administrativeStatuses.new ? '' : selectedDate,
        clause_sum: +penalty,
        org_name: organization_name,
        org_inn: organization_stir,
        person_fio: fullname,
        person_role: position,
        person_inn: jshir,
        files: fileNames,
        id: regulation?.data?.administrative_id,
        regulation_id: statusId === administrativeStatuses.beingConsidered ? instruction_id : '',
        status_id: !isToCourt
          ? statusId === administrativeStatuses.beingConsidered || statusId === administrativeStatuses.sendToCourt
            ? administrativeStatuses.actionTaken
            : administrativeStatuses.beingConsidered
          : administrativeStatuses.sendToCourt,
        updated_by: userId,
      })
    }
  }

  useEffect(() => {
    reset({
      clause: `MJTKning ${regulation.data?.clause}-moddasi ${regulation.data?.clause_substance}-bandi`,
      clause_date: dateFormatter(format, new Date(regulation.data?.clause_date), 'dd.MM.yyyy'),
      clause_sum: regulation.data?.clause_sum,
      organization_name: regulation.data?.org_name,
      organization_stir: regulation.data?.org_inn,
      user_role: regulation.data?.person_role,
      user_jshshir: regulation.data?.person_inn,
      user_fullname: regulation.data?.person_fio,
    })
  }, [regulation.data, reset])

  // console.log(regulation.data?.regulation_status_id !== REGULATION_STATUS_ID_IN_APPROVAL)
  // console.log(regulation.data?.act_status.id !== ACT_TYPE_ID_ACT_APPROVED)
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

  const createdAt = new Date(regulation.data?.created_at)
  createdAt.setHours(0, 0, 0, 0)
  const isNew = dateFormatter(format, createdAt, 'dd-MM-yyyy') === dateFormatter(format, deadline, 'dd-MM-yyyy')
  console.log(isNew)
  return (
    <div className="h-screen">
      <Header
        title={`Yozma ko'rsatma № ${regulation.data?.regulation_number ?? ''}`}
        backLink={-1}
        rightElement={
          <div className="flex items-center gap-[12px]">
            <BtnOutlined onClick={() => setCanDownload(true)} leftIcon={<DownloadIcon />} color="blue">
              Yuklab olish
            </BtnOutlined>
            {
              // actsByRegulation.data[1]?.data?.filter((i) => i.status_id === ACT_TYPE_ID_EXTENDATION_REVIEWED)?.length ?
              isInspectionOrSmrBoss && actsByRegulation.data ? (
                <>
                  {addHours(new Date(regulation.data?.updated_at), 8) > new Date() && (
                    <CountdownTag
                      deadlineTime={addHours(new Date(regulation.data?.updated_at), 8)}
                      serverTime={serverTime.data?.data}
                    />
                  )}
                  {regulation.data?.regulation_status_id !== ACT_TYPE_ID_ACT_CLOSED && (
                    <>
                      <BtnOutlined
                        leftIcon={<CancelIcon />}
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
              ) : null
            }
            {/* 
              Made two similar buttons for different regulation types,
              cause conditions were a lot and don't wanted to mess it further
              Arabbek: Cool bro you did good
              Nurmuhammad: Yes, it's really cool:)
            */}
            {!isNew &&
              userId === regulation.data?.user.user_id &&
              regulation.data?.regulation_status_id !== ACT_TYPE_ID_ACT_CLOSED &&
              (regulation.data?.act_status.id === ACT_TYPE_ID_EXTENDATION_REQUESTED ||
                regulation.data?.act_status.id === ACT_TYPE_ID_ACT_PRESENTED) && (
                <>
                  <BtnOutlined
                    leftIcon={<CancelIcon />}
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
                    onClick={() => {
                      handleOpen()
                      setModalData({ title: 'Tasdiqlash', key: 'approve' })
                    }}
                  >
                    Tasdiqlash
                  </BtnFiled>
                </>
              )}
            {!isNew &&
              regulation.data?.guilty_user?.user_id === userId &&
              (regulation.data?.regulation_type_id === REGULATION_QURILISH_QATNASHUVCHILARI_TYPE_ID ? (
                roleId !== TEXNIK_NAZORATCHI_ROLE_ID &&
                regulation.data?.regulation_status_id !== ACT_TYPE_ID_ACT_CLOSED &&
                regulation.data?.act_status.id !== ACT_TYPE_ID_EXTENDATION_REQUESTED &&
                regulation.data?.act_status.id !== ACT_TYPE_ID_ACT_PRESENTED &&
                deadlineDate >= dateNow && (
                  <>
                    {/* chopish darkor  regulation.data?.administrative_status_id === administrativeStatuses.actionTaken*/}
                    {/* These two buttons are for Qurilish Qatnashuvchilari regulation type only. */}
                    <BtnFiled
                      color="red"
                      onClick={() => navigate(`/instructions/${instruction_id}/comment/${ACT_TYPE_ID_EXTENDATION}`)}
                    >
                      Muddat so'rash
                    </BtnFiled>
                    <BtnFiled
                      color="blue"
                      leftIcon={<AddIcon />}
                      onClick={() => navigate(`/instructions/${instruction_id}/comment/${ACT_TYPE_ID_ACT}`)}
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
                    deadlineDate >= dateNow && (
                      <BtnFiled
                        color="red"
                        onClick={() => navigate(`/instructions/${instruction_id}/comment/${ACT_TYPE_ID_EXTENDATION}`)}
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
                      regulation.data?.act_status?.id === ACT_TYPE_ID_EVENT_APPROVED) &&
                    deadlineDate >= dateNow && (
                      <BtnFiled
                        color="blue"
                        leftIcon={<AddIcon />}
                        onClick={() => navigate(`/instructions/${instruction_id}/comment/${ACT_TYPE_ID_ACT}`)}
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
                      ids.includes(instruction_id)
                    )
                  }
                  onClick={onSubmit}
                  leftIcon={<SaveIcon />}
                >
                  Saqlash
                </BtnFiled>
              )
            )}
          </div>
        }
      />
      <ModalGiveReason
        type="extendation"
        deadline={
          new Date(regulation.data?.deadline).getTime() === deadline.getTime()
            ? new Date(new Date(deadline).setDate(deadline.getDate() + 1))
            : deadline
        }
        minDate={new Date(new Date().setDate(new Date().getDate() + 1))}
        maxDate={maxDate}
        setDeadline={setDeadline}
        deadlineError={deadlineError}
        fn={handleUpdateRegulationActMutationTexnik}
        isOpen={isOpen && roleId === TEXNIK_NAZORATCHI_ROLE_ID}
        handleClose={handleClose}
        name="reason_comment"
        modalKey={modalData.key}
        title={modalData.title}
      />
      <ModalComment
        handleClose={handleClose}
        isOpen={isOpen && roleId !== TEXNIK_NAZORATCHI_ROLE_ID}
        fn={handleUpdateRegulationActMutation}
        title={modalData.title}
        violations={violations.data?.violations}
        btnText="Yuborish"
        required={true}
      />
      <ConfirmModal
        isOpen={isOpenAccept}
        handleClose={handleCloseAccept}
        fn={(data) => handleUpdateRegulationActMutation(data, true)}
        title="Tasdiqlansinmi?"
      />
      <ConfirmModal
        isOpen={isConfirmOpen}
        handleClose={closeModal}
        fn={handleConfirm}
        title={modalTitle}
        oneButton={false}
      />
      <div className="sidebar-header-calc">
        <InstructionsViewForm
          userId={userId}
          navigate={navigate}
          deadline={deadline}
          setDeadline={setDeadline}
          deadlineError={deadlineError}
          instruction_id={instruction_id}
          violationsStatus={violationsStatus?.data?.violation_statuses}
          setViolationStatus={setViolationStatus}
          violations={violations}
          disabled={!(permissions[roleId]?.includes('PROVIDE_MONITORING') && ids.includes(instruction_id))}
          actsByRegulation={actsByRegulation}
          regulation={regulation.data}
          objectId={regulation.data?.object_id}
          instructionId={regulation.data?.id}
          files={regulation.data?.files}
          register={register2}
          isNew={isNew}
        />
      </div>
      <FileUploadModal
        open={isFileUploaderOpen}
        onClose={handleCloseFileUploader}
        title="Buyruqni kiriting"
        setFileNames={setFileNames}
        fileNames={fileNames}
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={handleConfirm}
        date={date}
        setDate={setDate}
        errors={errors}
      />
    </div>
  )
}
