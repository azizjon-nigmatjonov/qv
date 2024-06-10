import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { CancelIcon, SaveIcon } from '../../assets/icons'
import { BtnFiled, BtnOutlined, Card, FileUpload, Header, Input, Select } from '../../components'
import { FileView } from '../../components/FileView/FileView'
import { useLibrary } from '../../services'
import { permissions } from '../../settings/permissions'

const LibraryAdd = () => {
  const { roleId } = useSelector((state) => state.auth)
  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onSubmit' })
  const { pathname } = useLocation()
  const { id, typeId } = useParams()
  const navigate = useNavigate()

  const [fileName, setFileName] = useState('')

  const canEdit = permissions[roleId].includes('LIBRARY/EDIT')

  const { createLibraryMutation, updateLibraryMutation, library, getTypes } = useLibrary({
    id,
    libraryProps: {
      enabled: !pathname.includes('add'),
    },
    createLibraryProps: {
      onSuccess: () => navigate(-1),
    },
    getTypesProps: {
      enabled: canEdit,
    },
  })

  useEffect(() => {
    reset()
    if (library.data) {
      const data = library.data
      setValue('name', data?.name)
      setValue('department', { label: data?.department.name, value: data?.department.id })
      setValue('library_type', { label: data?.type.title, value: data?.type.id })
    }
  }, [library.data])

  const options = [
    {
      value: '068d66e7-6d9f-4089-ab01-d423f02a27f4',
      label: 'Qurilish qatnashuvchilari',
    },
    {
      value: 'c9f74a64-77d4-409e-b9be-29b88eb34d20',
      label: 'GASN xodimlari',
    },
  ]
  console.log(errors)
  const onSubmitAdd = (data) => {
    console.log(errors)
    if (!errors.length) {
      id !== 'add'
        ? updateLibraryMutation.mutate({
            department_id: data.department.value,
            id,
            name: data.name,
            type_id: data.library_type.value,
          })
        : createLibraryMutation.mutate({
            name: data.name,
            file_url: fileName,
            department_id: data.department.value,
            type_id: data.library_type.value,
          })
    }
  }

  return (
    <div className="h-screen">
      <form onSubmit={handleSubmit(onSubmitAdd)}>
        <Header
          title="Qo'shish"
          backLink={-1}
          rightElement={
            <div className="flex gap-3">
              <BtnOutlined type="button" leftIcon={<CancelIcon />} color="red" onClick={() => navigate(-1)}>
                Bekor qilish
              </BtnOutlined>
              <BtnFiled type="submit" leftIcon={<SaveIcon />}>
                Saqlash
              </BtnFiled>
            </div>
          }
        />
        <div className="sidebar-header-calc">
          <Card title="Umimiy ma'lumot" className="w-1/2">
            <span className="input-label">Nomi</span>
            <Input
              widthFull
              register={register}
              errors={errors}
              name="name"
              required={true}
              message="To'ldirilishi shart"
            />
            <span className="input-label mt-4">Bo'lim</span>
            <Select options={options} control={control} name="department" required={true} />
            {errors.department && <span className="text-red-600 transition-all text-[12px]">To'ldirilishi shart</span>}
            <span className="input-label mt-4">Kategoriya</span>
            <div>
              <Select
                options={getTypes.data?.data?.types?.map((item) => ({
                  label: item.title,
                  value: item.id,
                }))}
                name="library_type"
                control={control}
                required={true}
                // errors={errors}
                // customOnChange={(e) => setParams({ district_id: e?.value, client_type_id: user.data?.client_type_id })}
              />
              {errors.library_type && (
                <span className="text-red-600 transition-all text-[12px]">To'ldirilishi shart</span>
              )}
            </div>
            <span className="input-label mt-4">Fayl</span>
            {!pathname.includes('add') ? (
              <FileView fileName={library.data?.file_url} placeholder={library.data?.file_url} />
            ) : (
              <FileUpload
                showSmallPreview
                widthFull
                setValue={setValue}
                nameFile="file_url"
                register={register}
                handleFile={(fileName) => setFileName(fileName)}
                required={true}
              />
            )}
          </Card>
        </div>
      </form>
    </div>
  )
}

export default LibraryAdd
