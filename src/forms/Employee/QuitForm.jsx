import { useState } from 'react'
import { useParams } from 'react-router-dom'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { format } from 'date-fns'
import { Save } from '@mui/icons-material'

import { RecentIcon } from '../../assets/icons'
import { BtnFiled, Card, FileUpload } from '../../components'
import { CustomDatePicker } from '../../components/CustomDatePicker'
import { useUser } from '../../services'
import ChangesModalTable from '../../components/ChangesModalTable'
import { firedHead } from './tableData'
import { validations } from '../../validations'
import { useYupValidationResolver } from '../../hooks/useYupValidationResolver'
import dateFormatter from '../../utils/dateFormatter'

const QuitForm = ({ tableKey, setTableKey }) => {
  const { id } = useParams()

  const [quitDate, setQuitDate] = useState(new Date())
  const [isOpen, setIsOpen] = useState(false)
  const [limit, setLimit] = useState(10)
  const [offset, setOffset] = useState(1)

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const schema = yup.object({
    dismissal_order: validations.string,
  })

  const {
    handleSubmit,
    setValue,
    clearErrors,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: useYupValidationResolver(schema),
    defaultValues: {
      description: '',
      user_status_id: '',
    },
  })

  const { updateUserDismissalMutation, userLogs } = useUser({
    id,
    offset,
    limit,
    shouldRequestLogUser: tableKey === 'quit',
    createMutationProps: {
      onSuccess: () => {
        toast.success("Xodim ma'lumotlari muvaffaqiyatli yangilandi")
        reset({
          dismissal_order: '',
        })
      },
    },
  })

  const onSubmitQuitInfo = ({ dismissal_order }) =>
    updateUserDismissalMutation.mutate({
      date_at: dateFormatter(format, new Date(quitDate), 'dd-MM-yyyy'),
      order: dismissal_order,
      user_id: id,
      employee_id: id,
    })

  return (
    <form onSubmit={handleSubmit(onSubmitQuitInfo)}>
      <Card
        title="Ishdan bo'shatish haqida ma'lumot"
        className="overflow-visible"
        rightElement={
          <BtnFiled type="submit" leftIcon={<Save />}>
            Saqlash
          </BtnFiled>
        }
      >
        <div className="items-center gap-4">
          <span className="input-label">Sana</span>
          <div className="mb-4">
            <CustomDatePicker type="daypicker" setDate={setQuitDate} date={quitDate} position="top" />
          </div>
          <span className="input-label">Hujjat</span>
          <div className="mb-4">
            <FileUpload
              required
              watch={watch}
              clearErrors={clearErrors}
              errors={errors}
              nameFile="dismissal_order"
              setValue={setValue}
              shape="input"
            />
          </div>
          <div
            className="flex justify-end text-[#0E73F6] font-normal text-sm leading-6 cursor-pointer"
            onClick={() => {
              handleOpen()
              setTableKey('quit')
            }}
          >
            <span>
              <RecentIcon />
            </span>
            <span className="ml-2">O'zgarishlar tarixi</span>
          </div>
        </div>
      </Card>
      <ChangesModalTable
        limit={limit}
        offset={offset}
        setLimit={setLimit}
        setOffset={setOffset}
        isOpen={isOpen}
        handleClose={handleClose}
        title="Ishdan bo'shatish haqida ma'lumotlar tarixi"
        isLoading={userLogs.isLoading}
        body={userLogs.data?.dismissal_logs}
        head={firedHead}
        count={userLogs.data?.count}
      />
    </form>
  )
}

export default QuitForm
