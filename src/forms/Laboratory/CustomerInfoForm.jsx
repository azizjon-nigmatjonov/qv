import { Grid } from '@mui/material'
import { useContext } from 'react'
import { Controller, useWatch } from 'react-hook-form'
import ReactInputMask from 'react-input-mask'
import { Card, Input, Select } from '../../components'
import LabaratoryApplicationContext from '../../views/Labaratory/LabaratoryApplicationAdd/context'

export default function CustomerInfoForm({ disabled, register, beingCreated = true, districts, control }) {
  const watchDistricts = useWatch({
    control,
    name: 'customer',
  })
  return (
    <Card title="Buyurtmachi haqida ma`lumot" className="col-span-6">
      <Grid container spacing={2}>
      <Grid item xs={12}>
          <span className="input-label col-span-4">Nomidan</span>
          <Input widthFull disabled={disabled} register={register} name="customer.by_name" />
        </Grid>
        <Grid item xs={12}>
          <span className="input-label col-span-4">Tuman</span>
          <Select widthFull disabled={disabled} options={districts} control={control} name="customer.district" />
        </Grid>
        <Grid item xs={12}>
          <span className="input-label col-span-4">Tashkilot nomi</span>
          <Input widthFull disabled={disabled} register={register} name="customer.firm_name" />
        </Grid>
        <Grid item xs={12}>
          <span className="input-label col-span-4">Tashkilot manzili</span>
          <Input widthFull disabled={disabled} register={register} name="customer.firm_address" />
        </Grid>
        <Grid item xs={12}>
          <span className="input-label col-span-4">Hisob raqam</span>
          <Input widthFull disabled={disabled} register={register} name="customer.firm_accaunt_number" />
        </Grid>
        <Grid item xs={6}>
          <span className="input-label col-span-4">Bank nomi</span>
          <Input widthFull disabled={disabled} register={register} name="customer.firm_bank_name" />
        </Grid>
        <Grid item xs={6}>
          <span className="input-label col-span-4">Bank kodi</span>
          <Input widthFull disabled={disabled} register={register} name="customer.firm_bank_code" />
        </Grid>
        <Grid item xs={6}>
          <span className="input-label col-span-4">STIR</span>
          <Input widthFull disabled={disabled} register={register} name="customer.firm_stir" />
        </Grid>
        <Grid item xs={6}>
          <span className="input-label col-span-4">IFTUT</span>
          <Input widthFull disabled={disabled} register={register} name="customer.firm_ifud" />
        </Grid>
        <Grid item xs={12}>
          <span className="input-label col-span-4">Telefon raqami</span>
            <Controller
              control={control}
              name="customer.firm_phone"
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <ReactInputMask
                  className={`px-5 uppercase text-sm border transition-all duration-500 rounded-md hover:border-primary focus:border-primary focus:outline-none  w-full h-10 ${
                    error ? 'border-red-400' : 'border-borderColor'
                  }`}
                  mask="+\9\98 (99) 999-99-99"
                  maskChar=" "
                  value={value}
                  onChange={onChange}
                />
              )}
            />
        
        </Grid>
        <Grid item xs={12}>
          <span className="input-label col-span-4">Tashkilot rahbari</span>
          <Input widthFull disabled={disabled} register={register} name="customer.firm_boss_name" />
        </Grid>
        <Grid item xs={12}>
          <span className="input-label col-span-4">Obyekt nomi va manzili</span>
          <Input widthFull disabled={disabled} register={register} name="customer.obj_name_address" />
        </Grid>
      </Grid>
    </Card>
  )
}
