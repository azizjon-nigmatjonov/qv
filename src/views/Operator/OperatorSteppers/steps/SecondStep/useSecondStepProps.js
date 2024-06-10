import React, { useContext, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useObject } from '../../../../../services'
import { useClaim } from '../../../../../services/claim'
import { TASHKILOTLAR } from '../../../../../settings/constants'
import { stringToDOM } from '../../../../../utils/stringToDOM'
import { SliderContext } from '../../../OperatorContainers'

export const useSecondStepProps = () => {
  const {
    reset,
    register,
    scrollToNext,
    isAdmin,
    showFourthStep,
    showThirdStep,
    claimData,
    claimStatus,
    getValues,
    scrollToEl,
    getClaimByIdQuery,
    isInspectionBoss,
  } = useContext(SliderContext)

  const { name, regionName, userId, roleId } = useSelector((state) => state.auth)

  const isUserFromOrganization = TASHKILOTLAR.includes(roleId)

  const navigate = useNavigate()
  const { id } = useParams()
  const { pathname } = useLocation()

  const [isOpen, setIsOpen] = useState(false)
  const [isDepartmentOpen, setIsDepartmentOpen] = useState(false)

  const [isHandleAcceptCloseOpen, setIsHandleAcceptCloseOpen] = useState(false)
  const [isRejectOpen, setIsRejectOpen] = useState(false)

  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleOpenDepartment = () => setIsDepartmentOpen(true)
  const handleCloseDepartment = () => setIsDepartmentOpen(false)

  const handleAcceptClose = () => setIsHandleAcceptCloseOpen(false)
  const handleAcceptOpen = () => setIsHandleAcceptCloseOpen(true)

  const handleCloseRejectedModal = () => setIsRejectOpen(false)
  const handleOpenRejectedModal = () => setIsRejectOpen(true)

  const statusFailed = 'failed'
  const statusMinistry = 'ministry'

  const isHistory = pathname.includes('history')

  const { sendToMinistryMutation, sendToGasnMutation, putClaimStatusMutation } = useClaim({
    sendToMinistryMutationProps: {},
    sendToGasnMutationProps: {
      onSuccess: () => {
        getClaimByIdQuery.refetch()
        setIsSubmitted(true)
        scrollToNext()
      },
    },
    putClaimStatusProps: {
      onSuccess: () => {
        handleCloseRejectedModal()
        navigate(-1)
      },
    },
  })

  const { objects } = useObject({
    cadastral_number: claimData?.kadastar_number,
    objectsQueryProps: {
      enabled: !!claimData?.kadastar_number,
    },
  })

  const handleMinistryConfirm = (comment, task_id) => {
    sendToMinistryMutation.mutate({
      comment,
      id: `${task_id}`,
    })
    navigate('/applications')
  }
  const handleGasnConfirm = (comment, task_id) => {
    sendToGasnMutation.mutate({
      comment,
      id: `${task_id}`,
    })
    handleAccept()
  }
  const handleRejectClaimStatus = (comment) => {
    putClaimStatusMutation.mutate({
      reject: {
        IssuanceExtractRejectGasnV2FormCompletedBuildingsRegistrationCadastral: {
          gasn_cause_reject: comment,
          gasn_match: '2',
          gasn_name_reject: name,
          gasn_territory_reject: regionName,
        },
      },
      status: 'failed',
      task_id: claimData?.mygov_id?.toString(),
      reject_step: '1',
      claim_id: id,
      object_id: claimData?.object_id,
      user_id: userId,
    })
  }

  const handleAccept = () => {
    if (!objects.data?.objects) toast.error('Obyekt mavjud emas')
    else if (objects.data?.objects?.length > 1) navigate(`objects/${claimData?.kadastar_number}`)
    else {
      navigate('inspector')
    }
  }

  const files = useMemo(() => {
    return {
      objectProject: claimData?.object_info?.scheme,
      registrationDocumentType: claimData?.object_info?.document_registration_based,
      signaturedFile: claimData?.object_info?.assignment_agreement,
      declarationFile: claimData?.object_info?.conformity_declaration,
      checkedConclusion: claimData?.object_info?.success_conclusion,
    }
  }, [claimData])

  const passportLink = stringToDOM(claimData?.object_info?.cadastral_passport_object, 'a')

  const showComment = isHistory && !showThirdStep && !showFourthStep

  return {
    setIsOpen,
    isOpen,
    handleMinistryConfirm,
    handleGasnConfirm,
    files,
    taskId: claimData?.mygov_id,
    claimStatus,
    handleOpenDepartment,
    handleCloseDepartment,
    isDepartmentOpen,
    id,
    statusFailed,
    statusMinistry,
    handleAccept,
    isHandleAcceptCloseOpen,
    handleAcceptClose,
    handleAcceptOpen,
    pathname,
    reset,
    register,
    scrollToNext,
    isAdmin,
    showFourthStep,
    showThirdStep,
    isSubmitted,
    handleRejectClaimStatus,
    isRejectOpen,
    setIsRejectOpen,
    handleCloseRejectedModal,
    handleOpenRejectedModal,
    passportLink: passportLink?.href,
    isHistory,
    comment: claimData?.comment,
    rejectStep: claimData?.reject_step,
    claimData,
    showComment,
    isUserFromOrganization,
    isInspectionBoss,
  }
}
