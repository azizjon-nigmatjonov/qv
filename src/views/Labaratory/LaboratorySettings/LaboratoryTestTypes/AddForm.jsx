import { useNavigate, useParams } from 'react-router-dom'
import { Delete, Save } from '@mui/icons-material'
import { BtnFiled, BtnOutlined, Header } from '../../../../components'
import { TestTypeForm } from '../../../../forms/Laboratory/TestTypeForm'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import StatusModal from '../../../../components/StatusModal'
import { useTestTypes, useMeasurements } from '../../../../services/labaratory'
import { useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'

export default function LaboratoryTestTypeAdd() {
  const { regionId } = useSelector((state) => state.auth)

  const navigate = useNavigate()
  const { id } = useParams()
  const { control, register, handleSubmit, reset } = useForm()
  //cancelModalStates
  const [open, setOpen] = useState(false)

  const { postTestTypeMutation, putTestTypeMutation, deleteTestTypeMutation, getTestTypeByIdQuery } = useTestTypes({
    postTestTypeMutationProps: {
      onSuccess: () => navigate(-1),
    },
    putTestTypeMutationProps: {
      enabled: !!id,
      onSuccess: () => navigate(-1),
    },
    deleteTestTypeProps: {
      enabled: !!id,
      onSuccess: () => navigate(-1),
    },
    id,
  })

  function handleClickDelete() {
    setOpen(true)
  }

  function handleDelete() {
    deleteTestTypeMutation.mutate({
      id,
    })
  }
  console.log(getTestTypeByIdQuery)
  useEffect(() => {
    if (id) {
      reset({
        test_type: getTestTypeByIdQuery.data?.name || '',
        name: getTestTypeByIdQuery.data?.document || '',
        price: getTestTypeByIdQuery.data?.price || '',
        transport_price: getTestTypeByIdQuery.data?.price_without_transport_cost || '',
        unit: [
          { value: getTestTypeByIdQuery.data?.measurement_id, label: getTestTypeByIdQuery.data?.measurement_name },
        ],
      })
    }
  }, [getTestTypeByIdQuery.data])

  function onSubmit(data) {
    if (
      data.name?.trim() &&
      data.unit.value?.trim() &&
      data.test_type?.trim() &&
      data.price?.trim() &&
      data.transport_price?.trim()
    ) {
      if (id) {
        putTestTypeMutation.mutate({
          created_at: new Date(),
          document: data.name,
          id,
          measurement_id: data.unit.value,
          name: data.test_type,
          price: +data.price,
          price_without_transport_cost: +data.transport_price,
          region_id: regionId,
        })
      } else {
        postTestTypeMutation.mutate({
          document: data.name,
          measurement_id: data.unit.value,
          name: data.test_type,
          price: +data.price,
          price_without_transport_cost: +data.transport_price,
          region_id: regionId,
        })
      }
    } else {
      toast.error("Ma'lumotlar to'liq emas!")
    }
  }

  const { getMeasurementsQuery } = useMeasurements({
    getMeasurementsParams: {},
  })

  return (
    <div className="h-screen">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Header
          title={`${id ? 'Tahrirlash' : 'Yangi'} laboratoriya test turi`}
          backLink={-1}
          rightElement={
            <div className="flex gap-3">
              {id && (
                <BtnOutlined
                  color="red"
                  type="button"
                  className="outline-none focus:outline-none"
                  onClick={handleClickDelete}
                  leftIcon={<Delete fontSize="small" />}
                >
                  O'chirish
                </BtnOutlined>
              )}
              <BtnFiled leftIcon={<Save fontSize="small" />} type="submit">
                Saqlash
              </BtnFiled>
            </div>
          }
        />
        <div className="sidebar-header-calc">
          <TestTypeForm
            unitOptions={getMeasurementsQuery.data?.data?.measurements}
            title="Umumiy ma`lumot"
            register={register}
            control={control}
            label1="Mahsulot nomi"
            label2="O`lchov birligi"
            secondFieldType="text"
            placeholder={getTestTypeByIdQuery.data?.measurement_name}
          />
        </div>
      </form>
      <StatusModal
        isOpen={open}
        cancelable
        handleClose={() => {
          setOpen(false)
        }}
        handleClickOk={handleDelete}
        status="warning"
        title="Sinov turini o’chirishni tasdiqlaysizmi?"
      />
    </div>
  )
}
