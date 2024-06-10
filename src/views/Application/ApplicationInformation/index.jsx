import { Add, Cancel, Check, Edit } from '@mui/icons-material'
import { useCallback, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { NavLink, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { CancelIcon, CheckedIcon, DownloadIcon } from '../../../assets/icons'
import { ArrowRightMagical, WarningIcon } from '../../../assets/icons/icons'
import { Header, Tabs, BtnOutlined, BtnFiled, Tag } from '../../../components'
import StatusModal from '../../../components/StatusModal'
import { useContract } from '../../../services/labaratory/useContract'
import fileDownloader from '../../../utils/fileDownloader'
import {
  BUXGALTER_ROLE_ID,
  BUHGALTERIYA_BOSH_ROLE_ID,
  BUHGALTERIYA_YETAKCHI_ROLE_ID,
  YURIST_ROLE_ID,
  INSPEKSIYA_BOSHLIGI_ROLE_ID,
} from '../../../settings/constants'
import ModalComment from '../../../components/ModalComment/ModalComment'
import { useTranslation } from 'react-i18next'

function ApplicationInformation() {
  const { id } = useParams()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { register, control, setValue, reset } = useForm()
  //confirmation modal states
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false)
  const [confirmationModalTitle, setConfirmationModalTitle] = useState('')
  const [confirmModalStatus, setConfirmModalStatus] = useState('warning')
  const [confirmModalhandleClickOk, setConfirmModalhandleClickOk] = useState(() => () => {})
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)
  const { roleId, userId, regionId } = useSelector((state) => state.auth)
  const { t } = useTranslation('common')
  const isBuhgalter =
    roleId === BUXGALTER_ROLE_ID || roleId === BUHGALTERIYA_YETAKCHI_ROLE_ID || roleId === BUHGALTERIYA_BOSH_ROLE_ID
  const isYurist = roleId === YURIST_ROLE_ID
  const isInspeksiya = roleId === INSPEKSIYA_BOSHLIGI_ROLE_ID
  const { contractByIdQuery } = useContract({
    id,
    getContractByIdParams: {
      enabled:
        !!id &&
        !pathname.includes('departments') &&
        !pathname.includes('payment') &&
        !pathname.includes('completed-works'),
      onSuccess: (res) => {
        const body = {
          ...res.data,
          customer: {
            ...res.data,
            district: {
              value: res.data.district_id,
              label: res.data.district_name,
            },
          },
          performer: {
            ...res.data,
          },
        }
        reset(body)
      },
    },
  })
  const contractStatus = useMemo(() => {
    if (contractByIdQuery?.data?.data?.status_id === 'e0a3963b-36f4-4e35-8413-df26e9866632') {
      if (pathname.includes('labaratory')) {
        return {
          color: 'yellow',
          value: 'in_process',
          text: t('in.process'),
        }
      }
      return {
        color: 'blue',
        value: 'accepted',
        text: t('accepted'),
      }
    }
    if (contractByIdQuery?.data?.data?.status_id === '70a499b7-d6cd-46b4-8eb1-03e532a921eb') {
      return {
        color: 'red',
        value: 'rejected',
        text: t('rejected'),
      }
    }
  }, [contractByIdQuery?.data?.data?.status_id, pathname, t])
  const isStatusNew = useMemo(() => {
    return pathname.includes('confirm')
  }, [pathname])

  const tabLinks = useMemo(
    () =>
      !isStatusNew
        ? [
            {
              key: 'all_info',
              title: 'Umumiy ma`lumotlar',
              path: '',
            },
            {
              key: 'departments',
              title: 'Bo`limlar',
              path: 'departments',
            },
            {
              key: 'payment',
              title: 'To`lov',
              path: 'payment',
            },
            {
              key: 'comleted_works',
              title: 'Qilingan ishlar',
              path: `completed-works`,
            },
          ]
        : [],
    [isStatusNew]
  )

  const { sendContractToDepartmentsActionMutation } = useContract({
    sendContractToDepartmentsActionMutationProps: {
      onSuccess: () => {
        navigate(`/labaratory/${id}`)
        setIsConfirmationModalOpen(false)
      },
    },
  })

  const { contractActionMutation } = useContract({
    contractActionMutationProps: {
      onSuccess: () => {
        setIsConfirmationModalOpen(false)
        setIsCancelModalOpen(false)
        navigate(`/labaratory`)
      },
    },
  })
  const { contractRejectMutation } = useContract({
    contractRejectMutationProps: {
      onSuccess: () => {
        setIsConfirmationModalOpen(false)
        setIsCancelModalOpen(false)
        navigate(-1)
      },
    },
  })

  const handleAcceptApplication = useCallback(() => {
    setIsConfirmationModalOpen(true)
    setConfirmationModalTitle('Shartnoma tasdiqlaysizmi?')
    setConfirmModalhandleClickOk(
      () => () =>
        contractActionMutation.mutate({
          status: true,
          role_id: roleId,
          contract_id: id,
          user_id: userId,
          status_id: isInspeksiya ? 'e5859895-c088-429d-8d90-e9ec49b7222d' : 'e0a3963b-36f4-4e35-8413-df26e9866632', //Jarayonda status id
        })
    )
  }, [contractActionMutation, id, roleId, userId])

  const handleClickSendToDepartments = useCallback(() => {
    setIsConfirmationModalOpen(true)
    setConfirmationModalTitle('Bo’limlarga yuborishni tasdiqlaysizmi ?')
    setConfirmModalhandleClickOk(() => () => {
      sendContractToDepartmentsActionMutation.mutate({
        contract_id: id,
        role_id: roleId,
        region_id: regionId,
        user_id: userId,
      })
    })
  }, [id, roleId, userId, sendContractToDepartmentsActionMutation])

  const [rightElementComp, setRightElement] = useState(() => () => {})
  function handleCancelContract(data) {
    if (pathname.includes('archive')) {
      contractRejectMutation.mutate({
        contract_id: id,
        user_id: userId,
        comment: data?.comments?.[0]?.name,
        role_id: roleId,
      })
    } else {
      contractActionMutation.mutate({
        comment: data?.comments?.[0]?.name,
        status: false,
        role_id: roleId,
        contract_id: id,
        user_id: userId,
        status_id: '70a499b7-d6cd-46b4-8eb1-03e532a921eb', //Bekor qilingan status id
      })
    }
  }

  return (
    <>
      <div className="h-screen">
        <Header
          title={contractByIdQuery.data?.data?.contract_number || ''}
          backLink={'/' + pathname.split('/')[1]}
          rightElement={rightElementComp({
            isStatusNew,
            pathname,
            isBuhgalter,
            setIsCancelModalOpen,
            handleAcceptApplication,
            handleClickSendToDepartments,
            contractStatus,
            isYurist,
            isInspeksiya,
            id,
            pdf: contractByIdQuery?.data?.data?.pdf,
          })}
          centerElement={<Tabs elements={tabLinks} />}
        />

        <Outlet context={[control, register, reset, setValue, contractByIdQuery, setRightElement]} />
        <StatusModal
          cancelable
          isOpen={isConfirmationModalOpen}
          handleClose={() => setIsConfirmationModalOpen(false)}
          handleClickOk={() => confirmModalhandleClickOk()}
          title={confirmationModalTitle}
          status={confirmModalStatus}
          icon={confirmModalStatus === 'warning' ? <WarningIcon /> : undefined}
        />
        <ModalComment
          isOpen={isCancelModalOpen}
          handleClose={() => setIsCancelModalOpen(false)}
          title="Bekor qilish sababini kiriting"
          btnText="Bekor qilish"
          fn={(data) => handleCancelContract(data)}
          violations={[' ']}
          btnClassName="bg-red-500"
        />
      </div>
    </>
  )
}

export default ApplicationInformation
