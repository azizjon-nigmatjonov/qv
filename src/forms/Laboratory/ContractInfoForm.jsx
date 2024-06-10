import { Grid } from '@mui/material'
import { useContext } from 'react'
import { Controller } from 'react-hook-form'
import ReactInputMask from 'react-input-mask'
import { Card, Input, Select } from '../../components'
import LabaratoryApplicationContext from '../../views/Labaratory/LabaratoryApplicationAdd/context'

export default function ContractInfoForm({ disabled = false, register, districts, control }) {
  return (
    <Card title="Shartnoma" className="col-span-6">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <span className="input-label col-span-4">To`ldiruvchini ismi</span>
          <Input widthFull disabled={disabled} options={districts} register={register} name="user_name" />
        </Grid>
        <Grid item xs={6}>
          <span className="input-label col-span-4">Shartnoma miqdori</span>
          <Input widthFull disabled={disabled} register={register} name="contract_price" />
        </Grid>
      </Grid>
    </Card>
  )
}
