import { useNavigate, useParams } from 'react-router-dom'
import { Delete, Save } from '@mui/icons-material'
import { BtnFiled, BtnOutlined, Header } from '../../../../components'
import { TestTypeForm } from '../../../../forms/Laboratory/TestTypeForm'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import StatusModal from '../../../../components/StatusModal'
import { MesurementUnitForm } from '../../../../forms/Laboratory/MesurementUnitForm'
import { useMeasurements } from '../../../../services/labaratory'

export default function MesurementUnitsAdd() {
  const navigate = useNavigate()
  const { id } = useParams()
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
  })
  //cancelModalStates
  const [open, setOpen] = useState(false)

  const { postMeasurementMutation, getMeasurementsByIdQuery, deleteMeasurement, putMeasurementMutation } =
    useMeasurements({
      id,
      postMeasurementMutationProps: {
        onSuccess: () => navigate(-1),
      },
      deleteMeasurementByIdProps: {
        enabled: !!id,
        onSuccess: () => navigate(-1),
      },
      putMeasurementProps: {
        enabled: !!id,
        onSuccess: () => navigate(-1),
      },
    })

  function handleClickDelete() {
    setOpen(true)
  }
  function handleDelete() {
    deleteMeasurement.mutate({ id })
  }
  function onSubmit(data) {
    if (data.mesurement_unit.trim()) {
      if (id) {
        putMeasurementMutation.mutate({
          name: data.mesurement_unit,
          id,
        })
      } else if (data.mesurement_unit.trim()) {
        postMeasurementMutation.mutate({
          name: data.mesurement_unit,
        })
      }
    } else {
    }
  }

  useEffect(() => {
    if (id) {
      reset({
        mesurement_unit: getMeasurementsByIdQuery.data?.data?.name || '',
      })
    }
  }, [getMeasurementsByIdQuery.data?.data])
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
          <MesurementUnitForm
            title="Umumiy ma`lumot"
            register={register}
            control={control}
            label1="Mahsulot nomi"
            label2="O`lchov birligi"
            secondFieldType="text"
            errors={errors}
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
        title="O`lchov birligini o’chirishni tasdiqlaysizmi ?"
      />
    </div>
  )
}
