import { useEffect, useMemo, useState } from 'react'
import { BtnFiled, Card, Select } from '../../components'
import CustomMuiDatePicker from '../../components/CustomMuiDatePicker'
import { format } from 'date-fns'
import { useField } from '../../services'
import StatusModal from '../../components/StatusModal'
import { useParams } from 'react-router-dom'
import ReactSelect from 'react-select'
import { v4 } from 'uuid'
import { OBJECT_ENTREPRENEUR, OBJECT_GOVERNMENT } from '../../settings/constants'
import { SimpleMuiTabs } from '../../components/SimpleTabs'
import { useForm } from 'react-hook-form'

export default function TaskIdChangeCard({
  taskId,
  register,
  errors,
  getValues,
  control,
  watch,
  deadline,
  objectData,
  setValue,
  reset,
  objectTypeStatus,
  setError,
}) {
  const [accessToEdit, setAccessToEdit] = useState(false)
  const [errorText, setErrorText] = useState('')
  const [disabled, setDisabled] = useState(true)
  const { id } = useParams()
  //Modal states
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [status, setStatus] = useState('')
  const [activeTab, setActiveTab] = useState(0)
  const [category, setCategory] = useState('')
  const [sector, setSector] = useState('')
  const [type, setType] = useState('b971a882-963d-4a28-a9cd-4b8daf4e792a')
  const [objectCategoriesList, setObjectCategoriesList] = useState([])

  const tabElements = [
    {
      key: 0,
      title: 'Davlat',
    },
    {
      key: 1,
      title: 'Tadbirkorlik',
    },
  ]

  const { updateMergedListMutation, getObjectCategoryList, getObjectSectorList } = useField({
    updateMergedListProps: {
      onSuccess: () => {
        objectData.refetch()
        setDisabled(true)
        setAccessToEdit(false)
        setValue('building_deadline', objectData?.data?.deadline)
      },
    },
    getObjectSectorListParams: {
      type,
    },
    getObjectCategoryListParams: {
      type,
      category: category || objectData?.data?.category?.id,
    },
    sectorProps: {
      enabled: true,
    },
    categoryProps: {
      enabled: true,
    },
  })
  function handleActionCreateMerge() {
    updateMergedListMutation.mutate({
      category_id: category || objectData?.data?.category?.id,
      sector_id: sector || objectData?.data?.sector?.id,
      deadline: watch('building_deadline')
        ? format(new Date(watch('building_deadline')), 'yyyy-MM-dd')
        : format(new Date(deadline), 'yyyy-MM-dd'),
      id,
      type,
    })
  }

  function handleClick() {
    if (!accessToEdit) {
      setDisabled(false)
      setAccessToEdit(true)
    } else {
      if (sector && sector !== objectData?.data?.sector?.id && !category) {
        setError('category_id', { message: 'Tanlanishi shart' })
      } else handleActionCreateMerge()
    }
  }

  const objectSector = useMemo(() => {
    return getObjectSectorList?.data?.datas ?? []
  }, [getObjectSectorList])

  useEffect(() => {
    if (activeTab === 1) {
      setType('41cade7c-c473-4922-8952-52787ba56a25')
    } else setType('b971a882-963d-4a28-a9cd-4b8daf4e792a')

    setCategory('')
    setSector('')
    setValue('category_id', '')
    setValue('sector_id', '')
  }, [activeTab])

  useEffect(() => {
    setTimeout(() => setValue('building_deadline', objectData?.data?.deadline))
  }, [objectData?.data?.deadline])

  useEffect(() => {
    if (objectTypeStatus === OBJECT_GOVERNMENT) {
      setActiveTab(0)
    } else if (objectTypeStatus === OBJECT_ENTREPRENEUR) {
      setActiveTab(1)
    }
  }, [objectTypeStatus])

  useEffect(() => {
    if (sector?.length > 0 || objectData?.data?.sector?.id) {
      setObjectCategoriesList(getObjectCategoryList?.data?.data?.datas)
    }
  }, [sector, getObjectCategoryList])

  const extra = (
    <BtnFiled disabled={false} onClick={() => handleClick()}>
      {accessToEdit ? 'Saqlash' : 'O`zgartirish'}
    </BtnFiled>
  )

  useEffect(() => {
    console.log(objectData?.data?.category)
    setTimeout(() => {
      setValue('category_id', {
        value: objectData?.data?.category?.id,
        label: objectData?.data?.category?.uz_name,
      })
      setValue('sector_id', { value: objectData?.data?.sector?.id, label: objectData?.data?.sector?.uz_name })
    })
  }, [objectData?.data?.category, objectData?.data?.sector])

  return (
    <Card title="Dastur va soha" rightElement={extra} className="mt-4">
      <SimpleMuiTabs
        getParamsFromLocation={false}
        activeTab={activeTab}
        elements={tabElements}
        setActiveTab={setActiveTab}
      />
      <span className="input-label mt-3">Dastur</span>
      <Select
        options={objectSector?.map((item) => ({ label: item.title, value: item?.id }))}
        errors={errors}
        control={control}
        name="sector_id"
        disabled={disabled}
        placeholder="Tanlang"
        customOnChange={(e) => {
          setSector(e?.value)
          setValue('category_id', '')
        }}
        required={true}
      />
      <span className="input-label mt-3">Soha</span>
      <Select
        options={objectCategoriesList?.map((item) => ({ label: item.title, value: item?.id }))}
        control={control}
        name="category_id"
        disabled={disabled}
        placeholder="Tanlang"
        customOnChange={(e) => setCategory(e?.value)}
        required={true}
        errors={errors}
      />
      <span className="input-label mt-3">Qurilish muddati</span>
      <CustomMuiDatePicker
        widthFull
        name="building_deadline"
        minDate={new Date(objectData?.data?.created_at)}
        control={control}
        disabled={disabled}
        errors={errors}
      />
      <p className="text-red-500 text-sm">{errorText}</p>
      <StatusModal isOpen={isOpen} status={status} handleClose={() => setIsOpen(false)} title={title} />
    </Card>
  )
}
