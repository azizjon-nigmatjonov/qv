import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { CancelIcon, SaveIcon } from '../../../assets/icons'
import { BtnFiled, BtnOutlined, Card, Header, Input, Select } from '../../../components'
import { useClient } from '../../../services'
import DeleteIcon from '@mui/icons-material/Delete'
import { useRole } from '../../../services/useRole'
import { useEffect } from 'react'
import { useState } from 'react'
import ConfirmModal from '../../../components/ConfirmModal'

const RolesEdit = () => {
  const { id } = useParams()
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const { createRoleMutation, updateRoleMutation, deleteRoleMutation } = useRole({
    createRoleProps: { onSuccess: () => navigate(-1) },
    deleteRoleProps: { onSuccess: () => navigate(-1) },
    updateRoleProps: { onSuccess: () => navigate(-1) },
  })

  const { role } = useRole({ id: id === 'add' ? false : id })

  const { clients, client } = useClient({
    id: role.data?.client_type_id,
    limit: 20,
    clientsProps: {
      enabled: true,
      select: (data) =>
        data?.client_types?.map((client) => ({
          label: client.name,
          value: client.id,
        })),
    },
  })

  const onSubmit = (data) =>
    id === 'add'
      ? createRoleMutation.mutate({
          project_id: 'e04766bc-3228-4cd9-bd22-09e3fa27a6be',
          client_platform_id: '7d4a4c38-dd84-4902-b744-0488b80a4c01',
          client_type_id: data.client_type_id.value,
          name: data.role,
        })
      : updateRoleMutation.mutate({
          id,
          client_platform_id: '7d4a4c38-dd84-4902-b744-0488b80a4c01',
          project_id: 'e04766bc-3228-4cd9-bd22-09e3fa27a6be',
          client_type_id: data.client_type_id.value,
          name: data.role,
        })

  useEffect(() => {
    if (role.data) {
      setValue('role', role.data?.name)
    }
  }, [role.data])

  useEffect(() => {
    if (client.data) {
      setValue('client_type_id', {
        label: client.data?.client_type?.name,
        value: client.data?.client_type?.id,
      })
    }
  }, [client.data])

  return (
    <div className="h-screen">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Header
          title={`${id ? "O'zgartirish" : "Qo'shish"}`}
          backLink={-1}
          rightElement={
            <div className="flex gap-3">
              {id !== 'add' && (
                <BtnOutlined leftIcon={<DeleteIcon />} type="button" color="red" onClick={handleOpen}>
                  O'chirish
                </BtnOutlined>
              )}
              <BtnOutlined leftIcon={<CancelIcon />} color="red" type="button" onClick={() => navigate(-1)}>
                Bekor qilish
              </BtnOutlined>
              <BtnFiled leftIcon={<SaveIcon />} type="submit">
                Saqlash
              </BtnFiled>
            </div>
          }
        />
        <div className="sidebar-header-calc">
          <Card title="Umimiy ma'lumot" className="w-1/2 overflow-visible">
            <span className="input-label">Bo'lim</span>
            <Select errors={errors} required options={clients?.data} control={control} name="client_type_id" />
            <span className="input-label mt-4">Rollar</span>
            <Input errors={errors} required widthFull register={register} name="role" />
          </Card>
        </div>
      </form>
      <ConfirmModal
        isOpen={isOpen}
        handleClose={handleClose}
        title="Ushbu rolni o'chirishni xoxlaysizmi?"
        iconColor="#F76659"
        fn={() => deleteRoleMutation.mutate({ id })}
      />
    </div>
  )
}

export default RolesEdit
