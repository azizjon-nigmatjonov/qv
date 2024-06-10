import { Checkbox, FormControlLabel, Grid } from '@mui/material'
import { useContext } from 'react'
import { Controller } from 'react-hook-form'
import { AddIcon } from '../../assets/icons'
import { BasicTable, BtnFiled, Card, Input, Select } from '../../components'
import LabaratoryApplicationContext from '../../views/Labaratory/LabaratoryApplicationAdd/context'

export default function SmetaTableForm({
  headData,
  bodyData,
  handleCalculateWithoutTransportCost,
  footerData = [],
  handleAppendSmeta = () => {},
}) {
  const { register, control, headTitle, setValue } = useContext(LabaratoryApplicationContext)
  return (
    <div>
      <Card title="Jadvalni shakllantirish" className="col-span-6">
        <div>
          <div className="width-full flex justify-between align-middle h-[36px] mb-2">
            <FormControlLabel
              control={
                <Controller
                  name="calculate_without_transport_cost"
                  control={control}
                  render={({ field: props }) => (
                    <Checkbox
                      {...props}
                      checked={props.value}
                      onChange={(e) => {
                        props.onChange(e.target.checked)
                        handleCalculateWithoutTransportCost(e.target.checked)
                      }}
                    />
                  )}
                />
              }
              label="Transport harajatlarisiz xisoblash"
            />
            <BtnFiled onClick={handleAppendSmeta} leftIcon={<AddIcon />}>
              {' '}
              Qo`shish
            </BtnFiled>
          </div>
          <BasicTable
            headColumns={headData}
            bodyColumns={bodyData}
            tableScroll={true}
            noPadding={true}
            colTextCenter={true}
            footerColumns={footerData}
            className="w-full"
          />
          <div className="mt-2">
                <span className="input-label col-span-4">Summani so’z bilan kiritish</span>
                <Input widthFull register={register} name="overal_sum_in_words" />
          </div>
        </div>
      </Card>
    </div>
  )
}
