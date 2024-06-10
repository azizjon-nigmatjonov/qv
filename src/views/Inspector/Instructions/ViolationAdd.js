import { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useParams, useNavigate } from 'react-router-dom'
import { SaveIcon } from '../../../assets/icons'
import { BtnFiled, Header } from '../../../components'
import { ViolationForm } from '../../../forms'
import { useObject, useUser, useViolation } from '../../../services'

export function ViolationAdd() {
  const { id, regulation_id } = useParams()
  const navidate = useNavigate()

  const { handleSubmit, register, setValue, watch, control } = useForm({
    defaultValues: {
      images: [],
      fixed_images: [],
    },
  })

  const { fields } = useFieldArray({
    control,
    name: 'blocks',
  })

  const { fields: users } = useFieldArray({
    control,
    name: 'user_ids',
  })

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

  // useEffect(() => {
  //   if (
  //     (inspektor.user.data &&
  //       technicalSupervisor.user.data &&
  //       internalController.user.data,
  //     copyrightControl.user.data)
  //   ) {
  //     setValue('user_ids', [
  //       inspektor.user.data,
  //       technicalSupervisor.user.data,
  //       copyrightControl.user.data,
  //       internalController.user.data,
  //     ])
  //   }
  // }, [
  //   inspektor.user.data,
  //   technicalSupervisor.user.data,
  //   internalController.user.data,
  //   copyrightControl.user.data,
  //   setValue,
  // ])

  const { violationsStatus, createMutation } = useViolation({
    violationsStatusQueryProps: { enabled: true },
    createMutationProps: {
      onSuccess: () => {
        navidate(`/inspectors/${id}/instructions/${regulation_id}`)
      },
    },
  })

  useEffect(() => {
    if (violationsStatus.data?.violation_statuses) {
      setValue('status_id', violationsStatus.data.violation_statuses[0])
    }
  }, [violationsStatus.data, setValue])

  const { object } = useObject({ id })

  useEffect(() => {
    if (object?.data?.blocks) {
      setValue(
        'blocks',
        object?.data?.blocks?.map((item) => ({
          ...item,
          value: false,
        }))
      )
    }
  }, [setValue, object.data])

  const onSubmit = (data) => {
    createMutation.mutate({
      ...data,
      blocks: data.blocks
        .filter((item) => Boolean(item.value))
        .map((value, index) => ({
          id: value.id,
          name: value.name,
          number: value.number || index + 1,
        })),
      status_id: data.status_id.id,
      doc: '',
      regulation_id,
      user_ids: data.user_ids
        .filter((item) => Boolean(item.value))
        .map((value) => value.id),
    })
  }

  return (
    <div className='h-screen'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Header
          title='Yozma ko`rsatma berish'
          backLink={-1}
          rightElement={
            <div className='flex items-center gap-[12px]'>
              {/* <BtnOutlined leftIcon={<AddIcon color='#1AC19D' />} color='green'>
                Keyingi qoidabuzarlik
              </BtnOutlined> */}
              <BtnFiled color='blue' leftIcon={<SaveIcon />} type='submit'>
                Saqlash
              </BtnFiled>
            </div>
          }
        />
        <div className='sidebar-header-calc'>
          <ViolationForm
            register={register}
            setValue={setValue}
            watch={watch}
            control={control}
            fields={fields}
            users={users}
          />
        </div>
      </form>
    </div>
  )
}
