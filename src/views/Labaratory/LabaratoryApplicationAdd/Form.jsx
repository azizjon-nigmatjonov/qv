import { Grid } from '@mui/material'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CancelIcon, SaveIcon } from '../../../assets/icons'
import { BtnFiled, BtnOutlined, Header } from '../../../components'
import ContractInfoForm from '../../../forms/Laboratory/ContractInfoForm'
import CustomerInfoForm from '../../../forms/Laboratory/CustomerInfoForm'
import PerformerInfoForm from '../../../forms/Laboratory/PerformerInfoForm'
import LabaratoryApplicationContext from './context'
import SmetaTableLogicComp from './SmetaTableLogicComp'

export default function LabaratoryForm() {
  const { handleSubmit, control, register, districts, onSubmit, headTitle, setValue } =
    useContext(LabaratoryApplicationContext)
  const navigate = useNavigate()
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Header
        title={headTitle}
        backLink={-1}
        rightElement={
          <div className="flex gap-3">
            <BtnOutlined type="button" leftIcon={<CancelIcon />} color="red" onClick={() => navigate(-1)}>
              Bekor qilish
            </BtnOutlined>
            <BtnFiled type="submit" leftIcon={<SaveIcon />}>
              Saqlash
            </BtnFiled>
          </div>
        }
      />
      <div className="p-4 header-calc">
        <Grid container spacing={2}>
          <Grid item xs={6} md={6}>
            <PerformerInfoForm register={register} control={control} />
          </Grid>
          <Grid item xs={6} md={6}>
            <CustomerInfoForm register={register} control={control} districts={districts} />
          </Grid>
          <Grid item xs={12} md={12}>
            <SmetaTableLogicComp />
          </Grid>
          <Grid item xs={12} md={12}>
            <ContractInfoForm disabled register={register} control={control} />
          </Grid>
        </Grid>
      </div>
    </form>
  )
}
