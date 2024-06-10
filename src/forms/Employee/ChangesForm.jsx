import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import { Save } from '@mui/icons-material'

import { validations } from '../../validations'
import { useDistrict, useObject, useUser } from '../../services'
import ChangesModalTable from '../../components/ChangesModalTable'
import { changesHead } from './tableData'
import { RecentIcon } from '../../assets/icons'
import { BtnFiled, Card, FileUpload, Select } from '../../components'
import { useYupValidationResolver } from '../../hooks/useYupValidationResolver'
import { useSelector } from 'react-redux'

const ChangesForm = ({ setTableKey }) => {
  const { id } = useParams()

  const { userId } = useSelector((state) => state.auth)

  const [limit, setLimit] = useState(10)
  const [offset, setOffset] = useState(1)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedObjects, setSelectedObjects] = useState([])

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const formScheme = yup.object({
    region_id: validations.select,
    district_id: validations.select,
    // diplom: validations.string,
    // attestation: validations.string,
  })

  const {
    formState: { errors, isDirty },
    handleSubmit,
    setValue,
    reset,
    clearErrors,
    watch,
    control,
  } = useForm({
    mode: 'onBlur',
    resolver: useYupValidationResolver(formScheme),
    defaultValues: { region_id: '', district_id: '', diplom: '', attestation: '' },
  })

  const { updateUserDiplomMutation, user, userDiplomLogs } = useUser({
    id,
    offset,
    limit,
    createMutationProps: {
      onSuccess: () => {
        const { region, district } = user.data
        toast.success("Xodim ma'lumotlari muvaffaqiyatli yangilandi")
        getListObjectsQuery.refetch()
        getListByDistrict.refetch()
        reset({
          region_id: { label: region.uz_name, value: region.id },
          district_id: { label: district.uz_name, value: district.id },
          diplom: '',
          attestation: '',
        })

        setValue('diplom', '')
        setValue('attestation', '')
      },
    },
  })

  const { getListObjectsQuery, getListByDistrict } = useObject({
    getListObjectsQueryParams: { user_id: user.data?.id },
    getListObjectsQueryProps: {
      enabled: !!user.data?.id,
    },
    getListByDistrictParams: {
      district_id: watch('district_id')?.value,
      client_type_id: user.data?.client_type_id,
    },
    getListByDistrictProps: {
      enabled: !!watch('district_id') && !!user.data?.client_type_id,
    },
  })

  const { districts } = useDistrict({
    regionId: watch('region_id')?.value,
  })

  const [options, setOptions] = useState([])

  const getCurrentObjects = (currentObjects, selectedObjects) => {
    // getting added objects
    // this code will filter only added objects
    const addObjects = selectedObjects
      ?.filter((item) => !currentObjects?.find((object) => object?.object_id === item.value))
      .map((item) => item?.value)

    // const addObjects = selectedObjects?.map((item) => item?.value)

    // getting removed objects
    const removeObjects = currentObjects?.map((item, index) => {
      if (!selectedObjects?.find((object) => object?.value === item?.object_id)) {
        return currentObjects[index]?.object_id
      } else {
        return ''
      }
    })
    removeObjects?.filter((item) => item !== '')
    return {
      addObjects,
      removeObjects,
    }
  }

  const onSubmitDiplomInfo = ({ attestation, diplom, district_id, object_id }) => {
    const { addObjects, removeObjects } = getCurrentObjects(selectedObjects, object_id)

    isDirty &&
      updateUserDiplomMutation.mutate({
        added_object_ids: addObjects,
        deleted_object_ids: removeObjects,
        attestation: attestation,
        diplom: diplom,
        old_district_id: user.data?.district.id,
        updated_district_id: district_id?.value,
        user_id: userId,
        employee_id: id,
      })
  }

  useEffect(() => {
    if (Object.values(user?.data ?? {}).length) {
      const { region, district } = user.data
      setValue('region_id', { label: region.uz_name, value: region.id })
      setValue('district_id', { label: district.uz_name, value: district.id })
    }
    // eslint-disable-next-line
  }, [setValue])

  useEffect(() => {
    if (getListObjectsQuery.data) {
      const filteredOptions = getListObjectsQuery.data?.objects?.filter((item) =>
        getListByDistrict.data?.objects?.some((object) => object?.object_id !== item?.object_id)
      )
      setOptions(
        filteredOptions
          ? filteredOptions
              ?.concat(getListByDistrict.data?.objects)
              ?.filter((item) => item?.district === watch('district_id')?.label)
              ?.map((item) => ({ value: item?.object_id, label: item?.object_name + ' ' + item?.task_id }))
          : getListByDistrict.data?.objects?.map((item) => ({
              value: item?.object_id,
              label: item?.object_name + ' ' + item?.task_id,
            }))
      )
      setSelectedObjects(getListObjectsQuery.data.objects ?? [])
      setValue(
        'object_id',
        getListObjectsQuery.data.objects?.map((item) => ({
          value: item.object_id,
          label: item.object_name + ' ' + item.task_id,
        }))
      )
    }
  }, [getListObjectsQuery.data, getListByDistrict.data, setValue])

  return (
    <form onSubmit={handleSubmit(onSubmitDiplomInfo)}>
      <Card
        title="O'zgarishlar"
        rightElement={
          <BtnFiled type="submit" leftIcon={<Save />} disabled={updateUserDiplomMutation.isLoading}>
            {updateUserDiplomMutation.isLoading ? 'yuklanmoqda...' : 'Saqlash'}
          </BtnFiled>
        }
      >
        <div className="items-center gap-4">
          <span className="input-label">Viloyatlar</span>
          <div className="mb-4">
            <Select options={[]} disabled name="region_id" control={control} errors={errors} />
          </div>
          <span className="input-label">Tuman</span>
          <div className="mb-4">
            <Select
              options={districts.data?.districts?.map((item) => ({
                label: item.uz_name,
                value: item.id,
              }))}
              name="district_id"
              disabled={!watch('region_id')}
              control={control}
              errors={errors}
            />
          </div>
          <span className="input-label">Obyekt</span>
          <div className="mb-4">
            <Select
              isMulti={true}
              name="object_id"
              disabled={!watch('district_id')}
              options={options}
              control={control}
              errors={errors}
              isLoading={getListObjectsQuery.isLoading}
            />
          </div>
          <span className="input-label">Buyruq</span>
          <div className="mb-4">
            <FileUpload
              clearErrors={clearErrors}
              errors={errors}
              watch={watch}
              nameFile="diplom"
              setValue={setValue}
              shape="input"
            />
          </div>

          <span className="input-label">Attestatsiya</span>
          <div className="mb-4">
            <FileUpload
              clearErrors={clearErrors}
              errors={errors}
              nameFile="attestation"
              watch={watch}
              setValue={setValue}
              shape="input"
            />
          </div>
          <div
            className="flex justify-end text-[#0E73F6] font-normal text-sm leading-6 cursor-pointer hover:text-blue-500"
            onClick={() => {
              userDiplomLogs.refetch()
              handleOpen()
              setTableKey('changes')
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
        title="O'zgarishlar tarixi"
        isLoading={userDiplomLogs.isLoading}
        body={userDiplomLogs.data?.user_logs}
        head={changesHead}
        count={userDiplomLogs.data?.count}
      />
    </form>
  )
}

export default ChangesForm
