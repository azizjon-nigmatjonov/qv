import { useEffect, useState } from 'react'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { SaveIcon } from '../../assets/icons'
import { BtnFiled, Header, Tabs } from '../../components'
import CheckUserPassport from '../../components/CheckUserPassport/CheckUserPassport'
import { InspectorForm } from '../../forms'
import { useDistrict, useObject, useRegion } from '../../services'
import {
  BOSH_TEXNIK_NAZORATCHI_ROLE_ID,
  BUHGALTERIYA_BOSH_ROLE_ID,
  BUHGALTERIYA_YETAKCHI_ROLE_ID,
  ICHKI_NAZORATCHI_ROLE_ID,
  LOYIHACHI_MUALLIF_ROLE_ID,
  LOYIHACHI_ROLE_ID,
  OBJECT_STATUS_FROZEN,
  OBJECT_STATUS_ID_IN_PROGRESS,
  OBJECT_STATUS_ID_SUBMITTED,
  OBJECT_STATUS_NEW,
  TEXNIK_NAZORATCHI_ROLE_ID,
} from '../../settings/constants'
import { permissions } from '../../settings/permissions'
import priceFormatter from '../../utils/priceFormatter'

export function InspectorEdit() {
  const { id, userId: userIdFromParams } = useParams()
  const { roleId, userId, isRepublic } = useSelector((state) => state.auth)

  const { pathname } = useLocation()
  const isBuhgalteriya = roleId === BUHGALTERIYA_BOSH_ROLE_ID || roleId === BUHGALTERIYA_YETAKCHI_ROLE_ID
  const { t } = useTranslation('common')

  const updateMutationProps = {
    onSuccess: () => {
      navigate('/inspectors')
    },
  }

  const object = useObject({
    inspectorStatsProps: {
      enabled: false,
    },
    role_id: roleId,
    user_id: userIdFromParams,
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

  // const isWorkers = [
  //   BOSH_TEXNIK_NAZORATCHI_ROLE_ID,
  //   TEXNIK_NAZORATCHI_ROLE_ID,
  //   LOYIHACHI_ROLE_ID,
  //   LOYIHACHI_MUALLIF_ROLE_ID,
  //   ICHKI_NAZORATCHI_ROLE_ID,
  // ].some((item) => item === roleId)

  const tabLinks = isBuhgalteriya
    ? [
        {
          key: 'all_info',
          title: t('overall.infos'),
          path: '',
        },
        {
          key: 'payment',
          title: t('payments'),
          path: 'payment',
        },
      ]
    : [
        {
          key: "Asosiy ma'lumotlar",
          title: "Asosiy ma'lumotlar",
          path: '',
        },
        {
          key: 'Hujjatlar',
          title: 'Hujjatlar',
          path: 'documents',
        },
        {
          key: 'monitoring',
          title: 'Monitoring',
          path: 'monitoring',
        },
        {
          key: 'instructions',
          title: "Yozma ko'rsatmalar",
          path: 'instructions',
        },
        {
          key: 'journal',
          title: 'Ijro hujjatlari',
          path: 'journal',
        },
        {
          key: 'photo-reports',
          title: 'Foto hisobot',
          path: `photo-reports`,
        },
        {
          key: 'payment',
          title: t('payments'),
          path: 'payment',
        },
        {
          key: 'calendar',
          title: 'Nazorat kalendari',
          path: `calendar/${object.object.data?.task_id}`,
        },
      ]

  const [offset, setOffset] = useState(null)
  const [location, setLocation] = useState([])

  const [isOpen, setIsOpen] = useState(false)

  const methods = useForm({
    defaultValues: {
      object_status_id: '',
      object_images: [],
    },
  })

  const {
    handleSubmit,
    register,
    control,
    setValue,
    getValues,
    watch,
    reset,
    setError,
    formState: { errors },
  } = methods
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'blocks',
  })

  useEffect(() => {
    if (object.status?.data?.object_statuses) {
      setValue('object_status_id', object.status?.data?.object_statuses[0])
    }
  }, [object.status.data, setValue])

  useEffect(() => {
    if (object.object.data) {
      const objectData = object.object.data
      setLocation([+objectData?.lat, +objectData?.long])
      console.log(objectData.date_protocol)

      let data = {}
      const fielArrays = [
        'name',
        'blocks',
        'construction_cost',
        'construction_type',
        'name',
        'address',
        'object_images',
        'cadastral_number',
      ]

      fielArrays.forEach((item) => {
        data[item] = item === 'construction_cost' ? priceFormatter(objectData['construction_cost']) : objectData[item]
      })

      reset({
        ...data,
        ...objectData,
        region_id: {
          label: objectData.region.ru_name,
          value: objectData.region.id,
        },
        district_id: {
          label: objectData.district.ru_name,
          value: objectData.district.id,
        },
        difficulty_category_id: {
          label: objectData.difficulty_category,
          value: objectData.difficulty_category_id,
        },
        construction_type_id: {
          label: objectData.construction_type,
          value: objectData.construction_type_id,
        },
        object_status_id: {
          id: objectData.object_status_id,
          status: objectData.object_status,
        },
        object_type: objectData.object_type?.type,
        name_expertise: objectData.name_expertise,
        state_examination_id: objectData.state_examination?.name,
        technical_supervisor_id: objectData.technical_supervisor?.name,
        category: objectData.category?.uz_name,
        sector: objectData.sector?.uz_name,
        object_fund_source: objectData?.object_fund_source?.source,
      })
    }
  }, [object.object.data, reset])
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

  const onSubmit = (data) =>
    object.updateMutation.mutate({
      status_id: data.object_status_id.id,
      comment: '',
      object_id: id,
      user_id: userId,
    })

  const getObjectStatus = (statusId) => {
    if (statusId === OBJECT_STATUS_FROZEN) return OBJECT_STATUS_ID_IN_PROGRESS
    else if (statusId === OBJECT_STATUS_ID_IN_PROGRESS) return OBJECT_STATUS_FROZEN
    else if (statusId === OBJECT_STATUS_NEW) return OBJECT_STATUS_FROZEN
    else return ''
  }

  const onSubmitObjStatusComment = (description, file) => {
    console.log(description, file)
    object?.updateMutation.mutate({
      comment: description,
      object_id: id,
      status_id: getObjectStatus(object.object.data?.object_status_id),
      user_id: userId,
      file: file?.join(),
    })
  }
  const handleClose = () => setIsOpen(false)

  const isObjectSubmitted = object.object.data?.object_status_id === OBJECT_STATUS_ID_SUBMITTED

  return (
    <div className="h-screen">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Header
            title={object.object.data?.task_id}
            backLink={-1}
            centerElement={tabLinks.length > 0 && <Tabs elements={tabLinks} />}
            rightElement={
              permissions[roleId]?.includes('OBJECTS/EDIT_BTN') && (
                <BtnFiled disabled={isObjectSubmitted} color="blue" leftIcon={<SaveIcon />} type="submit">
                  Saqlash
                </BtnFiled>
              )
            }
          />
          <div className="sidebar-header-calc">
            <InspectorForm
              isObjectSubmitted={isObjectSubmitted}
              onSubmitObjStatusComment={onSubmitObjStatusComment}
              isEditting={!pathname.includes('/add')}
              loadOptions={loadOptions}
              object={object}
              register={register}
              errors={errors}
              control={control}
              location={location}
              setLocation={setLocation}
              districts={districts}
              fields={fields}
              append={append}
              remove={remove}
              setValue={setValue}
              setError={setError}
              getValues={getValues}
              watch={watch}
              users={object?.object.data?.users}
              reset={reset}
              setIsOpen={setIsOpen}
              objectStatusId={object.object.data?.object_type?.id}
              data={object.object.data}
              objectRefetch={object.object.refetch}
              objectTypeStatus={object.object.data?.object_fund_source?.id}
            />
          </div>
        </form>
      </FormProvider>
      <CheckUserPassport isOpen={isOpen} handleClose={handleClose} id={id} />
    </div>
  )
}
