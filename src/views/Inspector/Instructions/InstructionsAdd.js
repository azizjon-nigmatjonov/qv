import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { CancelIcon, SaveIcon } from '../../../assets/icons'
import { BtnFiled, BtnOutlined, Header } from '../../../components'
import { InstructionsForm } from '../../../forms'
import { useQuery } from '../../../hooks/useQuery'
import { useRegulation, useUser } from '../../../services'

export function InstructionsAdd() {
  const navigate = useNavigate()
  const { id } = useParams()

  const query = useQuery()
  const { handleSubmit, register, setValue, watch } = useForm()
  const [isCreate, setIsCreate] = useState(true)
  // const inspektor = useUser({ id: '2bb94eeb-528e-43c3-bc63-c6532bcdfe83' })
  // const technicalSupervisor = useUser({
  //   id: 'db3d9e27-6ae7-402e-a68b-c5ba2610c4f4',
  // })
  // const internalController = useUser({
  //   id: 'a74694a6-5050-4df3-bbc8-fccb87d65d02',
  // })
  // const copyrightControl = useUser({
  //   id: 'a74694a6-5050-4df3-bbc8-fccb87d65d02',
  // })
  const { createMutation, regulationStatus } = useRegulation({
    createMutationProps: {
      onSuccess: (res) => {
        if (!isCreate) {
          navigate(
            `/inspectors/${id}/instructions/${res.data.id}/violation/add`
          )
        } else {
          navigate(-1)
        }
      },
    },
    regulationStatusQueryProps: {
      enabled: true,
    },
  })

  useEffect(() => {
    if (regulationStatus.data?.regulation_statuses) {
      setValue(
        'regulation_status_id',
        regulationStatus.data.regulation_statuses[0]
      )
    }
  }, [regulationStatus.data, setValue])

  const onSubmit = (data) => {
    createMutation.mutate({
      ...data,
      // inspector_id: inspektor.user.data.id,
      object_id: id,
      regulation_number: (Math.floor(Math.random() * 10000) + 10000)
        .toString()
        .substring(1),
      regulation_status_id: data.regulation_status_id.id,
      regulation_type_id: query.get('regulation_type_id'),
      // user_ids: [
      //   inspektor.user.data.id,
      //   technicalSupervisor.user.data.id,
      //   copyrightControl.user.data.id,
      //   internalController.user.data.id,
      // ],
    })
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='h-screen'>
        <Header
          title='Yozma ko`rsatma berish'
          backLink={-1}
          rightElement={
            <div className='flex items-center gap-[12px]'>
              <BtnOutlined
                leftIcon={<CancelIcon />}
                color='red'
                onClick={() => navigate(-1)}
              >
                Bekor qilish
              </BtnOutlined>
              <BtnFiled
                color='blue'
                leftIcon={<SaveIcon />}
                type='submit'
                onClick={() => setIsCreate(true)}
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
            setIsCreate={setIsCreate}
          />
        </div>
      </div>
    </form>
  )
}
