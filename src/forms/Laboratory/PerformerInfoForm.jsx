import { Grid } from '@mui/material'
import { useContext } from 'react'
import { Controller } from 'react-hook-form'
import ReactInputMask from 'react-input-mask'
import { Card, Input } from '../../components'
import CustomMuiDatePicker from '../../components/CustomMuiDatePicker'
import LabaratoryApplicationContext from '../../views/Labaratory/LabaratoryApplicationAdd/context'

export default function PerformerInfoForm({ disabled = true, register, beingCreated = true, control }) {
  return (
    <Card title="Ijrochi haqida ma`lumot" className="col-span-6">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <span className="input-label col-span-4">Viloyat</span>
          <Input widthFull disabled={disabled} register={register} name="performer.region_name" />
        </Grid>
        <Grid item xs={12}>
          <span className="input-label col-span-4">Tashkilot nomi</span>
          <Input widthFull disabled={disabled} register={register} name="performer.org_name" />
        </Grid>
        <Grid item xs={12}>
          <span className="input-label col-span-4">Tashkilot manzili</span>
          <Input widthFull disabled={disabled} register={register} name="performer.org_address" />
        </Grid>
        <Grid item xs={12}>
          <span className="input-label col-span-4">Hisob raqam</span>
          <Input widthFull disabled={disabled} register={register} name="performer.org_accaunt_number" />
        </Grid>
        <Grid item xs={6}>
          <span className="input-label col-span-4">Bank nomi</span>
          <Input widthFull disabled={disabled} register={register} name="performer.org_bank_name" />
        </Grid>
        <Grid item xs={6}>
          <span className="input-label col-span-4">Bank kodi</span>
          <Input widthFull disabled={disabled} register={register} name="performer.org_bank_code" />
        </Grid>
        <Grid item xs={6}>
          <span className="input-label col-span-4">STIR</span>
          <Input widthFull disabled={disabled} register={register} name="performer.org_stir" />
        </Grid>
        <Grid item xs={6}>
          <span className="input-label col-span-4">IFTUT</span>
          <Input widthFull disabled={disabled} register={register} name="performer.org_ifud" />
        </Grid>
        <Grid item xs={12}>
          <span className="input-label col-span-4">Telefon raqami</span>

          {beingCreated ? (
            <Controller
              control={control}
              name="performer.org_phone"
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <ReactInputMask
                  className={`px-5 uppercase text-sm border transition-all duration-500 rounded-md hover:border-primary focus:border-primary focus:outline-none  w-full h-10 ${
                    error ? 'border-red-400' : 'border-borderColor'
                  }`}
                  mask="+\9\98 (99) 999-99-99"
                  disabled={disabled}
                  maskChar=" "
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          ) : (
            <Input widthFull disabled={disabled} register={register} name="performer.org_phone" />
          )}
        </Grid>
        <Grid item xs={12}>
          <span className="input-label col-span-4">Tashkilot rahbari</span>
          <Input widthFull disabled={disabled} register={register} name="performer.org_boss_name" />
        </Grid>
        <Grid item xs={12}>
          <span className="input-label col-span-4">Tashkilot yuristi</span>
          <Input widthFull disabled={disabled} register={register} name="performer.org_lawyer" />
        </Grid>
        <Grid item xs={12}>
          <span className="input-label col-span-4">Shartnoma tuzilgan sanasi</span>
          <CustomMuiDatePicker
            defaultValue={new Date()}
            control={control}
            name="contracted_date"
            disabled={disabled}
            widthFull
          />
        </Grid>
        <Grid item xs={12}>
          <span className="input-label col-span-4">Shartnoma muddati</span>
          <CustomMuiDatePicker control={control} name="contract_deadline" widthFull />
        </Grid>
      </Grid>
    </Card>
  )
}
