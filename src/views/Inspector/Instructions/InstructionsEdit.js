import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { SaveIcon } from '../../../assets/icons'
import { BtnFiled, Header } from '../../../components'
import { InstructionsForm } from '../../../forms'
import { useRegulation, useViolation } from '../../../services'

export function InstructionsEdit() {
  const navigate = useNavigate()
  const { id, instruction_id } = useParams()
  const { register, setValue, watch, handleSubmit } = useForm()
  const { userId } = useSelector((state) => state.auth)
  const { regulationStatus, regulation, updateMutation } = useRegulation({
    regulationStatusQueryProps: {
      enabled: true,
    },
    updateMutationProps: {
      onSuccess: () => {
        navigate(`/inspectors/${id}/instructions`)
      },
    },
    id: instruction_id,
  })

  const { violations } = useViolation({
    regulationId: instruction_id,
  })

  const onSubmit = (data) => {
    updateMutation.mutate({
      regulation_id: instruction_id,
      status_id: data.regulation_status_id.id,
      user_id: userId,
    })
  }

  useEffect(() => {
    if (regulation?.data) {
      setValue('regulation_status_id', {
        id: regulation.data.regulation_status_id,
        status: regulation.data.regulation_status,
      })
      setValue('deadline', regulation.data.deadline)
      setValue('commentary', regulation.data.commentary)
    }
  }, [regulation.data, setValue])

  return (
    <div className='h-screen'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Header
          title='Yozma ko`rsatma berish'
          backLink={`/inspectors/${id}/instructions`}
          rightElement={
            <div className='flex items-center gap-[12px]'>
              <BtnFiled
                color='blue'
                leftIcon={<SaveIcon />}
                type='submit'
                // onClick={() => navigate(`/inspectors/${id}/instructions`)}
              >
                Saqlash
              </BtnFiled>
            </div>
          }
        />
        <div className='sidebar-header-calc'>
          <InstructionsForm
            register={register}
            regulationStatus={regulationStatus?.data?.regulation_statuses}
            watch={watch}
            setValue={setValue}
            violations={violations}
            disabled={true}
          />
        </div>
      </form>
    </div>
  )
}
