import { useLocation, useParams } from 'react-router-dom'
import { BasicTable, BtnOutlined, Card, FileUpload, Input, Select } from '../../../components'
import DescriptionIcon from '@mui/icons-material/Description'
import downloadItForMe from '../../../utils/downloadItForMe'
import { CustomDatePicker } from '../../../components/CustomDatePicker'
import CustomMuiDatePicker from '../../../components/CustomMuiDatePicker'
import { AddColumnIcon } from '../../../assets/icons/icons'

export function DocumentActSamplingForm({
  register,
  setValue,
  control,
  document,
  disabled = true,
  headData,
  fields,
  append,
  remove,
  testTypeOptions,
}) {

  return (
    <div className="grid grid-cols-12 gap-4">
      <Card title="Umumiy ma’lumotlar" className="col-span-6">
        <div className="grid grid-cols-12 items-center">
          <span className="input-label col-span-12">Viloyat</span>
          <div className="col-span-12 mb-4">
            <Input widthFull name="region_name" register={register} disabled={disabled} />
          </div>
          <span className="input-label col-span-12">Sinov Laboratoriyasi mutaxassisi</span>
          <div className="col-span-12 mb-4">
            <Input widthFull name="lab_assistant" register={register} disabled={disabled} />
          </div>
          <span className="input-label col-span-12">To’ldirilayotgan sana</span>
          <div className="col-span-12 mb-4">
            <CustomMuiDatePicker control={control} name="created_date" disabled={disabled} />
          </div>
          <span className="input-label col-span-12">Sinov turi</span>
          <div className="col-span-12 mb-4">
            <Select control={control} options={testTypeOptions} name="test" register={register} />
          </div>
        </div>
      </Card>
      <Card title="Obyektga mas’ul shaxs" className="col-span-6 h-fit">
        <div className="grid grid-cols-12 items-center">
          <span className="input-label col-span-12">F.I.O</span>
          <div className="col-span-12 mb-4">
            <Input
              widthFull
              name="person_fio"
              placeholder="Mas’ul shaxs FIOsi"
              register={register}
            />
          </div>
          <span className="input-label col-span-12">Lavozimi</span>
          <div className="col-span-12 mb-4">
            <Input
              widthFull
              name="person_role"
              placeholder="Mas’ul shaxs lavozimi"
              register={register}
            />
          </div>
        </div>
      </Card>
      <Card title="Jadvalni shakllantirish" className="col-span-12">
        <BasicTable headColumns={headData} bodyColumns={fields} colTextCenter noPadding />
        <div className="flex justify-end gap-4 mt-4">
          <BtnOutlined onClick={() => append({})} leftIcon={<AddColumnIcon />} className="text-primary">
            Qo’shish
          </BtnOutlined>
        </div>
      </Card>
    </div>
  )
}
