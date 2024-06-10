import { History, Save, Watch } from '@mui/icons-material'
import { format } from 'date-fns'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { CancelIcon } from '../../assets/icons'
import { BtnFiled, BtnOutlined, Card, FileUpload, Header, Select } from '../../components'
import CustomMuiDatePicker from '../../components/CustomMuiDatePicker'
import StatusModal from '../../components/StatusModal'
import { useUser } from '../../services'
import useRotation from '../../services/useRotation'
import * as yup from 'yup'
import { useYupValidationResolver } from '../../hooks/useYupValidationResolver'
import HistoryChangesModal from './HistoryChangesModal'

export default function RotationEdit() {
  const { id } = useParams()
  const [statusModalIsOpen, setStatusModalIsOpen] = useState(false)
  const [historyModalIsOpen, setHistoryModalIsOpen] = useState(false)
  const [status, setStatus] = useState('')
  const [title, setTitle] = useState('')
  const navigate = useNavigate()
  const { regionId, userId } = useSelector((state) => state.auth)
  const schema = yup.object({
    second_inspector: yup.object().required('To`ldirilishi shart'),
    order_date: yup.date().required('To`ldirilishi shart'),
    order: yup.string().required('To`ldirilishi shart'),
  })
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: useYupValidationResolver(schema),
  })
  const { users } = useUser({
    role_id:
      '2316d2ab-ae0b-497b-9175-642b414c1886,80b740c4-79ef-4c45-a76a-926f90fa3780,db60cbca-8d2f-4911-9fdc-6fc30102c669',
    // statusId: '30165510-1d9d-4d6e-bcc5-6246af0cbc22',
    region_id: regionId,
    // district_id: districtId,
    offset: 1,
    limit: 1000,
    usersProps: {
      enabled: !!id,
    },
  })
  const { user } = useUser({ id })
  const { rotationCreateMutation } = useRotation({
    createRotationProps: {
      onSuccess: () => {
        console.log('success')
        setStatusModalIsOpen(true)
        setStatus('success')
        setTitle('Rotatsiya muvaffaqiyatli yaratildi')
      },
      onError: (res) => {
        console.log('error')
        setStatusModalIsOpen(true)
        setStatus('error')
        setTitle(`Rotatsiya yaratishda xatolik , \n${res?.data?.message}`)
      },
    },
  })
  const onSubmit = (data) => {
    const body = {
      ...data,
      first_inspector: user.data.id,
      second_inspector: data.second_inspector?.value,
      order_date: format(data.order_date, 'yyyy-MM-dd'),
      user_id: userId,
    }
    rotationCreateMutation.mutate(body)
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Header
          backLink={-1}
          title={user.data?.surname + ' ' + user.data?.name + ' ' + user.data?.middle_name}
          rightElement={
            <div className="flex gap-x-3">
              <BtnOutlined leftIcon={<CancelIcon />} color="red">
                Bekor qilish
              </BtnOutlined>
              <BtnFiled type="submit" leftIcon={<Save />}>
                Saqlash
              </BtnFiled>
            </div>
          }
        />
        <div className="sidebar-header-calc">
          <Card style={{ maxWidth: '548px' }} title="O’zgarishlar">
            <span className="input-label mb-1 mt-4">Inspektor</span>
            <Select
              errors={errors}
              control={control}
              required={true}
              name="second_inspector"
              options={users.data?.users
                ?.map((i) => ({
                  label: `${i?.surname} ${i?.name} ${i?.middle_name} `,
                  value: i?.id,
                }))
                .filter((el) => el?.value !== user.data?.id)}
            />
            <span className="input-label mb-1 mt-4">Buyruq</span>
            <FileUpload errors={errors} nameFile="order" setValue={setValue} shape="input" />
            <span className="input-label mb-1 mt-4">Buyruq sanasi</span>
            <CustomMuiDatePicker errors={errors} control={control} name="order_date" minDate={new Date()} />
            <div className="flex w-full justify-end align-middle mt-4">
              <div
                className="cursor-pointer flex gap-2 align-middle text-blue-400 hover:text-blue-500 font-medium"
                onClick={() => setHistoryModalIsOpen(true)}
              >
                <History className="text-inherit" /> <span className="text-inherit">O’zgarishlar tarixi</span>
              </div>
            </div>
          </Card>
        </div>
      </form>
      <HistoryChangesModal isOpen={historyModalIsOpen} handleClose={() => setHistoryModalIsOpen(false)} id={id} />
      <StatusModal
        handleClickOk={() => {
          navigate({
            pathname: '/employees/rotation',
            search: `?offset=1&limit=10&tab=1`,
          })
        }}
        isOpen={statusModalIsOpen}
        status={status}
        // handleClose={() => setStatusModalIsOpen(false)}
        title={title}
      />
    </>
  )
}
