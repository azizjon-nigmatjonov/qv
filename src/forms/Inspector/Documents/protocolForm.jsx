import { useLocation, useParams } from 'react-router-dom'
import { BasicLayout, BasicTable, BtnOutlined, Card, FileUpload, Input, Select, Textarea } from '../../../components'
import DescriptionIcon from '@mui/icons-material/Description'
import downloadItForMe from '../../../utils/downloadItForMe'
import CustomMuiDatePicker from '../../../components/CustomMuiDatePicker'
import { useTranslation } from 'react-i18next'
import { AddColumnIcon } from '../../../assets/icons/icons'

export function DocumentProtocolForm({
  register,
  control,
  setValue,
  protocolTestHeadColumns,
  protocolTestFields,
  protocolTestAppend,
  protocolResultHeadColumns,
  protocolResultFields,
  protocolResultAppend,
  testTypeOptions,
  actsForProtocolOptions,
  document,
  disabled = false,
}) {
  const { pathname } = useLocation()
  const { t } = useTranslation('common')
  return (
    <div className="grid grid-cols-12 gap-4">
      <Card title={t('overall.infos')} className="col-span-12">
        <div className="grid grid-cols-12 w-full gap-4">
          <div className="grid grid-cols-12 col-span-6">
            <span className="input-label col-span-12">To’ldirilayotgan sana</span>
            <div className="col-span-12 mb-4">
              <CustomMuiDatePicker
                disabled={disabled}
                name="created_date"
                control={control}
                defaultValue={document?.date}
                register={register}
              />
            </div>
            <span className="input-label col-span-12">Viloyat sinov labaratoriyasi boshlig’i</span>
            <div className="col-span-12 mb-4">
              <Input widthFull name="lab_assistant" register={register} disabled={disabled} />
            </div>
            <span className="input-label col-span-12">Sinov Laboratoriyasi nomi</span>
            <div className="col-span-12 mb-4">
              <Textarea widthFull register={register} name="lab_name" disabled={disabled} />
            </div>
            <span className="input-label col-span-12">Akkreditatsiya sertifikati</span>
            <div className="col-span-12 mb-4 grid grid-cols-12 gap-4">
              <div className="col-span-6">
                <Input placeholder="Raqami" widthFull name="certificate_num" register={register} />
              </div>
              <div className="col-span-6">
                <CustomMuiDatePicker control={control} widthFull name="certificate_date" register={register} />
              </div>
            </div>
            <span className="input-label col-span-12">Buyurtmachi tashkilot</span>
            <div className="col-span-12 mb-4">
              <Input widthFull name="order_company" register={register} />
            </div>
            <span className="input-label col-span-12">Ishlab chiqaruvchi (Iste'mol qiluvchi) nomi</span>
            <div className="col-span-12 mb-4">
              <Input widthFull name="producer_name" register={register} />
            </div>
            <span className="input-label col-span-12">
              Sinov obyektini belgilash va markalash ma'lumotlari (o'lchov)
            </span>
            <div className="col-span-12 mb-4">
              <Input widthFull name="mark_info" register={register} />
            </div>
          </div>
          <div className="grid grid-cols-12 col-span-6 h-fit">
            <span className="input-label col-span-12">Tanlash dalolatnomasi</span>
            <div className="col-span-12 mb-4">
              <Select options={actsForProtocolOptions} control={control} name="act" register={register} />
            </div>
            <span className="input-label col-span-12">Sinov turi</span>
            <div className="col-span-12 mb-4">
              <Select options={testTypeOptions} control={control} name="test_type" register={register} />
            </div>
            <span className="input-label col-span-12">
              Sinov obyektlari uchun Normativ-Huquqiy hujjat (o'lchovlari)
            </span>
            <div className="col-span-12 mb-4">
              <Input widthFull name="test_docs" register={register} disabled={disabled} />
            </div>
            <span className="input-label col-span-12">Sinov usullari uchun Normativ-Huquqiy hujjat (o'lchovlari)</span>
            <div className="col-span-12 mb-4">
              <Input widthFull register={register} name="test_method" disabled={disabled} />
            </div>
            <span className="input-label col-span-12">Sinov shartlari (o'lchovlari)</span>
            <div className="col-span-12 mb-4">
              <Input register={register} name="test_condition" widthFull />
            </div>
            <span className="input-label col-span-12">
              Yordamchi (sub) pudratchi tomonidan o'tkaziladigan sinovlar (o'lchovlar)
            </span>
            <div className="col-span-12 mb-4">
              <Input register={register} name="contractor_test" widthFull />
            </div>
          </div>
        </div>
      </Card>
      <Card title="Ishlatilgan sinov uskunalari va o'lchash asboblari" className="col-span-12 h-fit">
        <BasicTable headColumns={protocolTestHeadColumns} bodyColumns={protocolTestFields} colTextCenter noPadding />
        <div className="flex justify-end gap-4 mt-4">
          <BtnOutlined onClick={() => protocolTestAppend({})} leftIcon={<AddColumnIcon />} className="text-primary">
            Qo’shish
          </BtnOutlined>
        </div>
      </Card>
      <Card title="Sinov hisobotining natijalari raqami (o'lchovlar)" className="col-span-12">
        <BasicTable
          headColumns={protocolResultHeadColumns}
          bodyColumns={protocolResultFields}
          colTextCenter
          noPadding
        />
        <div className="flex justify-between items-center gap-4 mt-4">
          <div className="flex items-center gap-4 w-fit">
            <span style={{ whiteSpace: 'nowrap' }} className="font-bold w-auto">
              Sinov sanasi
            </span>
            <CustomMuiDatePicker control={control} name="test_date" register={register} />
          </div>
          <BtnOutlined onClick={() => protocolResultAppend({})} leftIcon={<AddColumnIcon />} className="text-primary">
            Qo’shish
          </BtnOutlined>
        </div>
      </Card>
    </div>
  )
}
