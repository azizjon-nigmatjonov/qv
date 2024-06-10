import { useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { SaveIcon } from '../../../assets/icons'
import { BtnFiled, Header } from '../../../components'
import { ViolationForm } from '../../../forms'
import { useObject, useViolation } from '../../../services'
import { VIOLATION_STATUS_ID_IN_NEW } from '../../../settings/constants'
import { permissions } from '../../../settings/permissions'

export function ViolationEdit() {
  const { id, violation_id } = useParams()
  const navigate = useNavigate()
  const { roleId } = useSelector((state) => state.auth)
  const { pathname } = useLocation()

  const canCheck =
    permissions[roleId].includes('OBJECTS/INSTRUCTIONS/VIOLATIONS/MONITORING/EDIT') && pathname.includes('monitoring')

  const {
    handleSubmit,
    register,
    setValue,
    watch,
    reset,
    formState: { errors },
    control,
  } = useForm({
    mode: 'onSubmit',
  })
  const { fields } = useFieldArray({
    control,
    name: 'blocks',
  })
  const [data, setData] = useState({})
  const [blocks, setBlocks] = useState([])
  const { object } = useObject({ id })
  const { updateMutation, violation } = useViolation({
    updateMutationProps: {
      onSuccess: () => {
        navigate(-1)
      },
    },
    violationProps: {
      enabled: !!violation_id && object.isSuccess,
      onSuccess: (data) => {
        const blocks =
          object?.data?.blocks &&
          object?.data?.blocks?.map((item) => {
            const block = violation.data?.blocks?.find((val) => val.id === item.id)
            if (block) {
              return {
                ...block,
                value: violation.data?.check_list_status,
              }
            } else {
              return item
            }
          })
        setData(data)
        setBlocks(blocks)
      },
    },
    id: violation_id,
  })

  const onSubmit = (data) => {
    if (watch(fields?.map((_, index) => `blocks.${index}.value`))?.some((item) => item === true)) {
      updateMutation.mutate({
        id: violation_id,
        status_id: data.status_id.id,
        images: data.images,
        block_ids: data.blocks?.filter((i) => i.value)?.map((i) => i.id),
        description: data.description,
        title: data.title,
      })
    }
  }

  useEffect(() => {
    reset({
      ...data,
      snip: violation.data?.question?.snip,
      status_id: {
        id: data.status_id,
        status: data.status,
      },
      blocks: violation?.data?.blocks || undefined,
    })
  }, [data, blocks, violation.data])
  return (
    <div className="h-screen">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Header
          title={violation.data?.title || 'Qoidabuzarlik № 12345'}
          backLink={-1}
          rightElement={
            permissions[roleId]?.includes('OBJECTS/INSTRUCTIONS/VIOLATIONS/EDIT') &&
            !violation.data?.check_list_status && (
              <div className="flex items-center gap-[12px]">
                <BtnFiled
                  disabled={!watch(fields?.map((_, index) => `blocks.${index}.value`))?.some((item) => item === true)}
                  color="blue"
                  leftIcon={<SaveIcon />}
                  type="submit"
                >
                  Saqlash
                </BtnFiled>
              </div>
            )
          }
        />
        <div className="sidebar-header-calc">
          <ViolationForm
            roleId={roleId}
            register={register}
            setValue={setValue}
            users={violation.data?.users}
            watch={watch}
            regulationNumber={violation.data?.regulation_number}
            control={control}
            fields={fields}
            canCheck={canCheck && !violation.data?.check_list_status}
            isBlockDisabled={
              violation.data?.check_list_status && !permissions[roleId]?.includes('OBJECT/VIOLATION/BLOCK_EDIT')
            }
            disabled={
              !(
                violation.data?.status_id === VIOLATION_STATUS_ID_IN_NEW &&
                permissions[roleId]?.includes('PROVIDE_MONITORING')
              )
            }
          />
        </div>
      </form>
    </div>
  )
}
