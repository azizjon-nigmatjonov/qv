import { useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { CancelIcon, SaveIcon } from '../../assets/icons'
import { BtnFiled, BtnOutlined, Header } from '../../components'
import { InspectorForm } from '../../forms'
import { useDistrict, useObject, useRegion, useUser } from '../../services'
import * as yup from 'yup'
import { useYupValidationResolver } from '../../hooks/useYupValidationResolver'
import { validations } from '../../validations'
import { roles } from '../../settings/constants'

export function InspectorAdd() {
  const { roleName } = useSelector((state) => state.auth)
  const validationSchema = yup.object().shape({
    name: validations.string,
    region_id: validations.mixed,
    district_id: validations.mixed,
    address: validations.string,
    difficulty_category_id: validations.mixed,
    construction_type_id: validations.mixed,
    construction_cost: validations.string,
    technical_supervisor_id: validations.string,
    state_examination_id: validations.string,
  })

  const resolver = useYupValidationResolver(validationSchema)

  const {
    handleSubmit,
    register,
    control,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      object_status_id: '',
      object_images: [],
    },
    resolver,
  })

  const [offset, setOffset] = useState(null)
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'blocks',
  })

  const createMutationProps = {
    onSuccess: () => {
      navigate('/inspectors')
      // queryClient.setQueryData('GET_OBJECT_ONE', res.data.data.id)
    },
  }

  // const state = queryClient.getQueryState('GET_OBJECT_ONE')
  const object = useObject({
    createMutationProps,
    difficultyCategoriesQueryProps: {
      enabled: true,
    },
    constructionTypesQueryProps: {
      enabled: true,
    },
    objectStatusQueryProps: {
      enabled: true,
    },
  })

  useEffect(() => {
    if (object.status?.data?.object_statuses) {
      setValue('object_status_id', object.status?.data?.object_statuses[0])
    }
  }, [object.status.data, setValue])

  const navigate = useNavigate()
  const { regions } = useRegion({ offset, regionProps: { enabled: !!offset } })

  const loadOptions = async (search, prevOptions, { page }) => {
    setOffset(page)
    const hasMore = regions.data.count > prevOptions.length + 10
    return {
      options: regions.data.regions.map((item) => ({
        label: item.ru_name,
        value: item.id,
      })),
      hasMore,
      additional: {
        page: page + 1,
      },
    }
  }

  const { districts } = useDistrict({
    regionId: watch('region_id')?.value,
  })

  const onSubmit = (data) => {
    object.createMutation.mutate({
      ...data,
      construction_type_id: data.construction_type_id.value,
      difficulty_category_id: data.difficulty_category_id.value,
      district_id: data.district_id.value,
      region_id: data.region_id.value,
      construction_cost: +data.construction_cost,
      object_status_id: data.object_status_id.id,
    })
  }

  return (
    <div className="h-screen">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Header
          title="Qo'shish"
          backLink={roleName === 'Registratura' ? '/' : '/inspectors'}
          rightElement={
            <div className="flex items-center gap-[12px]">
              <BtnOutlined
                leftIcon={<CancelIcon />}
                color="red"
                onClick={() => {
                  navigate('/inspectors')
                }}
              >
                Bekor qilish
              </BtnOutlined>
              <BtnFiled color="blue" leftIcon={<SaveIcon />} type="submit">
                Saqlash
              </BtnFiled>
            </div>
          }
        />
        <div className="sidebar-header-calc">
          <InspectorForm
            loadOptions={loadOptions}
            object={object}
            register={register}
            control={control}
            districts={districts}
            fields={fields}
            append={append}
            remove={remove}
            setValue={setValue}
            getValues={getValues}
            watch={watch}
            errors={errors}
          />
        </div>
      </form>
    </div>
  )
}
