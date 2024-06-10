import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { Save } from '@mui/icons-material'

import { CancelIcon } from '../../assets/icons'
import { BtnFiled, BtnOutlined, Header } from '../../components'
import CreateForm from '../../forms/Employee/CreateForm'
import { validations } from '../../validations'
import { useYupValidationResolver } from '../../hooks/useYupValidationResolver'
import { useClient, useDistrict, useRegion, useUser } from '../../services'
import { SUPER_ADMIN_ROLE_ID } from '../../settings/constants'
import { useRole } from '../../services/useRole'
import ConfirmModal from '../../components/ConfirmModal'

const EmployeeAdding = () => {
  const { regionId, roleId, regionName } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const submitBtnRef = useRef()

  const [isOpen, setIsOpen] = useState(false)
  const [confirmType, setConfirmType] = useState('')

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const addSchema = yup.object({
    passport_number: validations.passport_number,
    middle_name: validations.string,
    surname: validations.string,
    pinfl: validations.pinfl,
    name: validations.string,
    nps: validations.pinfl,
    phone: validations.phone,
    login: validations.loginAuth,
    password: validations.loginAuth,
    district_id: validations.select,
    client_type_id: validations.select,
    role_id: validations.select,
    address: validations.string,
  })

  const {
    register,
    watch,
    control,
    handleSubmit,
    setValue,
    unregister,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      pinfl: '',
      passport_number: '',
      name: '',
      middle_name: '',
      surname: '',
      nps: '',
      phone: '',
      login: '',
      password: '',
      district_id: '',
      client_type_id: '',
      role_id: '',
      diplom: '',
      objective: '',
      address: '',
    },
    resolver: useYupValidationResolver(addSchema),
  })

  const isSuperAdmin = roleId === SUPER_ADMIN_ROLE_ID

  const { regions } = useRegion({
    offset: 1,
    limit: 15,
    regionProps: { enabled: isSuperAdmin },
  })
  const { districts } = useDistrict({ regionId: isSuperAdmin ? watch('region_id')?.value : regionId })
  const { createMutation } = useUser({
    createMutationProps: {
      onSuccess: () => {
        navigate(-1)
        toast.success("Xodim muvaffaqiyatli qo'shildi")
      },
      onError: (error, data, data2) => {
        if (error.data.message?.includes('user_project_id_client_platform_id_phone_key')) {
          toast.error('Bunday telefon raqam band qilingan. Qatnashuvchining telefon raqamini tekshiring.')
        }
      },
    },
  })

  const { clients } = useClient({
    limit: 50,
    user_type_id: isSuperAdmin ? undefined : 'b2ae4fc3-fd18-41f8-9d39-371ea09035d8',
    is_super_admin: isSuperAdmin,
    clientsProps: { enabled: true },
  })

  const { roles } = useRole({
    client_type_id: watch('client_type_id')?.value,
  })

  useEffect(() => {
    if (Object.values(errors).length) {
      handleClose()
    }
  }, [errors])

  const onSubmit = (data) =>
    createMutation.mutate({
      ...data,
      phone: '+998' + data.phone,
      status: true,
      passport_number: data.passport_number.toUpperCase().split(' ').join(''),
      expires_at: `${new Date().getFullYear() + 1}-${new Date().getMonth() + 1}-01`,
      role_id: data.role_id?.value,
      client_type_id: data.client_type_id?.value,
      active: 1,
      client_platform_id: '7d4a4c38-dd84-4902-b744-0488b80a4c01',
      district_id: data.district_id?.value,
      project_id: 'e04766bc-3228-4cd9-bd22-09e3fa27a6be',
      status_id: '30165510-1d9d-4d6e-bcc5-6246af0cbc22',
      region_id: isSuperAdmin ? data.region_id.value : regionId,
      company_id: '50e3b335-aeeb-40df-b5ef-641d4f236134',
      user_type_id:
        data.client_type_id?.value === 'a3909e81-1d0f-4b57-99df-f41a33d967dd'
          ? 'e2dc35e6-28d0-4616-a303-9b33c90484d2'
          : 'b2ae4fc3-fd18-41f8-9d39-371ea09035d8',
      organization_name:
        data.client_type_id?.value === 'a3909e81-1d0f-4b57-99df-f41a33d967dd'
          ? data.organization_name
          : isSuperAdmin
          ? `${data.region_id.label.split(' ')[0]} GASN`
          : `${regionName.split(' ')[0]} GASN`,
    })

  return (
    <div className="h-screen">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Header
          backLink={-1}
          title="Qo'shish"
          rightElement={
            <div className="flex gap-3">
              <BtnOutlined
                color="red"
                leftIcon={<CancelIcon />}
                onClick={() => {
                  setConfirmType('reject')
                  handleOpen()
                }}
              >
                Bekor qilish
              </BtnOutlined>
              <BtnFiled
                disabled={Object.values(errors).length}
                leftIcon={<Save />}
                onClick={() => {
                  setConfirmType('confirm')
                  handleOpen()
                }}
              >
                Saqlash
              </BtnFiled>
            </div>
          }
        />
        <div className="sidebar-header-calc">
          <CreateForm
            unregister={unregister}
            getValues={getValues}
            register={register}
            errors={errors}
            control={control}
            setValue={setValue}
            watch={watch}
            regions={regions}
            districts={districts}
            isSuperAdmin={isSuperAdmin}
            clients={clients}
            roles={roles}
          />
        </div>
        <button type="submit" hidden ref={submitBtnRef} />
      </form>
      <ConfirmModal
        isOpen={isOpen}
        iconColor={confirmType === 'confirm' ? '' : '#F76659'}
        title={confirmType === 'confirm' ? "Ma'lumotlar saqlansinmi?" : "Ma'lumotlarni saqlash bekor qilinsinmi?"}
        handleClose={handleClose}
        fn={() => (confirmType === 'reject' ? navigate(-1) : submitBtnRef.current.click())}
      />
    </div>
  )
}

export default EmployeeAdding
