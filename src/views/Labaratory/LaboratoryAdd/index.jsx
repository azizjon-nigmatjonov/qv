import { Save } from '@mui/icons-material'
import CancelIcon from '@mui/icons-material/Cancel'
import { BtnFiled, BtnOutlined, Header } from '../../../components'
import ProductForm from '../../../components/ProductForm'

export default function LaboratoryAdd() {
  return (
    <div className="h-screen">
      <Header
        backLink={-1}
        title="Qo'shish"
        rightElement={
          <div className="flex gap-3">
            <BtnOutlined color="red" leftIcon={<CancelIcon />}>
              Bekor qilish
            </BtnOutlined>
            <BtnFiled leftIcon={<Save />}>Saqlash</BtnFiled>
          </div>
        }
      />
      <div className="sidebar-header-calc">
        <ProductForm />
      </div>
    </div>
  )
}
