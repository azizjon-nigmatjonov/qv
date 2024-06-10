import { useEffect, useState } from 'react'
import { BtnFiled, Card, Input } from '../../components'
import { useFormContext } from 'react-hook-form'
import CustomMuiDatePicker from '../../components/CustomMuiDatePicker'
import dateFormatter from '../../utils/dateFormatter'
import { format } from 'date-fns'
import { useDocument, useObject } from '../../services'
import StatusModal from '../../components/StatusModal'
import { useParams } from 'react-router-dom'
import { FileView } from '../../components/FileView/FileView'

export default function OrganizationSummaryForm({ register, control, errors, watch, getValues, isBuilding, data }) {
  const [accessToEdit, setAccessToEdit] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [nameExpertise, setNameExpertise] = useState()
  const [numberProtocol, setNumberProtocol] = useState()
  const [dateProtocol, setDateProtocol] = useState()
  const [positiveOpinionNumber, setPositiveOpinionNumber] = useState()
  const [positiveOpinionDate, setPositiveOpinionDate] = useState()
  const { id } = useParams()
  //Modal states
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [status, setStatus] = useState('')
  const { updateOrganizationSummaryMutation } = useObject({
    updateOrganizationSummaryMutationProps: {
      enabled: accessToEdit,
      onSuccess: (res) => {
        setAccessToEdit(false)
        setDisabled(true)
        setIsOpen(true)
        setTitle('Muvaffaqqiyatli o`zgartirildi')
        setStatus('success')
      },
      onError: (res) => {
        setIsOpen(true)
        setTitle(`Xatolik: ${res?.data?.message}`)
        setStatus('error')
      },
    },
  })

  function handleClick() {
    if (!accessToEdit) {
      setDisabled(false)
      setAccessToEdit(true)
    } else {
      updateOrganizationSummaryMutation.mutate({
        name_expertise: nameExpertise,
        number_protocol: numberProtocol,
        object_id: id,
        date_protocol: dateProtocol
          ? typeof dateProtocol === 'object'
            ? format(dateProtocol, 'yyyy-MM-dd')
            : dateProtocol
          : '',
        positive_opinion_number: positiveOpinionNumber,
        positive_opinion_date:
          typeof positiveOpinionDate === 'object' ? format(positiveOpinionDate, 'yyyy-MM-dd') : positiveOpinionDate,
      })
    }
  }
  useEffect(() => {
    setNameExpertise(getValues('name_expertise'))
    setNumberProtocol(getValues('number_protocol'))
    setDateProtocol(getValues('date_protocol'))
    setPositiveOpinionNumber(getValues('positive_opinion_number'))
    setPositiveOpinionDate(getValues('positive_opinion_date'))
  }, [accessToEdit, getValues])
  return (
    <Card
      title="Tashkilotlarning xulosasi"
      rightElement={<BtnFiled onClick={() => handleClick()}>{accessToEdit ? 'Saqlash' : 'O`zgartirish'}</BtnFiled>}
      className="mt-4"
    >
      <span className="input-label col-span-4">Arxitektura-shaharsozlik kengashi bayonnomasining raqami</span>
      <div className="col-span-8">
        <Input
          widthFull
          name="number_protocol"
          register={register}
          disabled={disabled}
          errors={errors}
          onChange={(e) => {
            if (accessToEdit) {
              setNumberProtocol(e.target.value)
            }
          }}
        />
      </div>
      <span className="input-label col-span-4 mt-4">Arxitektura-shaharsozlik kengashi bayonnomasining sanasi</span>
      <div className="col-span-8">
        <CustomMuiDatePicker
          widthFull
          name="date_protocol"
          control={control}
          disabled={disabled}
          errors={errors}
          customOnChange={(e) => {
            setDateProtocol(e)
          }}
        />
      </div>
      <span className="input-label col-span-4 mt-4">Davlat ekspertizasi organi</span>
      <div className="col-span-8">
        <Input
          widthFull
          name="name_expertise"
          register={register}
          disabled={disabled}
          errors={errors}
          onChange={(e) => {
            if (accessToEdit) {
              setNameExpertise(e.target.value)
            }
          }}
        />
      </div>
      <span className="input-label col-span-4 mt-4">Davlat ekspertiza organining ijobiy xulosasining raqami</span>
      <div className="col-span-8">
        <Input
          widthFull
          name="positive_opinion_number"
          register={register}
          disabled={disabled}
          errors={errors}
          onChange={(e) => {
            if (accessToEdit) {
              setPositiveOpinionNumber(e.target.value)
            }
          }}
        />
      </div>
      <span className="input-label col-span-4 mt-4">Davlat ekspertiza organining ijobiy xulosasining sanasi</span>
      <div className="col-span-8">
        <CustomMuiDatePicker
          widthFull
          name="positive_opinion_date"
          control={control}
          disabled={disabled}
          errors={errors}
          customOnChange={(e) => {
            setPositiveOpinionDate(e)
          }}
        />
      </div>
      <span className="input-label col-span-4 mt-4">Davlat ekspertiza organining hujjati</span>
      <div className="col-span-8">
        <FileView
          fileName={`pdf?id=${getValues('positive_opinion_number')?.includes('№') ? getValues('positive_opinion_number')?.split('№ ')[1] : getValues('positive_opinion_number')}`}
          ownLink="https://ekspertiza.mc.uz/ru/objects/"
        />
      </div>
      <StatusModal isOpen={isOpen} status={status} handleClose={() => setIsOpen(false)} title={title} />
    </Card>
  )
}
