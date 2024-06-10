import { useLocation, useParams } from 'react-router-dom'
import DescriptionIcon from '@mui/icons-material/Description'
import { Card, FileUpload, Input, Select } from '../../components'
import downloadItForMe from '../../utils/downloadItForMe'

export function TestTypeForm({
  register,
  control,
  setValue,
  document,
  disabled = false,
  title = 'Hujjat',
  label1 = 'Summa',
  label2 = 'Sana',
  secondFieldType = 'date',
  unitOptions,
  placeholder = '',
}) {
  return (
    <div className="w-[50%]">
      <Card title={title}>
        <div className="gap-4">
          <span className="input-label col-span-4">Sinov turi</span>
          <div className="col-span-8">
            <Input widthFull name="test_type" register={register} disabled={disabled} />
          </div>
          <span className="input-label mt-4">Normativ-huquqiy hujjat nomi</span>
          <div className="col-span-8">
            <Input widthFull name="name" register={register} disabled={disabled} />
          </div>
          <span className="input-label mt-4">O`lchov birligi</span>
          <div className="col-span-8">
            <Select
              options={unitOptions?.map((item) => ({ value: item?.id, label: item?.name }))}
              control={control}
              name="unit"
              disabled={disabled}
              defaultValue="kg"
              placeholder={placeholder}
            />
          </div>

          <span className="input-label mt-4">Narxi</span>
          <div className="col-span-8">
            <Input widthFull name="price" register={register} disabled={disabled} />
          </div>
          <span className="input-label mt-4">Transport harajatlarisiz narx</span>
          <div className="col-span-8">
            <Input widthFull name="transport_price" register={register} disabled={disabled} />
          </div>
        </div>
      </Card>
    </div>
  )
}
