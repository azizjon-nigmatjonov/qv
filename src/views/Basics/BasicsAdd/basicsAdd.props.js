import { useFieldArray, useForm, useWatch } from 'react-hook-form'
import { useYupValidationResolver } from '../../../hooks/useYupValidationResolver'
import * as yup from 'yup'
import { validations } from '../../../validations'
import { useField, useGetForms, useRegion } from '../../../services'
import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useAddForms } from '../../../services/basics/useAddBasics'
import { useSelector } from 'react-redux'

export const useBasicsAddProps = () => {
  const { userId } = useSelector((state) => state.auth)
  const [searchParams, setSearchParams] = useSearchParams()
  const searchParamsMemo = useMemo(() => Object.fromEntries([...searchParams]), [searchParams])
  const scheme = yup.object({
    form_number: validations.number,
  })
  const { id } = useParams()
  const navigate = useNavigate()
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
    watch,
    reset,
    resetField,
    setValue,
  } = useForm({
    resolver: useYupValidationResolver(scheme),
    mode: 'onBlur',
  })
  const { fields: regionFields, append } = useFieldArray({
    control,
    name: 'regions',
  })
  const typeOptions = [
    { value: 'b971a882-963d-4a28-a9cd-4b8daf4e792a', label: 'Davlat obyektlari' },
    { value: '41cade7c-c473-4922-8952-52787ba56a25', label: 'Tadbirkorlik obyektlari' },
  ]
  const { getFormQuery } = useGetForms({
    id,
    getFormProps: {
      enebled: !!id,
      onSuccess: (data) => {
        const body = {
          ...data.data,
          regions: data.data.regions.map((item) => ({
            region_id: item.region.id,
            uz_name: item.region.uz_name,
            planned_objects: item.planned_objects,
          })),
          category: { label: data.data.category.uz_name, value: data.data.category.id },
          sector: data.data.sector.map((el) => ({
            label: el.uz_name,
            value: el.id,
          })),
          type: typeOptions.find((item) => item.value === data.data.type_id) || typeOptions[searchParams.get('type')],
        }
        console.log(body)
        reset(body)
      },
    },
  })
  const { regions } = useRegion({
    regionsParams: {
      limit: 100,
      offset: 1,
    },
    regionProps: {
      enabled: !id,
      onSuccess: (data) => {
        const regionsArr = data.regions.map((item) => ({
          region_id: item.id,
          uz_name: item.uz_name,
        }))
        setValue('regions', regionsArr)
      },
    },
  })
  const { getObjectCategoryList, getObjectSectorList } = useField({
    getObjectCategoryListParams: {
      type: searchParamsMemo.type,
      category: watch('category')?.value,
    },
    getObjectSectorListParams: {
      type: searchParamsMemo.type,
      category: watch('category')?.value,
    },

    sectorProps: {
      enabled: !!watch('category')?.value,
    },
    categoryProps: {
      enabled: true,
    },
  })

  const objectSectorList = useMemo(() => {
    //dasturlar
    return (
      getObjectSectorList?.data?.datas?.map((el) => ({
        value: el.id,
        label: el.title,
      })) ?? []
    )
  }, [getObjectSectorList])

  const objectCategoriesList = useMemo(() => {
    //sohalar
    return (
      getObjectCategoryList?.data?.data?.datas?.map((el) => ({
        value: el.id,
        label: el.title,
      })) ?? []
    )
  }, [getObjectCategoryList?.data?.data?.datas])

  const { addFormMutation, updateFormMutation } = useAddForms({
    addFormProps: {
      onSuccess: () => {
        toast.success('Muvaffaqiyatli yuborildi')
        navigate({
          pathname: '/analytic-settings/basis/',
          search: `?type=${searchParamsMemo.type}`,
        })
      },
    },
    updateFormProps: {
      onSuccess: () => {
        toast.success('Muvaffaqiyatli yangilandi')
        navigate({
          pathname: '/analytic-settings/basis/',
          search: `?type=${searchParamsMemo.type}`,
        })
      },
    },
  })
  const watchRegions = useWatch({
    control,
    name: 'regions',
  })
  const totalObjectsInRegions = useMemo(() => {
    const regions = watchRegions
    return regions?.reduce((acc, item) => acc + parseInt(item.planned_objects || 0), 0)
  }, [watchRegions])

  const onSubmit = (data) => {
    const body = {
      ...data,
      planned_objects: parseInt(data.planned_objects),
      category_id: data.category?.value,
      created_by: userId,
      regions: data.regions.map((item) => ({
        planned_objects: parseInt(item.planned_objects),
        region_id: item.region_id,
      })),
      sector_id: data.sector?.map((item) => item.value),
      type_id: data.type?.value,
    }
    delete body.category
    delete body.sector
    delete body.type
    if (id) {
      updateFormMutation.mutate({ id, ...body })
    } else {
      addFormMutation.mutate(body)
    }
  }
  useEffect(() => {
    setValue(
      'type',
      typeOptions.find((item) => item.value === searchParamsMemo.type)
    )
  }, [])
  return {
    errors,
    register,
    handleSubmit,
    onSubmit,
    setValue,
    regionFields,
    control,
    totalObjectsInRegions,
    typeOptions,
    objectSectorList,
    objectCategoriesList,
  }
}
