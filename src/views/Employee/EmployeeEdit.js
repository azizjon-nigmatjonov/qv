import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'

import { BtnOutlined, Header } from '../../components'
import { EmployeeForm } from '../../forms/Employee'
import { useYupValidationResolver } from '../../hooks/useYupValidationResolver'
import { useUser } from '../../services'
import { validations } from '../../validations'
import ConfirmModal from '../../components/ConfirmModal'
import { INSPEKTOR_BOSH_ROLE_ID, INSPEKTOR_PRASTOY_ROLE_ID, INSPEKTOR_YETAKCHI_ROLE_ID } from '../../settings/constants'
import { CancelIcon } from '../../assets/icons'
import toast from 'react-hot-toast'

export default function EmployeeEdit() {
  const navigate = useNavigate()
  const { id } = useParams()

  const [isOpen, setIsOpen] = useState(false)
  const [confirmType, setConfirmType] = useState('')

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const editFormSchema = yup.object({
    phone: validations.phone,
    passport_number: validations.passport_number,
    pinfl: validations.pinfl,
    nps: validations.pinfl,
  })

  const {
    handleSubmit,
    register,
    control,
    setValue,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: useYupValidationResolver(editFormSchema),
    defaultValues: {
      pinfl: '',
      passport_number: '',
      nps: '',
      phone: '',
    },
  })

  const { user, updateUserMutation } = useUser({
    id,
    limit: 10,
    offset: 1,
    userStatusesProps: {
      enabled: !!id,
    },
    createMutationProps: {
      onSuccess: () => toast.success("Xodim ma'lumotlari muvaffaqiyatli yangilandi"),
    },
  })

  useEffect(() => {
    if (Object.values(user?.data ?? {}).length) {
      const {
        pinfl,
        name,
        middle_name,
        surname,
        nps,
        phone,
        passport_number,
        diplom,
        address,
        objective,
        login,
        district,
        organization_name,
        client_type_name,
        role_name,
      } = user.data

      setValue('pinfl', pinfl)
      setValue('name', name)
      setValue('middle_name', middle_name)
      setValue(
        'passport_number',
        passport_number.length === 9 ? `${passport_number.slice(0, 2)} ${passport_number.slice(2)}` : passport_number
      )
      setValue('surname', surname)
      setValue('nps', nps)
      setValue('address', address)
      setValue('phone', phone.slice(phone.length === 12 ? 3 : 4))
      setValue('name', name)
      setValue('middle_name', middle_name)
      setValue('surname', surname)
      setValue('diplom', diplom)
      setValue('objective', objective)
      setValue('login', login)
      setValue('district', district?.uz_name)
      setValue('organization_name', organization_name)
      setValue('client_type_name', client_type_name)
      setValue('role_name', role_name)
    }
  }, [user.data, setValue])

  const onSubmitPersonalInfoEdit = ({
    phone,
    diplom,
    objective,
    name,
    middle_name,
    surname,
    pinfl,
    nps,
    passport_number,
    address,
  }) =>
    updateUserMutation.mutate({
      name,
      middle_name,
      surname,
      id,
      pinfl,
      inps: nps,
      passport_number: passport_number.split(' ').join(''),
      diplom,
      objective,
      address,
      phone: `+998${phone}`,
    })

  return (
    <div className="h-screen">
      <Header
        title={user.data?.role_name}
        backLink={-1}
        rightElement={
          <div className="flex items-center gap-[12px]">
            <BtnOutlined
              leftIcon={<CancelIcon />}
              color="red"
              onClick={() => {
                setConfirmType('reject')
                handleOpen()
              }}
            >
              Bekor qilish
            </BtnOutlined>
          </div>
        }
      />
      <div className="sidebar-header-calc">
        <EmployeeForm
          form={{
            register,
            errors,
            watch,
            setValue,
            control,
            clearErrors,
            handleSubmit,
            fn: onSubmitPersonalInfoEdit,
          }}
        />
      </div>
      <ConfirmModal
        isOpen={isOpen}
        iconColor={confirmType === 'confirm' ? '' : '#F76659'}
        title={confirmType === 'confirm' ? "Ma'lumotlar saqlansinmi?" : "Ma'lumotlarni saqlash bekor qilinsinmi?"}
        handleClose={handleClose}
        fn={() => (confirmType === 'reject' ? navigate(-1) : {})}
      />
    </div>
  )
}
