import { useForm } from 'react-hook-form'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { BtnFiled, Header } from '../../../components'
import { RegulationViewForm } from '../../../forms'
import { useYupValidationResolver } from '../../../hooks/useYupValidationResolver'
import { useRegulation, useViolation } from '../../../services'
import * as yup from 'yup'
import { validations } from '../../../validations'
import { useState } from 'react'
import { CheckCircleIcon } from '../../../assets/icons'
import { Dialog } from '@mui/material'
import { roles } from '../../../settings/constants'
import toast from 'react-hot-toast'

export function RegulationView() {
  const [open, setOpen] = useState(false)
  const { roleName } = useSelector((state) => state.auth)
  const permission = roles.find((item) => item.name === roleName)
  const { userId } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const handleClose = () => {
    setOpen(false)
    navigate(-1)
  }

  const validationSchema = yup.object().shape({
    commentary: validations.string,
  })

  const resolver = useYupValidationResolver(validationSchema)
  const { instruction_id } = useParams()
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver,
    defaultValues: {
      confirm: false,
    },
  })
  const { violations } = useViolation({
    regulationId: instruction_id,
  })

  const { updateMutation, regulation, statusLogs } = useRegulation({
    id: instruction_id,
    regulationStatusLogQueryProps: {
      id: instruction_id,
    },
  })

  const onSubmit = (data) => {
    updateMutation
      .mutateAsync({
        regulation_id: instruction_id,
        // status_id: data.confirm
        //   ? permission?.statusId
        //   : +rejectStatusIndex - 1 === -1
        //   ? permission.getStatusId
        //   : roles[rejectStatusIndex - 1].statusId,
        status_id: 'c9118cc6-952d-4239-a410-bbc72707021e',
        comment: data.commentary,
        user_id: userId,
      })
      .then(() => {
        if (data.confirm) {
          setOpen((prev) => !prev)
        } else {
          navigate(-1)
        }
      })
  }

  return (
    <>
      <div className="h-screen">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Header title="Obyekt" backLink={-1} />
          <div className="sidebar-header-calc">
            <RegulationViewForm
              register={register}
              errors={errors}
              violations={violations}
              statusId={regulation.data?.regulation_status_id}
              objectId={regulation.data?.object_id}
              instructionId={regulation.data?.id}
              onSubmit={onSubmit}
              getValues={getValues}
              statusLogs={statusLogs.data?.regulations}
            />
          </div>
        </form>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="p-[32px] flex items-center flex-col w-[584px] gap-[24px]">
          <CheckCircleIcon />
          <p className="text-[18px] font-[600] w-[80%] text-center">{permission?.statusText}</p>
          <BtnFiled color="blue" size="large" onClick={() => navigate(-1)}>
            Davom etish
          </BtnFiled>
        </div>
      </Dialog>
    </>
  )
}
