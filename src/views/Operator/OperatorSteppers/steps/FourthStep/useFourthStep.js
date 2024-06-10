import { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { StatusTag } from '../../../../../components'
import { useClaim } from '../../../../../services/claim'
import { SliderContext } from '../../../OperatorContainers'
export const useFourthStep = () => {
  const { id } = useParams()
  const { name, regionName, userId } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const { inspector, inspectorComment, blocks, isInspectionBoss, isMonitored, claimData, claimStatus } =
    useContext(SliderContext)

  const [isOpen, setIsOpen] = useState(false)
  const [images, setImages] = useState([])

  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [isRejectOpen, setIsRejectOpen] = useState(false)

  const [fileNames, setFileNames] = useState([])
  // const [isRejectOpen, onSuccess] = useState(false)

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const handleCloseConfirmModal = () => {
    setIsConfirmOpen(false)
    setFileNames([])
  }
  const handleOpenConfirmModal = () => setIsConfirmOpen(true)

  const handleCloseRejectedModal = () => setIsRejectOpen(false)
  const handleOpenRejectedModal = () => setIsRejectOpen(true)

  const onSuccess = () => console.log(fileNames)

  const {
    getClaimCheckListQuery,
    putClaimStatusMutation,
    putClaimStatusOperatorMutation,
    isHistory,
    patchClaimInspectionFileMutation,
  } = useClaim({
    getClaimCheckListParams: {
      id,
    },
    getClaimCheckListProps: {
      enabled: !!id && isInspectionBoss,
    },
    putClaimStatusProps: {
      onSuccess: () => {
        handleCloseRejectedModal()
        handleCloseConfirmModal()
        navigate(-1)
      },
    },
    putClaimStatusOperatorMutationProps: {
      onSuccess: () => navigate(-1),
    },
    patchClaimInspectionFileMutationProps: {
      onSuccess: () => navigate(-1),
    },
  })

  const canceledWithMonitoring = isMonitored

  const handleOperatorConfirm = () => {
    if ((Array.isArray(fileNames) && fileNames?.length > 0) || fileNames) {
      patchClaimInspectionFileMutation.mutate({
        file: fileNames[0],
        claim_id: id,
        file_type: 'pdf',
      })
    } else {
      toast.error('Fayl yuklash shart')
    }
  }
  // const handleOperatorReject = () => {
  //   putClaimStatusOperatorMutation.mutate({
  //     status: 'failed',
  //     task_id: claimData?.mygov_id?.toString(),
  //   })
  // }

  const dateNow = new Date()

  const handleConfirm = (comment) => {
    putClaimStatusMutation.mutate({
      accept: {
        ConclusionGasnV2FormCompletedBuildingsRegistrationCadastral: {
          address_object_gasn: claimData?.object_info?.building_address,
          buildings_title_documents_gasn: claimData?.object_info?.building_name,
          date_issue_act_gasn: `${dateNow.getFullYear()}-${dateNow.getMonth() + 1}-${dateNow.getDate()}`,
          gasn_cause: comment,
          gasn_match: '1',
          gasn_name: name,
          gasn_territory: regionName,
        },
      },
      claim_id: id,
      status: 'accepted',
      task_id: claimData?.mygov_id?.toString(),
      object_id: claimData?.object_id,
      user_id: userId,
    })
  }
  const handleReject = (comment) => {
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
      reject_step: '4',
    })
  }

  const checkListHeadData = [
    {
      title: '№',
      key: 'order',
    },
    {
      title: 'Talablar',
      key: 'title',
      width: '378px',
      render: (value) => (value ? <>{value}</> : '---'),
    },
    {
      title: 'Javob',
      key: 'answer',
      width: '136px',
      render: (value) => <StatusTag title={value ? 'Ha' : "Yo'q"} color={value ? 'green' : 'red'} />,
    },
    {
      title: 'Fotosuratlar',
      key: 'images',
      width: '134px',
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
                  alt="rasm"
                  className="w-full h-[40px] object-cover"
                />
              </div>
            ))}
          </div>
        )
      },
    },

    !isInspectionBoss && {
      title: 'Izohlar',
      key: 'comments',
      width: '378px',
      render: (value) => (value ? <>{value}</> : '---'),
    },
  ]

  const checklistBodyData = getClaimCheckListQuery.data?.data?.monitorings
  const file = claimData?.file

  return {
    canceledWithMonitoring,
    checkListHeadData,
    checklistBodyData,
    isLoading: getClaimCheckListQuery.isLoading,
    inspector,
    inspectorComment,
    blocks,
    isInspectionBoss,
    isOpen,
    images,
    handleClose,
    handleOpen,
    handleConfirm,
    isConfirmOpen,
    handleCloseConfirmModal,
    handleReject,
    isRejectOpen,
    handleCloseRejectedModal,
    handleOpenConfirmModal,
    handleOpenRejectedModal,
    isMonitored,
    handleOperatorConfirm,
    // handleOperatorReject,
    claimStatus,
    inspectorCommit: claimData?.inspector_comment,
    isHistory,
    fileNames,
    file,
    setFileNames,
    onSuccess,
    rejectStep: claimData?.reject_step,
    operatorComment: claimData?.comment,
    claimData,
  }
}
