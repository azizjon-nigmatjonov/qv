import { useSearchParams } from 'react-router-dom'
import { Card, Input, Select, Tag, Textarea } from '../../../components'
import { useMemo } from 'react'

export const AnalystInfoForm = ({
  register,
  control,
  errors,
  regionFields,
  totalObjectsInRegions,
  typeOptions,
  objectSectorList,
  objectCategoriesList,
  setValue,
}) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const searchParamsMemo = useMemo(() => Object.fromEntries([...searchParams]), [searchParams])
  return (
    <div className="flex gap-4">
      <Card title="Umumiy ma`lumot" className="w-full h-fit">
        <div className="mb-4">
          <span className="input-label">Forma raqami</span>
          <Input register={register} name="form_number" addonBefore="F-" widthFull placeholder="Kiriting" required />
          {errors?.form_number && <p className="text-red-600 text-[12px]">{errors.form_number.message}</p>}
        </div>
        <div className="mb-4">
          <span className="input-label">Obyekt turi</span>
          <Select
            control={control}
            name="type"
            widthFull
            options={typeOptions}
            customOnChange={(e) => {
              setSearchParams({ type: e.value })
            }}
          />
        </div>
        <div className="mb-4">
          <span className="input-label">Soha</span>
          <Select
            control={control}
            name="category"
            widthFull
            placeholder="Tanlang"
            required
            options={objectCategoriesList}
            customOnChange={() => {
              setValue('sector', null)
            }}
          />
          {errors?.comments && <p className="text-red-600 text-[12px]">{errors.comments.message}</p>}
        </div>
        <div className="mb-4">
          <span className="input-label">Dastur dasturi</span>
          <Select
            isMulti
            control={control}
            name="sector"
            widthFull
            placeholder="Tanlang"
            required
            options={objectSectorList}
          />
          {errors?.comments && <p className="text-red-600 text-[12px]">{errors.comments.message}</p>}
        </div>
        <div className="mb-4">
          <span className="input-label">Dasturga kiritilgan obyektlar soni</span>
          <Input register={register} name="planned_objects" widthFull placeholder="Kiriting" required />
          {errors?.objects && <p className="text-red-600 text-[12px]">{errors.objects.message}</p>}
        </div>
      </Card>
      <Card
        title="Viloyatlar bo’yicha dasturga kiritilga obyektlar soni"
        rightElement={<Tag color="blue" value={totalObjectsInRegions || 0} />}
        className="w-full"
      >
        {regionFields.map((field, index) => (
          <div className="mb-4" key={field.id}>
            <span className="input-label">{field.uz_name}</span>
            <Input
              register={register}
              name={`regions[${index}].planned_objects`}
              widthFull
              placeholder="Kiriting"
              required
            />
            {errors?.form_number && <p className="text-red-600 text-[12px]">{errors.form_number.message}</p>}
          </div>
        ))}
      </Card>
    </div>
  )
}
