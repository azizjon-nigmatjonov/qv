import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { format } from 'date-fns'
import { Save } from '@mui/icons-material'

import { validations } from '../../validations'
import { BtnFiled, Card, FileUpload, Select } from '../../components'
import { CustomDatePicker } from '../../components/CustomDatePicker'
import { useYupValidationResolver } from '../../hooks/useYupValidationResolver'
import { useClient, useUser } from '../../services'
import {
  INSPEKTOR_BOSH_ROLE_ID,
  INSPEKTOR_PRASTOY_ROLE_ID,
  INSPEKTOR_YETAKCHI_ROLE_ID,
  SUPER_ADMIN_ROLE_ID,
} from '../../settings/constants'
import ChangesModalTable from '../../components/ChangesModalTable'
import { positionHead } from './tableData'
import { useRole } from '../../services/useRole'
import { RecentIcon } from '../../assets/icons'
import dateFormatter from '../../utils/dateFormatter'

const PositionIncreaseForm = ({ tableKey, setTableKey, setIsInspector }) => {
  const { id } = useParams()
  const { roleId } = useSelector((state) => state.auth)

  const [date, setDate] = useState(new Date())
  const [isOpen, setIsOpen] = useState(false)
  const [limit, setLimit] = useState(10)
  const [offset, setOffset] = useState(1)

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const isSuperAdmin = roleId === SUPER_ADMIN_ROLE_ID

  const schema = yup.object({
    role_id: validations.select,
    client_type_id: validations.select,
    role_order: validations.string,
  })

  const {
    watch,
    control,
    handleSubmit,
    setValue,
    reset,
    clearErrors,
    formState: { errors, isDirty },
  } = useForm({
    mode: 'onBlur',
    resolver: useYupValidationResolver(schema),
    defaultValues: {
      role_id: '',
      client_type_id: '',
      role_order: '',
    },
  })

  const { clients } = useClient({
    limit: 100,
    user_type_id: isSuperAdmin ? undefined : 'b2ae4fc3-fd18-41f8-9d39-371ea09035d8',
    is_super_admin: isSuperAdmin,
    clientsProps: { enabled: true },
  })

  const { roles } = useRole({
    client_type_id: watch('client_type_id')?.value,
  })

  const { user, updateUserRoleMutation, userRoleLogs } = useUser({
    id,
    offset,
    limit,
    shouldRequestLogRole: tableKey === 'role',
    createMutationProps: {
      onSuccess: () => {
        toast.success("Xodim ma'lumotlari muvaffaqiyatli yangilandi")
        reset({
          role_id: '',
          client_type_id: '',
          role_order: '',
        })
      },
    },
  })

  const onSubmitRoleInfo = ({ role_id, role_order }) => {
    // refetch for get user new role id not cached role id
    user.refetch()
    const roleId = role_id?.value
    setIsInspector(
      roleId === INSPEKTOR_BOSH_ROLE_ID || roleId === INSPEKTOR_PRASTOY_ROLE_ID || roleId === INSPEKTOR_YETAKCHI_ROLE_ID
    )
    updateUserRoleMutation.mutate({
      date_at: dateFormatter(format, new Date(date), 'dd-MM-yyyy'),
      old_role_id: user.data?.role_id,
      updated_role_id: roleId,
      order: role_order,
      user_id: id,
      employee_id: id,
    })
  }

  useEffect(() => {
    if (watch('role_id') && isDirty) {
      setValue('role_id', {})
    }
  }, [watch('client_type_id'), isDirty])

  return (
    <form onSubmit={handleSubmit(onSubmitRoleInfo)}>
      <Card
        title="Lavozimi oshganligi haqida ma'lumot"
        className="mb-4 overflow-visible"
        rightElement={
          <BtnFiled type="submit" leftIcon={<Save />}>
            Saqlash
          </BtnFiled>
        }
      >
        <div className="items-center gap-4">
          <span className="input-label">Sana</span>
          <div className="mb-4">
            <CustomDatePicker type="daypicker" setDate={setDate} date={date} />
          </div>
          <div>
            <span className="input-label">Bo'lim</span>
            <div className="mb-4">
              <Select
                isLoading={clients.isLoading}
                options={clients?.data?.client_types?.map((i) => ({
                  label: i.name,
                  value: i.id,
                }))}
                errors={errors}
                name="client_type_id"
                control={control}
              />
            </div>
            <span className="input-label">Lavozim</span>
            <div className="mb-4">
              <Select
                isLoading={roles.isLoading}
                options={roles?.data?.roles?.map((i) => ({
                  label: i.name,
                  value: i.id,
                }))}
                errors={errors}
                name="role_id"
                disabled={!watch('client_type_id')}
                control={control}
              />
            </div>
          </div>
          <span className="input-label">Hujjat</span>
          <div className="mb-4">
            <FileUpload
              clearErrors={clearErrors}
              errors={errors}
              nameFile="role_order"
              watch={watch}
              setValue={setValue}
              shape="input"
            />
          </div>
          <div
            className="flex justify-end text-[#0E73F6] font-normal text-sm leading-6 cursor-pointer hover:text-blue-500"
            onClick={() => {
              handleOpen()
              setTableKey('role')
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
        title="Lavozim oshganligi haqida ma'lumotlar tarixi"
        isLoading={userRoleLogs.isLoading}
        body={userRoleLogs.data?.user_role_list}
        head={positionHead}
        count={userRoleLogs.data?.count}
      />
    </form>
  )
}

export default PositionIncreaseForm
