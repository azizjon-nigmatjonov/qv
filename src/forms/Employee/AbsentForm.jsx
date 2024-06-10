import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useLocation, useParams } from 'react-router-dom'
import * as yup from 'yup'
import { Save } from '@mui/icons-material'

import { RecentIcon } from '../../assets/icons'
import { BtnFiled, Card, Select, Textarea } from '../../components'
import ChangesModalTable from '../../components/ChangesModalTable'
import { CustomDatePicker } from '../../components/CustomDatePicker'
import { useYupValidationResolver } from '../../hooks/useYupValidationResolver'
import { useUser } from '../../services'
import { validations } from '../../validations'
import { absentHead } from './tableData'
import dateFormatter from '../../utils/dateFormatter'

const AbsentForm = ({ tableKey, setTableKey }) => {
  const { id } = useParams()
  const { pathname } = useLocation()

  const [absentRange, setAbsentRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      key: 'selection',
    },
  ])
  const [isOpen, setIsOpen] = useState(false)
  const [rangeEqualDaysError, setRangeEqualDaysError] = useState(false)
  const [limit, setLimit] = useState(10)
  const [offset, setOffset] = useState(1)

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const isProfilePage = pathname.includes('profile')

  const schema = yup.object({
    description: validations.string,
    user_status_id: validations.select,
  })

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: useYupValidationResolver(schema),
    defaultValues: {
      description: '',
      user_status_id: '',
    },
  })

  const { updateUserStatusMutation, userStatusLogs, userStatuses } = useUser({
    offset,
    limit,
    shouldRequestLog: tableKey === 'absent',
    userStatusesProps: {
      enabled: !!id,
    },
    updateUserStatusMutationProps: {
      onSuccess: () => {
        toast.success("Xodim ma'lumotlari muvaffaqiyatli yangilandi")
        reset({
          user_status_id: '',
          description: '',
        })
      },
    },
  })

  const onSubmitAbsentInfo = ({ description, user_status_id }) =>
    !rangeEqualDaysError &&
    updateUserStatusMutation.mutate({
      begin_date: dateFormatter(format,new Date(absentRange[0].startDate), 'dd-MM-yyyy'),
      end_date: dateFormatter(format,new Date(absentRange[0].endDate), 'dd-MM-yyyy'),
      description,
      user_status_id: user_status_id?.value,
      user_id: id,
      employee_id: id,
    })

  useEffect(() => {
    if (absentRange[0].startDate.getTime() === absentRange[0].endDate.getTime()) {
      setRangeEqualDaysError(true)
    } else {
      setRangeEqualDaysError(false)
    }
  }, [absentRange])

  return (
    <form onSubmit={handleSubmit(onSubmitAbsentInfo)}>
      <Card
        title="Ishga kelmaganlik haqida ma'lumot"
        className="mb-4 overflow-visible"
        rightElement={
          !isProfilePage && (
            <BtnFiled type="submit" leftIcon={<Save />}>
              Saqlash
            </BtnFiled>
          )
        }
      >
        <div className="items-center gap-4">
          <span className="input-label">Sana</span>
          <div className="mb-4">
            <CustomDatePicker type="range" minDate={new Date()} range={absentRange} setRange={setAbsentRange} />
            {rangeEqualDaysError && (
              <span className="text-xs text-red-500 mt-1">Muddat kamida 1 kun bo'lishi kerak</span>
            )}
          </div>
          <span className="input-label">Sababi</span>
          <div className="mb-4">
            <Select
              disabled={isProfilePage}
              options={userStatuses.data?.user_statuses?.map((i) => ({
                label: i.status,
                value: i.id,
              }))}
              errors={errors}
              name="user_status_id"
              control={control}
            />
          </div>
          <span className="input-label">Izoh</span>
          <div className="mb-4">
            <Textarea register={register} errors={errors} name="description" widthFull disabled={isProfilePage} />
          </div>
          <div
            className="flex justify-end text-[#0E73F6] font-normal text-sm leading-6 cursor-pointer hover:text-blue-500"
            onClick={() => {
              handleOpen()
              setTableKey('absent')
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
        title="Ishga kelmaganlik haqida ma'lumotlar tarixi"
        isLoading={userStatusLogs.isLoading}
        body={userStatusLogs.data?.user_status_logs}
        head={absentHead}
        count={userStatusLogs.data?.count}
      />
    </form>
  )
}

export default AbsentForm
