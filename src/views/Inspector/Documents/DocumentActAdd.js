import { Delete, Remove } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { format } from 'date-fns'
import { useId, useMemo, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { CancelIcon, SaveIcon } from '../../../assets/icons'
import { InfoIcon, InfoIconForModal, WarningIcon } from '../../../assets/icons/icons'
import { BtnFiled, BtnOutlined, Header, Input } from '../../../components'
import CustomMuiDatePicker from '../../../components/CustomMuiDatePicker'
import StatusModal from '../../../components/StatusModal'
import { DocumentActSamplingForm } from '../../../forms/Inspector/Documents/actSamplingForm'
import { useDocument } from '../../../services'
import { useTestTypes } from '../../../services/labaratory'

export default function DocumentActAdd() {
  const params = useParams()
  const navigate = useNavigate()
  const { act_id } = params
  console.log('act_id', act_id)
  const [open, setOpen] = useState(false)
  const { regionId, name, regionName, userId } = useSelector((state) => state.auth)
  const { handleSubmit, register, reset, control, setValue } = useForm({
    defaultValues: {
      lab_assistant: name,
      lab_assistant_id: userId,
      region_id: regionId,
      region_name: regionName,
      object_id: params.id,
      created_date: new Date(),
      table: [{ product_name: '' }],
    },
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'table',
  })
  const { createActSampling } = useDocument({
    createActSamplingProps: {
      onSuccess: () => {
        navigate(-1)
      },
    },
  })
  const { actLabByIdQuery } = useDocument({
    act_id,
    actLabByIdQueryParams: {
      enabled: !!act_id,
      onSuccess: (data) => {
        reset(data)
      },
    },
  })
  const { getTestTypesQuery } = useTestTypes({
    getTestTypesParams: {
      offset: 1,
      limit: 1000,
    },
  })
  const testTypeOptions = useMemo(() => {
    return getTestTypesQuery.data?.data?.test_types?.map((item) => ({
      label: item.name,
      value: item.id,
    }))
  }, [getTestTypesQuery.data])

  const handleConfirmSubmission = () => {
    handleSubmit((data) => {
      createActSampling.mutate({
        ...data,
        created_date: format(new Date(data.created_date), 'yyyy-MM-dd'),
        test: { id: data.test.value, label: data.test.label },
        table: data.table.map((item) => ({
          ...item,
          produce_date: format(new Date(item.produce_date), 'yyyy-MM-dd'),
        })),
      })
    })()
  }
  const headData = [
    {
      title: '№',
      key: 'order',
    },
    {
      title: 'Tekshiriladigan mahsulot namunasining nomi',
      key: 'product_name',
      render: (item, index) => (
        <Input
          className="border-none text-sm table-input resize-none overflow-hidden"
          withoutBorder={false}
          widthFull
          name={`table[${index}].product_name`}
          register={register}
        />
      ),
    },
    {
      title: 'Ishlab chiqarilgan sanasi',
      key: 'produce_date',
      render: (item, index) => (
        <CustomMuiDatePicker name={`table[${index}].produce_date`} control={control} withoutBorder />
      ),
    },
    {
      title: 'O`lchov birligi',
      key: 'measure',
      render: (item, index) => (
        <Input
          className="border-none text-sm table-input resize-none overflow-hidden"
          withoutBorder={false}
          widthFull
          name={`table[${index}].measure`}
          register={register}
        />
      ),
    },
    {
      title: 'Olingan namunalar soni yoki massasi (namunalar)',
      key: 'count_mass',
      width: 212,
      render: (item, index) => (
        <Input
          className="border-none text-sm table-input resize-none overflow-hidden"
          withoutBorder={false}
          widthFull
          name={`table[${index}].count_mass`}
          register={register}
        />
      ),
    },
    {
      render: (item, index) => (
        <IconButton color="error" onClick={() => remove(index)}>
          <Delete />
        </IconButton>
      ),
    },
  ]
  return (
    <form>
      <Header
        title="Акт отбора"
        backLink={-1}
        rightElement={
          <div className="flex items-center gap-[12px]">
            <BtnOutlined leftIcon={<CancelIcon />} color="red" type="button" onClick={() => navigate(-1)}>
              Bekor qilish
            </BtnOutlined>
            <BtnFiled
              color="blue"
              leftIcon={<SaveIcon />}
              type="button"
              disabled={!!act_id}
              onClick={() => setOpen(true)}
            >
              Saqlash
            </BtnFiled>
          </div>
        }
      />
      <div className="header-calc">
        <DocumentActSamplingForm
          setValue={setValue}
          control={control}
          register={register}
          headData={headData}
          fields={fields}
          append={append}
          remove={remove}
          testTypeOptions={testTypeOptions}
        />
      </div>
      <StatusModal
        title="Tasdiqlaysizmi?"
        handleClickOk={() => handleConfirmSubmission()}
        cancelable
        isOpen={open}
        status="warning"
        icon={<InfoIconForModal />}
        handleClose={() => setOpen(false)}
      />
    </form>
  )
}
