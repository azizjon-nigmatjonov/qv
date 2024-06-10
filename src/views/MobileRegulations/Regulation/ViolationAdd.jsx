import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useFieldArray, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { Save } from '@mui/icons-material'
import { format } from 'date-fns'
import { permissions } from '../../../settings/permissions'
import { useBlock, useViolation } from '../../../services'
import { MobileFilterHeader } from '../../../components/FilterHeader/MobileFilterHeader'
import { ViolationForm } from '../../../forms'
import { BtnFiled } from '../../../components'
import { SaveIcon } from '../../../assets/icons'
import MobileBottomElm from '../../../components/MobileBottomElm'
import { VIOLATION_STATUS_ID_IN_NEW } from '../../../settings/constants'

export default function MobileViolationAdd() {
  const { id, violation_id, regulation_id, instruction_id } = useParams()
  const navigate = useNavigate()
  const { roleId, userId } = useSelector((state) => state.auth)
  const { pathname } = useLocation()

  const canCheck = permissions[roleId].includes('OBJECTS/INSTRUCTIONS/VIOLATIONS/MONITORING/EDIT')

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
  const [blocks, setBlocks] = useState([])
  const { getBlocks } = useBlock({
    objectId: id,
    getBlocksProps: {
      enabled: !!id,
      onSuccess: (res) => {
        if (!violation_id) {
          const blocks = res?.data?.blocks?.filter((item) => !item.is_send)
          setBlocks(blocks)
          setValue('blocks', blocks)
        } else {
          const block = res?.data?.blocks
          setBlocks(block)
        }
      },
    },
  })
  const { updateMutation, createMutation, violation } = useViolation({
    updateMutationProps: {
      onSuccess: () => {
        navigate(-1)
      },
    },
    createMutationProps: {
      onSuccess: () => {
        navigate(-1)
      },
    },

    violationProps: {
      enabled: !!violation_id,
      onSuccess: (data) => {
        reset({
          ...data,
          snip: violation.data?.question?.snip,
          status_id: {
            id: data.status_id,
            status: data.status,
          },
          blocks: violation?.data?.blocks || undefined,
        })
      },
    },
    id: violation_id,
  })
  const onSubmit = (data) => {
    if (watch(fields?.map((_, index) => `blocks.${index}.value`))?.some((item) => item === true)) {
      if (violation_id) {
        updateMutation.mutate({
          id: violation_id,
          status_id: data.status_id.id,
          images: data.images,
          block_ids: data.blocks?.filter((i) => i.value)?.map((i) => i.id),
          description: data.description,
          title: data.title,
        })
      } else {
        const body = {
          ...data,
          check_list_status: true,
          regulation_id: instruction_id,
          user_id: userId,
          question_id: '6b46632c-09a7-451e-b2e8-b1fce8c1b8ce',
          status_id: 'c43fe55a-d4fd-4a02-baff-af7d2825effc',
          deadline: format(data.deadline, 'yyyy-MM-dd'),
          object_id: id,
          images: data.images,
          block_ids: data.blocks?.filter((i) => i.value)?.map((i) => i.id),
          description: data.description,
          title: data.title,
        }
        delete body.blocks

        createMutation.mutate(body)
      }
    }
  }
  useEffect(() => {
    const blocksArr = blocks?.map((item) => {
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
    setValue('blocks', blocksArr)
  }, [blocks, violation.data?.blocks, violation.data?.check_list_status, setValue])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <MobileFilterHeader title="Qoidabuzarlik" />
      <div className="mobile-header-title-calc p-4">
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
            ) && !!violation_id
          }
        />
      </div>
      <MobileBottomElm>
        {permissions[roleId]?.includes('OBJECTS/INSTRUCTIONS/VIOLATIONS/EDIT') &&
          !violation.data?.check_list_status && (
            <BtnFiled
              disabled={!watch(fields?.map((_, index) => `blocks.${index}.value`))?.some((item) => item === true)}
              color="blue"
              leftIcon={<SaveIcon />}
              type="submit"
              className="w-full"
            >
              Saqlash
            </BtnFiled>
          )}
      </MobileBottomElm>
    </form>
  )
}
