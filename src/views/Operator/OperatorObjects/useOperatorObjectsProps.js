import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Checkbox } from '../../../components'
import { useObject } from '../../../services'
import { useClaim } from '../../../services/claim'
import {
  BOSH_TEXNIK_NAZORATCHI_ROLE_ID,
  ICHKI_NAZORATCHI_ROLE_ID,
  INSPEKTOR_BOSH_ROLE_ID,
  INSPEKTOR_PRASTOY_ROLE_ID,
  INSPEKTOR_YETAKCHI_ROLE_ID,
  LOYIHACHI_MUALLIF_ROLE_ID,
  LOYIHACHI_ROLE_ID,
  TEXNIK_NAZORATCHI_ROLE_ID,
} from '../../../settings/constants'

export const useOperatorObjectsProps = () => {
  const navigate = useNavigate()
  const { cadastral_number } = useParams()
  const { name, regionName, userId } = useSelector((state) => state.auth)

  const { register, reset, handleSubmit, control } = useForm()

  const [isOpen, setIsOpen] = useState(false)
  const [isRejectOpen, setIsRejectOpen] = useState(false)

  const { id } = useParams()

  const handleOpenConfirm = () => setIsOpen(true)
  const handleCloseConfirm = () => setIsOpen(false)

  const handleOpenReject = () => setIsRejectOpen(true)
  const handleCloseReject = () => setIsRejectOpen(false)

  // handleRejectClaimStatus
  const { objects } = useObject({
    cadastral_number: cadastral_number,
    objectsQueryProps: {
      enabled: !!cadastral_number,
    },
  })

  const { setClaimObject, getClaimByIdQuery, putClaimStatusMutation } = useClaim({
    setClaimObjectProps: {
      onSuccess: (res) => {
        navigate(`${res?.data?.data?.id}/inspector`)
      },
    },
    getClaimByIdQueryProps: {
      enabled: !!id,
    },
    id,
    putClaimStatusProps: {
      onSuccess: () => {
        navigate('/applications')
      },
    },
  })

  useEffect(() => {
    if (getClaimByIdQuery.data?.data?.status === 'process' || getClaimByIdQuery.data?.data?.status === 'organization')
      navigate(`/applications`)
    // eslint-disable-next-line
  }, [getClaimByIdQuery.data?.data?.status])
  const handleConfirm = (data) => {
    setClaimObject.mutate({
      object_id: data?.radio,
      claim_id: id,
    })
  }

  const handleRejectClaimStatus = (comment) => {
    putClaimStatusMutation.mutate({
      reject: {
        IssuanceExtractRejectGasnV2FormCompletedBuildingsRegistrationCadastral: {
          gasn_cause_reject: comment,
          gasn_match: 'Talab va normalarga mos kelmaydi',
          gasn_name_reject: name,
          gasn_territory_reject: regionName,
        },
      },
      status: 'failed',
      task_id: getClaimByIdQuery.data?.data?.mygov_id?.toString(),
      reject_step: '2',
      claim_id: id,
      object_id: getClaimByIdQuery.data?.data?.object_id,
      user_id: userId,
    })
  }

  const headData = [
    {
      title: '',
      key: 'id',
      width: '48px',
      render: (value) => <Checkbox type="radio" register={register} name="radio" value={value} />,
    },
    {
      title: '№',
      key: 'order',
    },
    {
      title: 'Ariza raqami',
      key: 'task_id',
    },
    {
      title: 'Obyekt nomi',
      key: 'name',
      width: '340px',
    },
    {
      title: 'Buyurtmachi',
      key: 'customer',
      width: '240px',
      render: (value) => {
        return (
          <span>
            {value?.full_name}
            <br />
            <a className="text-[#0E73F6]" href={`tel:${value?.phone}`}>
              {value?.phone[0] !== '+' ? `+${value?.phone}` : value?.phone}
            </a>
          </span>
        )
      },
    },
    {
      title: 'Manzil',
      key: 'address',
      width: '240px',
    },
    {
      title: 'Inspektor',
      key: 'users',
      innerKey: 'inspectorUser',
      width: '240px',
      render: (values) => {
        const inspector = values?.find(
          (user) =>
            user?.role_id === INSPEKTOR_BOSH_ROLE_ID ||
            user?.role_id === INSPEKTOR_YETAKCHI_ROLE_ID ||
            user?.role_id === INSPEKTOR_PRASTOY_ROLE_ID
        )
        return (
          <span>
            {inspector?.user_name + ' ' + inspector?.user_surname + ' ' + inspector?.user_middlename}
            <br />
            <a className="text-[#0E73F6]" href={`tel:${inspector?.phone}`}>
              {inspector?.phone}
            </a>
          </span>
        )
      },
    },
    {
      title: 'Texnik nazoratchi',
      key: 'users',
      innerKey: 'technicianUser',
      width: '240px',
      render: (values) => {
        const technician = values?.find(
          (user) => user?.role_id === BOSH_TEXNIK_NAZORATCHI_ROLE_ID || user?.role_id === TEXNIK_NAZORATCHI_ROLE_ID
        )
        return (
          <span>
            {/* <b>{technician?.organization_name}</b> */}
            <br />
            {technician?.user_name + ' ' + technician?.user_surname + ' ' + technician?.user_middlename}
            <br />
            <a className="text-[#0E73F6]" href={`tel:${technician?.phone}`}>
              {technician?.phone}
            </a>
          </span>
        )
      },
    },
    {
      title: 'Loyihachi',
      key: 'users',
      innerKey: 'designer',
      width: '240px',
      render: (values) => {
        const designer = values?.find(
          (user) => user?.role_id === LOYIHACHI_ROLE_ID || user?.role_id === LOYIHACHI_MUALLIF_ROLE_ID
        )
        return (
          <span>
            {designer?.user_name + ' ' + designer?.user_surname + ' ' + designer?.user_middlename}
            <br />
            <a className="text-[#0E73F6]" href={`tel:${designer?.phone}`}>
              {designer?.phone}
            </a>
          </span>
        )
      },
    },
    {
      title: 'Ichki nazoratchi',
      key: 'users',
      innerKey: 'innerController',
      width: '240px',
      render: (values) => {
        const controller = values?.find((user) => user?.role_id === ICHKI_NAZORATCHI_ROLE_ID)
        return (
          <span>
            {/* <b>{controller?.organization_name}</b> */}
            <br />
            {controller?.user_name + ' ' + controller?.user_surname + ' ' + controller?.user_middlename}
            <br />
            <a className="text-[#0E73F6]" href={`tel:${controller?.phone}`}>
              {controller?.phone}
            </a>
          </span>
        )
      },
    },
  ]
  const bodyData = objects.data?.objects

  return {
    isLoading: objects.isLoading,
    isOpen,
    setIsOpen,
    headData,
    bodyData,
    handleSubmit,
    handleConfirm,
    handleOpenConfirm,
    handleCloseConfirm,
    handleRejectClaimStatus,
    isRejectOpen,
    handleOpenReject,
    handleCloseReject,
  }
}
