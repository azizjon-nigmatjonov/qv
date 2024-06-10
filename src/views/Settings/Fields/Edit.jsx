import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { CancelIcon, SaveIcon } from '../../../assets/icons'
import { BtnFiled, BtnOutlined, Card, Header, Input, Select } from '../../../components'
import { useField } from '../../../services'

const FieldsEdit = () => {
  const { id, status } = useParams()
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm()
  const navigate = useNavigate()

  const { createObjectCategoryMutation, createObjectSectorMutation, getObjectSectorQuery, getObjectCategoryQuery } =
    useField({
      createCategoryListProps: { onSuccess: () => navigate(-1) },
      createSectorProps: { onSuccess: () => navigate(-1) },
      sectorByIdProps: {
        enabled: !!id && status === 'category',
        onSuccess: (res) => {
          reset(res)
        },
      },
      sector_id: id,
      category_id: id,
      categoryByIdProps: {
        enabled: !!id && status === 'sector',
        onSuccess: (res) => {
          reset(res)
        },
      },
    })
  const types = [
    {
      id: 'b971a882-963d-4a28-a9cd-4b8daf4e792a',
      title: 'Davlat',
    },
    {
      id: '41cade7c-c473-4922-8952-52787ba56a25',
      title: 'Tadbirkorlik',
    },
  ]
  function handleCreate(data) {
    if (status === 'sector') {
      createObjectCategoryMutation.mutate({
        title: data.title,
        type: data.category_select.value,
      })
    } else {
      createObjectSectorMutation.mutate({
        title: data.title,
        type: data.category_select.value,
      })
    }
  }

  const onSubmit = (data) => {
    if (!id) {
      handleCreate(data)
    }
  }

  const extra = (
    <div className="flex gap-3">
      <BtnOutlined leftIcon={<CancelIcon />} color="red" type="button" onClick={() => navigate(-1)}>
        Bekor qilish
      </BtnOutlined>
      <BtnFiled leftIcon={<SaveIcon />} type="submit">
        Saqlash
      </BtnFiled>
    </div>
  )

  return (
    <div className="h-screen">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Header title={`${id ? "O'zgartirish" : "Qo'shish"}`} backLink={-1} rightElement={extra} />
        <div className="sidebar-header-calc p-4">
          <Card title="Umimiy ma'lumot" className="w-1/2 overflow-visible">
            <span className="input-label">Bo'lim</span>
            <Select
              required
              options={types?.map((item) => ({ label: item.title, value: item?.id }))}
              name="category_select"
              control={control}
              errors={errors}
            />
            <span className="input-label mt-4">Nomi</span>
            <Input errors={errors} required widthFull register={register} name="title" />
          </Card>
        </div>
      </form>
    </div>
  )
}

export default FieldsEdit
