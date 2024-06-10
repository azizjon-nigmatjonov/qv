import { useFieldArray, useForm } from 'react-hook-form'
import DeleteIcon from '@mui/icons-material/Delete'
import AddCircleIcon from '@mui/icons-material/AddCircle'

import { Card } from '../Card'
import { Input } from '../Input'
import BtnDashed from '../Buttons/BtnDashed'

export default function ProductForm({ name, label2 = 'Miqdori', label3 = 'Narxi', title = 'Mahsulot nomi' }) {
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      productForm: [
        {
          productName: '',
          productInfoAmount: '',
          productInfoPrice: '',
        },
      ],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'productForm',
  })

  const handleAppend = () =>
    append({
      productName: '',
      productInfoAmount: '',
      productInfoPrice: '',
    })

  const handleRemove = (index) => remove(index)

  const onSubmit = (data) => console.log(data)

  return (
    <Card title={title}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        {fields?.map((field, index) => (
          <div className="flex gap-x-3 mb-4" key={field.id}>
            <div className="grow">
              <span className="input-label">Mahsulot nomi</span>
              <Input defaultValue={name} register={register} name={`productForm.${index}.productName`} widthFull />
            </div>
            <div>
              <span className="input-label">{label2}</span>
              <Input
                defaultValue={name}
                widthFull
                register={register}
                name={`productForm.${index}.productInfoAmount`}
              />
            </div>
            <div>
              <span className="input-label">{label3}</span>
              <Input defaultValue={name} widthFull register={register} name={`productForm.${index}.productInfoPrice`} />
            </div>
            <div className="self-end">
              <div
                onClick={() => handleRemove(index)}
                className="border rounded flex items-center justify-center cursor-pointer"
                style={{ width: '40px', height: '40px', color: 'red' }}
              >
                <DeleteIcon />
              </div>
            </div>
          </div>
        ))}
        <div className="self-end rounded-md">
          <BtnDashed type="submit" onClick={handleAppend} leftIcon={<AddCircleIcon fontSize="small" />}>
            Qo`shish
          </BtnDashed>
        </div>
      </form>
    </Card>
  )
}
