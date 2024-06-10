import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createSearchParams, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { clearRegulationDeadlineUpdating } from '../../../redux/actions/regulationActions'
import { useRegulation, useViolation } from '../../../services'
import {
  ACT_TYPE_ID_ACT,
  ACT_TYPE_ID_EVENT,
  ACT_TYPE_ID_EVENT_APPROVED,
  ACT_TYPE_ID_EVENT_REJECTED,
  ACT_TYPE_ID_EXTENDATION,
  ACT_TYPE_ID_EXTENDATION_APPROVED,
  ACT_TYPE_ID_EXTENDATION_REJECTED,
  BOSH_PRORAB_ROLE_ID,
  REGULATION_QURILISH_QATNASHUVCHILARI_TYPE_ID,
  REGULATION_STATUS_ID_IN_APPROVAL,
} from '../../../settings/constants'
import getNextDate from '../../../utils/getNextDate'
import { useMyGo } from '../../../services/useMyGo'
import fileDownloader from '../../../utils/fileDownloader'
import { permissions } from '../../../settings/permissions'
import MainInformation from './MainInformation'
import Violations from './Violations'
import useTimeStamp from '../../../services/useTimeStamp'
import { IconButton } from '@mui/material'
import CountdownTag from '../../../components/CountdownTag'
import { MobileFilterHeader } from '../../../components/FilterHeader/MobileFilterHeader'
import { DownloadIcon } from '../../../assets/icons'
import { BtnFiled, MuiTabs } from '../../../components'
import BottomSection from './bottomSection'
import ActRegulationView from './ActRegulationViewComp'
import { regulationStatuses } from '../../../settings/status'

const MobileRegulationView = () => {
  const { instruction_id, id } = useParams()
  const { roleId, userId } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const { ids } = useSelector((state) => state.regulation)
  const [searchParams, setSearchParams] = useSearchParams()
  const searchParamsMemo = useMemo(() => Object.fromEntries([...searchParams]), [searchParams])
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 0)
  const [violationStatus, setViolationStatus] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [modalData, setModalData] = useState({ title: '', key: '' })
  const [deadline, setDeadline] = useState(new Date())
  const [previewItem, setPreviewItem] = useState([])
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [isOpenAccept, setIsOpenAccept] = useState(false)
  const [modalTitle, setModalTitle] = useState('')
  const [isToCourt, setIsToCourt] = useState(false)
  const handleOpenAccept = () => setIsOpenAccept(true)
  const handleCloseAccept = () => setIsOpenAccept(false)
  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)
  const [isFileUploaderOpen, setIsFileUploaderOpen] = useState(false)
  const closeModal = () => setIsConfirmOpen(false)
  const openModal = () => setIsConfirmOpen(true)
  const { actsByRegulation, regulation, updateRegulationDeadlineMutation } = useRegulation({
    updateRegulationDeadlineProps: {
      onSuccess: () => {
        dispatch(clearRegulationDeadlineUpdating(instruction_id))
        navigate({ pathname: `/m/objects/${id}`, search: `?${createSearchParams({ ...searchParamsMemo, tab: 3 })}` })
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
  // const { updateRegulationActMutation } = useObject({
  //   updateRegulationActMutationProps: {
  //     onSuccess: () => navigate(-1),
  //   },
  // })
  // const minDate = useMemo(() => {
  //   if (pathname.includes('instructions/view/technician'))
  //     return new Date(new Date(new Date().setDate(new Date().getDate() + 1)))
  //   else if (regulation.data) {
  //     const deadline = new Date(regulation.data?.deadline)
  //     return new Date(deadline.setDate(deadline.getDate() + 1))
  //   }
  // }, [regulation.data, pathname])

  // const maxDate = useMemo(() => {
  //   if (pathname.includes('instructions/view/technician'))
  //     return new Date(new Date(new Date().setDate(new Date().getDate() + 60)))
  //   else if (regulation.data) {
  //     const deadline = new Date(regulation.data?.deadline)
  //     return new Date(deadline.setMonth(deadline.getMonth() + 2))
  //   }
  // }, [regulation.data, pathname])
  const deadlineError = useMemo(() => {
    if (roleId === BOSH_PRORAB_ROLE_ID) {
      return deadline.getDate() === getNextDate().getDate() && deadline.getMonth() === new Date().getMonth()
    }
    //  else if (pathname.includes('instructions/view/technician')) {
    //   const deadlineDate = deadline
    //   deadlineDate.setHours(0, 0, 0, 0)
    //   const minDeadline = minDate
    //   minDeadline.setHours(0, 0, 0, 0)
    //   const maxDeadline = maxDate
    //   maxDeadline.setHours(0, 0, 0, 0)

    //   if (deadlineDate < minDeadline || deadlineDate > maxDeadline) {
    //     return true
    //   } else {
    //     return false
    //   }
    // }
  }, [deadline, roleId])

  const { violationsStatus, violations } = useViolation({
    violationsStatusQueryProps: {
      enabled: true,
    },
    regulationId: instruction_id,
    regulationParams: {
      status_id: violationStatus?.id,
    },
  })

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

  const tabElements = useMemo(() => {
    const actsArr = actsByRegulation?.data?.map((item, index) => {
      if (item?.data?.length > 0) {
        return {
          title: item.key === 'act' ? 'Dalolatnoma' : item.key === 'events' ? 'Chora tadbirlar' : 'Muddat uzaytirish',
          component: (
            <ActRegulationView
              data={item.data}
              title={
                item.key === 'act' ? 'Dalolatnoma' : item.key === 'events' ? 'Chora tadbirlar' : 'Muddat uzaytirish'
              }
              itemKey={item.key}
              key={item.id}
            />
          ),
        }
      }
    })
    return [
      {
        title: "Asosiy ma'lumotlar",
        component: (
          <MainInformation
            regulation={regulation}
            deadlineError={deadlineError}
            disabled={!(permissions[roleId]?.includes('PROVIDE_MONITORING') && ids.includes(instruction_id))}
            deadline={deadline}
            setDeadline={setDeadline}
          />
        ),
      },
      {
        title: 'Qoidabuzarliklar',
        component: (
          <Violations
            objectId={regulation?.data?.object_id}
            violations={violations}
            violationsStatus={violationsStatus?.data?.violation_statuses}
            setViolationStatus={setViolationStatus}
            activeTab={activeTab}
          />
        ),
      },
      ...(actsArr?.filter((el) => !!el) || []),
    ]
  }, [
    actsByRegulation?.data,
    deadlineError,
    deadline,
    regulation,
    violations,
    violationsStatus?.data?.violation_statuses,
    activeTab,
    roleId,
    ids,
    instruction_id,
  ])
  useEffect(() => {
    if (regulation.data) {
      setDeadline(new Date(regulation?.data?.deadline))
    }
  }, [regulation.data, violations.data])
  const { serverTime } = useTimeStamp({
    serverTimeProps: {
      enabled: pathname.includes('confirmations'),
      refetchInterval: 8000,
    },
  })
  const onSubmit = () => {
    if (!deadlineError) {
      updateRegulationDeadlineMutation.mutate({ id: instruction_id, deadline })
    }
  }
  const status = regulationStatuses.find((item) => item.id === regulation?.regulation_status_id)

  return (
    <>
      <MobileFilterHeader
        className="items-end"
        title={
          <div className="flex justify-between w-full items-center">
            <h2 className="text-[16px] font-bold">Yozma ko'rsatnoma</h2>
            <IconButton
              sx={{ border: '1px solid #E5E9EB', borderRadius: 2, padding: '4px' }}
              onClick={() => setCanDownload(true)}
            >
              <DownloadIcon />
            </IconButton>
          </div>
        }
      />
      <div className="bg-white">
        <MuiTabs
          hasBorder={false}
          scrollable
          noPadding
          activeTab={activeTab}
          elements={tabElements.map((item, index) => ({ ...item, key: index }))}
          setActiveTab={setActiveTab}
        />
      </div>
      <div className="bg-white sticky bottom-0 p-3 flex flex-col gap-3 items-center">
        <div className="flex w-full gap-3 items-center">
          <BottomSection
            actsByRegulation={actsByRegulation}
            regulation={regulation}
            handleOpen={handleOpen}
            setModalData={setModalData}
            handleOpenAccept={handleOpenAccept}
            deadline={deadline}
            instruction_id={instruction_id}
            openModal={openModal}
            setModalTitle={setModalTitle}
            setIsToCourt={setIsToCourt}
            setIsFileUploaderOpen={setIsFileUploaderOpen}
            violations={violations}
            deadlineError={deadlineError}
            onSubmit={onSubmit}
            ids={ids}
          />
        </div>
        {permissions[roleId]?.includes('CHORA_TADBIR_BTN') &&
          regulation?.data?.guilty_user?.user_id === userId &&
          status?.id !== REGULATION_STATUS_ID_IN_APPROVAL &&
          regulation?.data?.regulation_type_id !== REGULATION_QURILISH_QATNASHUVCHILARI_TYPE_ID &&
          (((regulation?.data?.act_status?.id === ACT_TYPE_ID_EVENT_REJECTED ||
            regulation?.data?.act_status?.id === ACT_TYPE_ID_EXTENDATION_REJECTED ||
            regulation?.data?.act_status?.id === ACT_TYPE_ID_EXTENDATION_APPROVED) &&
            actsByRegulation.data?.length &&
            !actsByRegulation.data[0].data?.some((i) => i.status_id === ACT_TYPE_ID_EVENT_APPROVED)) ||
            !Object.values(regulation?.data?.act_status).length) &&
          deadline.setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0) && (
            <BtnFiled
              color="blue"
              className="flex-1 w-full"
              onClick={() => navigate(`/m/instructions/${instruction_id}/comment/${ACT_TYPE_ID_EVENT}`)}
            >
              Chora tadbir taqdim etish
            </BtnFiled>
          )}
      </div>
      {/* <ModalGiveReason
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
      /> */}
      {/* <ModalComment
        handleClose={handleClose}
        isOpen={isOpen && roleId !== TEXNIK_NAZORATCHI_ROLE_ID}
        fn={handleUpdateRegulationActMutation}
        title={modalData.title}
        violations={violations.data?.violations}
        btnText="Yuborish"
        required={true}
      /> */}
      {/* <ConfirmModal
        isOpen={isOpenAccept}
        handleClose={handleCloseAccept}
        fn={(data) => handleUpdateRegulationActMutation(data, true)}
        title="Tasdiqlansinmi?"
      /> */}
      {/* <ConfirmModal
        isOpen={isConfirmOpen}
        handleClose={closeModal}
        fn={handleConfirm}
        title={modalTitle}
        oneButton={false}
      /> */}
    </>
  )
}

export default MobileRegulationView
