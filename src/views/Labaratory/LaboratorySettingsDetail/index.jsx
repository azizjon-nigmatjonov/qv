import { useNavigate } from 'react-router-dom'
import { Delete, Save } from '@mui/icons-material'

import { CancelIcon } from '../../../assets/icons'
import { BtnFiled, BtnOutlined, Header } from '../../../components'
import { PaymentForm } from '../../../forms/Accounted/Payment'

export default function LaboratorySettingsDetail() {
  const navigate = useNavigate()

  return (
    <div className="h-screen">
      <Header
        title="Beton mustahkamligini buzmasdan aniqlash usuli"
        backLink="/laboratory-settings"
        rightElement={
          <div className="flex gap-3">
            <BtnOutlined color="red" leftIcon={<Delete fontSize="small" />}>
              O'chirish
            </BtnOutlined>
            <BtnOutlined color="red" leftIcon={<CancelIcon fontSize="small" />} onClick={() => navigate(-1)}>
              Bekor qilish
            </BtnOutlined>
            <BtnFiled leftIcon={<Save fontSize="small" />}>Saqlash</BtnFiled>
          </div>
        }
      />
      <div className="sidebar-header-calc">
        <PaymentForm title="Umumiy ma`lumot" label1="Mahsulot nomi" label2="O`lchov birligi" secondFieldType="text" />
      </div>
    </div>
  )
}
