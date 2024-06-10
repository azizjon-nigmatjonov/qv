import { useState } from 'react'
import { useSelector } from 'react-redux'
import { InspectorForm } from '../../../forms'
import { useFieldArray, useForm } from 'react-hook-form'
import { useObject, useRegion, useDistrict } from '../../../services'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { OBJECT_STATUS_ID_SUBMITTED } from '../../../settings/constants'
import { Header, Tabs } from '../../../components'

function LabaratoryObjectsEdit() {
  const { roleId, userId } = useSelector((state) => state.auth)
  const { id } = useParams()
  const { pathname } = useLocation()
  const [offset, setOffset] = useState(null)
  const [location, setLocation] = useState([])

  const navigate = useNavigate()

  const tabLinks = [
    {
      key: 'Umumiy ma`lumot',
      title: 'Umumiy ma`lumot',
      path: '',
    },
    {
      key: 'To`lov',
      title: 'To`lov',
      path: 'payment',
    },
  ]

  const { handleSubmit, register, control, setValue, getValues, watch, reset } = useForm({
    defaultValues: {
      object_status_id: '',
      object_images: [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'blocks',
  })

  const updateMutationProps = {
    onSuccess: () => {
      navigate('/inspectors')
    },
  }

  const { districts } = useDistrict({
    regionId: watch('region_id')?.value,
  })

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
  const object = useObject({
    inspectorStatsProps: {
      enabled: false,
    },
    role_id: roleId,
    updateMutationProps,
    difficultyCategoriesQueryProps: {
      enabled: true,
    },
    constructionTypesQueryProps: {
      enabled: true,
    },
    objectStatusQueryProps: {
      enabled: true,
    },
    id,
  })

  const isObjectSubmitted = object.object.data?.object_status_id === OBJECT_STATUS_ID_SUBMITTED

  return (
    <>
      <div className="h-screen">
        <Header title={''} backLink={-1} centerElement={<Tabs elements={tabLinks} />} />

        <div className="sidebar-header-calc">
          <InspectorForm
            isObjectSubmitted={isObjectSubmitted}
            isEditting={!pathname.includes('/add')}
            loadOptions={loadOptions}
            object={object}
            register={register}
            control={control}
            location={location}
            setLocation={setLocation}
            districts={districts}
            fields={fields}
            append={append}
            remove={remove}
            setValue={setValue}
            getValues={getValues}
            watch={watch}
            users={object?.object.data?.users}
            disabled
          />
        </div>
      </div>
    </>
  )
}

export default LabaratoryObjectsEdit
