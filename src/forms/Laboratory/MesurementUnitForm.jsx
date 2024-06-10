import { useLocation, useParams } from 'react-router-dom'
import DescriptionIcon from '@mui/icons-material/Description'
import { Card, FileUpload, Input, Select } from '../../components'
import downloadItForMe from '../../utils/downloadItForMe'

export function MesurementUnitForm({
  register,
  control,
  setValue,
  document,
  disabled = false,
  title = 'Hujjat',
  label1 = 'Summa',
  label2 = 'Sana',
  secondFieldType = 'date',
  errors = {},
}) {
  const unitOptions = [
    { value: 'kg', label: 'kg' },
    { value: 'litr', label: 'litr' },
    { value: 'metr', label: 'metr' },
    { value: 'metr kvadrat', label: 'metr kvadrat' },
    { value: 'metr kub', label: 'metr kub' },
  ]
  return (
    <div className="w-[50%]">
      <Card title={title}>
        <div className="gap-4">
          <span className="input-label col-span-4">O’lchov birliklari nomi</span>
          <div className="col-span-8">
            <Input
              widthFull
              name="mesurement_unit"
              errors={errors}
              register={register}
              required={true}
              disabled={disabled}
              message="To'ldirilishi shart"
            />
          </div>
        </div>
      </Card>
    </div>
  )
}
