import { Delete } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { format } from 'date-fns'
import { useMemo, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { CancelIcon, SaveIcon } from '../../../assets/icons'
import { InfoIconForModal } from '../../../assets/icons/icons'
import { BtnFiled, BtnOutlined, Header, Input } from '../../../components'
import StatusModal from '../../../components/StatusModal'
import { DocumentProtocolForm } from '../../../forms/Inspector/Documents/protocolForm'
import { useDocument, useUser } from '../../../services'
import { useTestTypes } from '../../../services/labaratory'
import useLabaratoryInfo from '../../../services/labaratory/labaratoryInfo'

export default function DocumentProtocolAdd() {
  const params = useParams()
  const { protocol_id } = params
  const navigate = useNavigate()
  const { regionId, userId } = useSelector((state) => state.auth)
  const [setFileUrl] = useState('')
  const [open, setOpen] = useState(false)
  const { handleSubmit, register, reset, control, setValue } = useForm({
    defaultValues: {
      created_by_id: userId,
      created_date: new Date(),
      protocol_test: [{ name: '' }],
      protocol_result: [{ requirements: '' }],
    },
  })
  const {
    fields: protocolTestFields,
    append: protocolTestAppend,
    remove: protocolTestRemove,
  } = useFieldArray({
    control,
    name: 'protocol_test',
  })
  const protocolTestHeadColumns = [
    {
      title: '№',
      key: 'order',
    },
    {
      title: 'Amaldagi test vositalarining xususiyatlari',
      key: 'protocol_test',
      columns: [
        {
          title: 'Nomi',
          key: 'name',
          width: 500,
          render: (item, index) => (
            <Input
              className="border-none text-sm table-input resize-none overflow-hidden"
              withoutBorder={false}
              name={`protocol_test[${index}].name`}
              register={register}
              widthFull
            />
          ),
        },
        {
          title: 'Sertifikat raqami va sanasi',
          key: 'certificate',
          render: (item, index) => (
            <Input
              className="border-none text-sm table-input resize-none overflow-hidden"
              withoutBorder={false}
              name={`protocol_test[${index}].certificate`}
              register={register}
              widthFull
            />
          ),
        },
      ],
    },
    {
      width: 44,
      render: (item, index) => (
        <IconButton color="error" onClick={() => protocolTestRemove(index)}>
          <Delete />
        </IconButton>
      ),
    },
  ]
  const {
    fields: protocolResultFields,
    append: protocolResultAppend,
    remove: protocolResultRemove,
  } = useFieldArray({
    control,
    name: 'protocol_result',
  })
  const protocolResultHeadColumns = [
    {
      title: '№',
      key: 'order',
    },
    {
      title: 'Parametrlar nomi (talablar)',
      key: 'requirements',
      render: (item, index) => (
        <Input
          className="border-none text-sm table-input resize-none overflow-hidden"
          withoutBorder={false}
          name={`protocol_result[${index}].requirements`}
          register={register}
          widthFull
        />
      ),
    },
    {
      title: 'Parametrlarning ma`nosi (talablar)',
      key: 'meaning',
      columns: [
        {
          title: 'Normativ-Huquqiy hujjat boyicha',
          key: 'by_docs',
          render: (item, index) => (
            <Input
              className="border-none text-sm table-input resize-none overflow-hidden"
              withoutBorder={false}
              name={`protocol_result[${index}].by_docs`}
              register={register}
              widthFull
            />
          ),
        },
        {
          title: 'Aslida',
          key: 'by_real',
          render: (item, index) => (
            <Input
              className="border-none text-sm table-input resize-none overflow-hidden"
              withoutBorder={false}
              name={`protocol_result[${index}].by_real`}
              register={register}
              widthFull
            />
          ),
        },
      ],
    },
    {
      title: 'Paramertlarga muvofiqligi (talablar)',
      key: 'compatibility',
      render: (item, index) => (
        <Input
          className="border-none text-sm table-input resize-none overflow-hidden"
          withoutBorder={false}
          name={`protocol_result[${index}].compatibility`}
          register={register}
          widthFull
        />
      ),
    },
    {
      render: (item, index) => (
        <IconButton color="error" onClick={() => protocolResultRemove(index)}>
          <Delete />
        </IconButton>
      ),
    },
  ]

  const { managers } = useUser({
    offset: 1,
    limit: 1000,
    role_id: '8582a869-fb5f-4f21-8aa3-75a535c8f0b2', // viloyat labarant role id
    region_id: regionId,
    managersProps: {
      enabled: true,
      onSuccess: (data) => {
        setValue(
          'lab_assistant',
          data?.users?.[0]?.surname + ' ' + data?.users?.[0]?.name + ' ' + data?.users?.[0]?.middle_name
        )
        setValue('lab_assistant_id', data?.users?.[0]?.id)
      },
    },
  })
  const { labaratoryInfo } = useLabaratoryInfo({
    regionId: regionId,
    labaratoryInfoProps: {
      enabled: true,
      onSuccess: (data) => {
        setValue('lab_name', data?.lab_name + ' адрес: ' + data?.lab_address + ' телефон: ' + data?.lab_phone)
      },
    },
  })
  const { actsForProtocolQuery } = useDocument({
    objectId: params?.id,
    actsForProtocolQueryProps: {
      enabled: true,
    },
  })
  const actsForProtocolOptions = useMemo(() => {
    return actsForProtocolQuery?.data?.act?.map((item) => ({
      value: item.id,
      label: item.name,
    }))
  }, [actsForProtocolQuery?.data])
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
  const { protocolByIdQuery } = useDocument({
    protocol_id,
    protocolByIdProps: {
      enabled: !!protocol_id,
      onSuccess: (res) => {
        const body = {
          ...res.data,
          act: {
            label: res.data.act_name,
            value: res.data.act_id,
          },
          test_type: {
            label: res.data.test_type,
            value: res.data.test_id,
          },
        }
        reset(body)
      },
    },
  })
  const { createProtocolMutation } = useDocument({
    createProtocolProps: {
      onSuccess: () => {
        navigate(-1)
      },
    },
  })
  const onSubmit = (data) =>
    createProtocolMutation.mutate({
      ...data,
      file: data.file,
      doc_number: 'string',
      object_id: params.id,
    })
  const handleConfirmSubmission = () => {
    handleSubmit((data) => {
      const body = {
        ...data,
        act_name: data?.act?.label,
        act_number: actsForProtocolQuery?.data?.act?.find((item) => item.id === data?.act?.value)?.number,
        act_date: actsForProtocolQuery?.data?.act?.find((item) => item.id === data?.act?.value)?.date,
        test_type: data?.test_type?.label,
        certificate_date: format(new Date(data?.certificate_date), 'yyyy-MM-dd'),
        created_date: format(new Date(data?.created_date), 'yyyy-MM-dd'),
        region_id: regionId,
      }
      delete body.act
      onSubmit(body)
    })()
  }
  return (
    <form>
      <Header
        title="Fayl yuklash"
        backLink={-1}
        rightElement={
          !protocol_id && (
            <div className="flex items-center gap-[12px]">
              <BtnOutlined leftIcon={<CancelIcon />} color="red" type="button" onClick={() => navigate(-1)}>
                Bekor qilish
              </BtnOutlined>
              <BtnFiled color="blue" leftIcon={<SaveIcon />} type="button" onClick={() => setOpen(true)}>
                Saqlash
              </BtnFiled>
            </div>
          )
        }
      />
      <div className="header-calc">
        <DocumentProtocolForm
          protocolTestHeadColumns={protocolTestHeadColumns}
          protocolTestFields={protocolTestFields}
          protocolTestAppend={protocolTestAppend}
          protocolResultHeadColumns={protocolResultHeadColumns}
          protocolResultFields={protocolResultFields}
          protocolResultAppend={protocolResultAppend}
          testTypeOptions={testTypeOptions}
          actsForProtocolOptions={actsForProtocolOptions}
          setValue={setValue}
          control={control}
          register={register}
          handleFile={setFileUrl}
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
