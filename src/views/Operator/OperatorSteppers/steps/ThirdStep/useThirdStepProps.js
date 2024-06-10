import { format } from 'date-fns'
import { useCallback, useEffect } from 'react'
import { useContext, useState } from 'react'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { CancelIcon } from '../../../../../assets/icons'
import { WarningIcon } from '../../../../../assets/icons/icons'
import { Checkbox, StatusTag } from '../../../../../components'
import DownloadBadge from '../../../../../components/DownloadBadge/DownloadBadge'
import { useObject } from '../../../../../services'
import { useClaim } from '../../../../../services/claim'
import {
  APARTMENT_ROLE_ID,
  AUTHOR_SUPERVISOR_ROLE_ID,
  BOSH_TEXNIK_NAZORATCHI_ROLE_ID,
  FAVQULOTDA_VAZIYATLAR_VAZIRLIK_ROLE_ID,
  ICHKI_NAZORATCHI_ROLE_ID,
  LOYIHACHI_MUALLIF_ROLE_ID,
  LOYIHACHI_ROLE_ID,
  MCHS_ROLE_ID,
  PUDRATCHI_ROLE_ID,
  SANITARIYA_EPIDEMIOLOGIYA_ROLE_ID,
  SES_ROLE_ID,
  TASHKILOTLAR,
  TEXNIK_NAZORATCHI_ROLE_ID,
} from '../../../../../settings/constants'
import dateFormatter from '../../../../../utils/dateFormatter'
import { SliderContext } from '../../../OperatorContainers'

export const useThirdStepProps = () => {
  const navigate = useNavigate()
  const { id, object_id } = useParams()
  const { roleId, name, fullName, userId, regionId, certificateCourses, regionName, organizationName, roleInObject } =
    useSelector((state) => state.auth)
  const isUserFromOrganization = TASHKILOTLAR.includes(roleId)

  const {
    isAdmin,
    register,
    control: formControl,
    showFourthStep,
    scrollToNext,
    isInspectionBoss,
    showThirdStep,
    claimData,
    claimStatus,
    inspector,
    isHistory,
    getValues: applicationValues,
    handleSubmit: handleOrgSubmit,
    reset: sliderFormReset,
    errors,
  } = useContext(SliderContext)

  const { pathname } = useLocation()

  const { register: checkBoxRegister, handleSubmit, watch, control, getValues, setValue, reset } = useForm()

  const [isTruthy, setIsTruthy] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)

  const [modalIcon, setModalIcon] = useState(null)
  const [modalTitle, setModalTitle] = useState(null)

  const [modalStatus, setModalStatus] = useState(null)
  const [isInspectorModalOpen, setIsInspectorModalOpen] = useState(false)

  const [isAccept, setIsAccept] = useState(true)
  const [isOrganizationModalOpen, setIsOrganizationModalOpen] = useState(false)

  const [isOperatorCancelOpen, setIsOperatorCancelOpen] = useState(false)

  const checkboxes = useRef([])
  const checkboxSubscriber = watch(checkboxes)

  const handleInspectorModalClose = () => setIsInspectorModalOpen(false)
  const handleOpenInspectorConfirm = () => setIsInspectorModalOpen(true)

  const handleOrganizationModalClose = () => setIsOrganizationModalOpen(false)
  const handleOrganizationModalOpen = () => setIsOrganizationModalOpen(true)

  const handleOpenOperatorCancel = () => setIsOperatorCancelOpen(true)
  const handleCloseOperatorCancel = () => setIsOperatorCancelOpen(false)

  const [certificateDate, setCertificateDate] = useState(new Date())
  const [orderDate, setOrderDate] = useState(new Date())
  const [customerCerDate, setCustomerCerDate] = useState()
  const [startDate, setStartDate] = useState(new Date())
  const [finishedDate, setFinishedDate] = useState(new Date())

  const handleRejectModalClose = () => setIsRejectModalOpen(false)
  const handleRejectModalOpen = () => setIsRejectModalOpen(true)

  const handleReject = (data) => {
    const { comment } = applicationValues()
    if (!data?.comments[0].name?.trim() || !data?.comments[1].name?.trim()) {
      toast.error("Ma'lumotlarni to'liq kiriting")
    } else {
      postClaimOrgCommentMutation.mutate({
        org_comment: {
          number: data?.comments[1].name,
          date: dateFormatter(format, 'yyyy-MM-dd'),
          region_name: object.data?.region?.uz_name,
          org_name: organizationName,
          object_name: object.data?.name,
          object_address: object.data?.address,
          description: comment,
          den_fion: fullName,
          den_id: userId,
          den_role: data?.comments[0].name,
          is_reject: true,
          doc_type: isApartment ? 'appartment' : isDen ? 'den' : isSes || isSanitar ? 'ses' : '',
          tech_org_name: object.data?.users?.find(
            (item) => item?.role_id === TEXNIK_NAZORATCHI_ROLE_ID || item?.role_id === BOSH_TEXNIK_NAZORATCHI_ROLE_ID
          )?.organization_name,
        },
        org_type: isSes || isSanitar ? 'ses' : isDen ? 'den' : isApartment ? 'appartment' : '',
        org_id: userId,
        claim_id: claimData?.id,
      })
    }
  }

  const isOrganizationStatus = claimStatus === 'organization'
  const isInspectorStatus = claimStatus === 'inspector'
  const isNewStatus = claimStatus === 'new'
  const isInProcess = claimStatus === 'process'

  const handleChange = () => {
    const newResult = {}
    for (let key in getValues()) {
      newResult[key] = !isTruthy
    }
    setIsTruthy(!isTruthy)
    reset(newResult)
  }

  const { postClaimOrgCommentMutation } = useClaim({
    postClaimOrgCommentMutationProps: {
      onSuccess: (data) => {
        const { comment, tech_org_name } = applicationValues()
        sliderFormReset()
        handleOrganizationModalClose()
        handleRejectModalClose()
        navigate(-1)
        handleSubmitFromOrganization({ comment: comment, tech_org_name: tech_org_name }, data?.data?.data?.file)
      },
    },
  })

  const { object } = useObject({
    id: claimData?.object_id,
  })

  const isApartment = roleId === APARTMENT_ROLE_ID
  const isDen = roleId === MCHS_ROLE_ID || roleId === FAVQULOTDA_VAZIYATLAR_VAZIRLIK_ROLE_ID
  const isSes = roleId === SES_ROLE_ID
  const isSanitar = roleId === SANITARIYA_EPIDEMIOLOGIYA_ROLE_ID

  const onOrganizationSubmit = (data) => {
    const {
      comment,
      tech_org_name,
      director_name,
      director_name_2,
      order_num,
      org_name,
      cer_num,
      cer_date,
      customer_director,
      // started_date,
      // finished_date,
      // project_summ,
      building_summ,
      tools_summ,
      project_num,
      council_num,
      organization_name,
      role_in_object,
      customer_cer_date,
      certificate_date,
      order_date,
      address,
    } = data
    // ses den apartment
    isApartment || isDen || isSes || isSanitar
      ? postClaimOrgCommentMutation.mutate({
          org_comment: {
            number: council_num,
            date: dateFormatter(format, new Date(), 'dd.MM.yyyy'),
            region_name: object.data?.region?.uz_name,
            org_name: organizationName,
            object_name: object.data?.name,
            object_address: object.data?.address,
            description: comment,
            reject_comment: '',
            den_fion: fullName,
            is_reject: false,
            doc_type: isApartment ? 'appartment' : isDen ? 'den' : isSes || isSanitar ? 'ses' : '',
            den_id: userId,
            den_role: role_in_object,
            address,
            tech_org_name: object.data?.data?.users?.find(
              (item) => item?.role_id === TEXNIK_NAZORATCHI_ROLE_ID || item?.role_id === BOSH_TEXNIK_NAZORATCHI_ROLE_ID
            )?.organization_name,
          },
          org_type: isSes || isSanitar ? 'ses' : isDen ? 'den' : isApartment ? 'appartment' : '',
          org_id: userId,
          claim_id: claimData?.id,
        })
      : postClaimOrgCommentMutation.mutate({
          // id: 'ooooooo',
          org_comment: {
            // date: dateFormatter(format, new Date(), 'dd.MM.yyyy'),
            date: format(new Date(), 'dd.MM.yyyy'),
            // tech_org_name: object.data?.users?.find(
            //   (item) => item?.role_id === TEXNIK_NAZORATCHI_ROLE_ID || item?.role_id === BOSH_TEXNIK_NAZORATCHI_ROLE_ID
            // )?.organization_name,
            tech_org_name: organizationName,
            director_name,
            tech_fio: fullName,
            tech_cer_num: certificateCourses,
            tech_cer_date: format(certificateDate, 'dd.MM.yyyy'),
            // dateFormatter(format, certificateDate, 'dd.MM.yyyy'),
            order_num,
            order_date: format(orderDate, 'dd.MM.yyyy'),
            // dateFormatter(format, orderDate, 'dd.MM.yyyy')
            object_name: object.data?.name,
            odject_address: object.data?.address,
            address,
            client: claimData?.customer_name,
            inspector_org_name: object?.data?.users?.find(
              (item) => item?.role_id === PUDRATCHI_ROLE_ID || item?.role_id === ICHKI_NAZORATCHI_ROLE_ID
            )?.organization_name,
            customer_cer_num: object.data?.customer_cer_num,
            customer_cer_date: '', //keyin qo'shiladi
            customer_director,
            org_name,
            cer_num,
            // cer_date: customerCerDate ? dateFormatter(format, customerCerDate, 'dd.MM.yyyy') : '',
            cer_date: customerCerDate ? format(customerCerDate, 'dd.MM.yyyy') : '',
            director_name_2,
            started_date: format(startDate, 'MM.yyyy'),
            finished_date: format(finishedDate, 'MM.yyyy'),
            project_summ: `${+building_summ + +tools_summ}`,
            building_summ,
            tools_summ,
            project_org_name: organizationName,
            project_num,
            region_name: object.data?.region?.uz_name,
            council_num: object.data?.number_protocol,
            council_date: object.data?.date_protocol,
            description: comment,
            created_by: fullName,
            created_by_id: userId,
          },
          // org_reviews_id: 'aaakokoa',
          // certificateDate
          // orderDate
          // customerCerDate
          // startDate
          // finishedDate
          org_type:
            roleId === TEXNIK_NAZORATCHI_ROLE_ID
              ? 'tech'
              : roleId === LOYIHACHI_MUALLIF_ROLE_ID
              ? 'author'
              : roleId === SES_ROLE_ID
              ? 'ses'
              : roleId === MCHS_ROLE_ID
              ? 'den'
              : roleId === APARTMENT_ROLE_ID
              ? 'appartment'
              : '',
          org_id: userId,
          claim_id: claimData?.id,
        })
  }

  const handleRejectOperator = (comment) => {
    putClaimStatusMutation.mutate({
      reject: {
        IssuanceExtractRejectGasnV2FormCompletedBuildingsRegistrationCadastral: {
          gasn_cause_reject: comment,
          gasn_match: '2',
          gasn_name_reject: name,
          gasn_territory_reject: regionName,
        },
      },
      claim_id: id,
      status: 'failed',
      task_id: claimData?.mygov_id?.toString(),
      object_id: claimData?.object_id,
      user_id: userId,
      reject_step: '3',
    })
  }

  const onSubmit = async (data) => {
    if (isUserFromOrganization) {
      await handleSubmitFromOrganization(data)
    } else {
      await handleSubmitFromOperator(data)
    }
  }
  async function handleSubmitFromOrganization(data, file) {
    const { comment } = applicationValues()
    const body = {
      ...data,
      district_name: organizationName,
      id: id,
      region_id: claimData?.object_info?.region_id,
      role_id: roleId,
      status: modalStatus || isAccept ? 'accepted' : 'failed',
      user_name: fullName,
      user_id: userId,
      task_id: `${claimData?.mygov_id}`,
      file: file || '',
      comment,
    }
    claimOrgActionsMutation.mutate(body)
  }
  async function handleSubmitFromOperator(data) {
    let result = []
    // data is object with keys of checkbox names and values of true or false
    // need to filter true values and send to server
    await Object.entries(data).forEach(([key, value]) => {
      if (value) {
        result.push({
          user_id: key,
          org_name: getClaimOrganizationsQuery.data?.data?.organization_reviews?.find((item) => item.user_id === key)
            ?.organization_name,
        })
      }
    })
    setClaimOrgActionsMutation.mutate({ claim_id: id, object_id: object_id ?? claimData?.object_id, datas: result })
  }
  const handleOpenConfirm = () => {
    setIsOpen(true)
    setModalTitle('Tasdiqlaysizmi?')
    setModalStatus('accepted')
  }
  const handleOpenCancel = () => {
    setIsOpen(true)
    setModalTitle('Ariza rad etilsinmi?')
    setModalStatus('failed')
    setModalIcon(<WarningIcon />)
  }
  const handleCloseConfirm = () => {
    setIsOpen(false)
    setModalIcon(null)
    setModalIcon(null)
    setModalStatus(null)
  }
  const handleSendToInspector = () => {
    putClaimStatusOperatorMutation.mutate({
      status: 'inspector',
      task_id: claimData?.mygov_id?.toString(),
    })
  }

  const handleConfirm = () => {
    if (!isAdmin || isUserFromOrganization) {
      navigate('/applications')
    } else {
      navigate(-1)
    }
  }

  const {
    getClaimOrganizationsQuery,
    setClaimOrgActionsMutation,
    claimOrgActionsMutation,
    putClaimStatusOperatorMutation,
    putClaimStatusMutation,
  } = useClaim({
    getClaimOrganizationsParams: {
      // claim_id: claimStatus !== 'process' ? id : '',
      object_id: claimData?.object_id,
      region_id: regionId,
      is_sended: claimStatus !== 'process' ? true : false,
    },
    getClaimOrganizationsProps: {
      enabled: !claimStatus ? false : !isNewStatus,
    },
    setClaimOrgActionsProps: {
      onSuccess: () => {
        handleConfirm()
      },
    },
    claimOrgActionsProps: {
      onSuccess: () => (pathname.includes('/instructions') ? navigate('/instructions') : navigate('/applications')),
    },
    putClaimStatusOperatorMutationProps: {
      onSuccess: () => navigate(-1),
    },
    putClaimStatusProps: {
      onSuccess: () => navigate(-1),
    },
    id,
  })

  const isAllAccepted = getClaimOrganizationsQuery.data?.data?.organization_reviews?.every(
    (organization) => organization?.status === 'accepted'
  )

  const file = getClaimOrganizationsQuery.data?.data?.organization_reviews?.find((org) => org?.user_id === userId)?.file
  const comment = getClaimOrganizationsQuery.data?.data?.organization_reviews?.find(
    (org) => org?.user_id === userId
  )?.comment

  const withNewStatus = getClaimOrganizationsQuery.data?.data?.organization_reviews?.some(
    (organization) => organization?.status === 'new'
  )

  const headData = [
    (isNewStatus || isInProcess) &&
      !isInspectionBoss && {
        title: (
          <Checkbox
            name="all"
            checked={
              Object.values(checkboxSubscriber).length &&
              Object.values(checkboxSubscriber)?.every((checkbox) => checkbox)
            }
            onChange={handleChange}
          />
        ),
        key: ['user_id', 'organization_name'],
        render: (values) => {
          if (!checkboxes.current.includes(values[0])) checkboxes.current?.push(values[0])
          return <Checkbox register={checkBoxRegister} name={values[0]} checked={watch(values[0])} />
        },
      },
    {
      title: '№',
      key: 'order',
    },
    {
      title: 'Tashkilotlar',
      key: 'organization_name',
    },
    {
      title: 'Izoh',
      key: 'comment',
      render: (value) => <>{value ? value : ''}</>,
    },
    {
      title: 'Fayl',
      key: ['file', 'status'],
      render: (values) =>
        values[0] && values[1] !== 'failed' ? (
          <DownloadBadge label={values[0]} value={values[0]} maxWidth="100%" />
        ) : (
          ''
        ),
    },
    {
      title: 'Holat',
      key: 'status',
      render: (value) => <StatusTag title={value} />,
    },
  ]

  const canSendToOrganizations = Object.values(getValues())?.every((user) => user === false)
  const isMuallif = roleId === LOYIHACHI_MUALLIF_ROLE_ID || roleId === AUTHOR_SUPERVISOR_ROLE_ID
  const isTechnique = roleId === BOSH_TEXNIK_NAZORATCHI_ROLE_ID || roleId === TEXNIK_NAZORATCHI_ROLE_ID

  return {
    headData,
    bodyData: getClaimOrganizationsQuery.data?.data?.organization_reviews,
    handleOpenConfirm,
    handleCloseConfirm,
    isOpen,
    setIsOpen,
    handleConfirm,
    scrollToNext,
    showFourthStep,
    isAdmin,
    setValue,
    watch,
    register: checkBoxRegister,
    isLoading: getClaimOrganizationsQuery.isLoading,
    onSubmit,
    handleSubmit,
    handleOpenCancel,
    modalIcon,
    modalTitle,
    claimStatus,
    handleSendToInspector,
    isOrganizationStatus,
    isInspectorStatus,
    isAllAccepted,
    isInspectorModalOpen,
    handleInspectorModalClose,
    handleOpenInspectorConfirm,
    isOrganizationModalOpen,
    handleOrganizationModalClose,
    handleOrganizationModalOpen,
    inspector,
    canSendToOrganizations,
    isHistory,
    withNewStatus,
    isMuallif,
    isTechnique,
    formRegister: register,
    onOrganizationSubmit,
    handleOrgSubmit,
    isApartment,
    isDen,
    isSes,
    isSanitar,
    handleRejectModalClose,
    handleRejectModalOpen,
    handleReject,
    isRejectModalOpen,
    errors,
    setIsAccept,
    control: formControl,
    setCertificateDate,
    setOrderDate,
    setCustomerCerDate,
    setStartDate,
    setFinishedDate,
    file,
    comment,
    isOperatorCancelOpen,
    handleOpenOperatorCancel,
    handleCloseOperatorCancel,
    handleRejectOperator,
    operatorComment: claimData?.comment,
  }
}
