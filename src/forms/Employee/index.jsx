import { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'
import ReactInputMask from 'react-input-mask'
import { Save } from '@mui/icons-material'
import 'react-phone-input-2/lib/style.css'

import QuitForm from './QuitForm'
import AbsentForm from './AbsentForm'
import ChangesForm from './ChangesForm'
import PositionIncreaseForm from './PositionIncreaseForm'
import CustomPhoneInput from '../../components/CustomPhoneInput'
import { BtnFiled, Card, FileUpload, Input } from '../../components'
import { useUser } from '../../services'
import { useParams } from 'react-router-dom'
import { INSPEKTOR_BOSH_ROLE_ID, INSPEKTOR_PRASTOY_ROLE_ID, INSPEKTOR_YETAKCHI_ROLE_ID } from '../../settings/constants'

export function EmployeeForm({ form: { register, watch, errors, control, setValue, clearErrors, handleSubmit, fn } }) {
  const { id } = useParams()
  const [tableKey, setTableKey] = useState('')

  const { user } = useUser({
    id,
  })

  const roleId = user?.data?.role_id

  const [isInspector, setIsInspector] = useState(false)

  useEffect(() => {
    setIsInspector(
      roleId === INSPEKTOR_BOSH_ROLE_ID || roleId === INSPEKTOR_PRASTOY_ROLE_ID || roleId === INSPEKTOR_YETAKCHI_ROLE_ID
    )
  }, [roleId])

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-6">
        <form onSubmit={handleSubmit(fn)}>
          <Card
            title="Shaxsiy malumotlar"
            className="mb-4"
            rightElement={
              <BtnFiled disabled={fn.isLoading} type="submit" leftIcon={<Save />}>
                Saqlash
              </BtnFiled>
            }
          >
            <div className="items-center gap-4">
              <span className="input-label">PINFL</span>
              <div className="mb-4">
                <Controller
                  control={control}
                  name="pinfl"
                  errors={errors}
                  render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <ReactInputMask
                      className={`px-5 text-sm border transition-all duration-500 rounded-md hover:border-primary focus-within:border-primary w-full h-10 ${
                        error ? 'border-red-400' : 'border-borderColor'
                      }`}
                      mask="99999999999999"
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                    />
                  )}
                />
                {errors?.pinfl && <p className="text-red-600 text-[12px] mt-1">{errors.pinfl.message}</p>}
              </div>
              <div className="mb-4">
                <span className="input-label">Familiyasi</span>
                <Input widthFull name="surname" errors={errors} register={register} />
              </div>
              <div className="mb-4">
                <span className="input-label">Ismi</span>
                <Input widthFull name="name" errors={errors} register={register} />
              </div>
              <div className="mb-4">
                <span className="input-label">Otasining ismi</span>
                <Input widthFull name="middle_name" errors={errors} register={register} />
              </div>
              <div className="mb-4">
                <span className="input-label">Manzili</span>
                <Input widthFull name="address" errors={errors} register={register} />
              </div>
              <span className="input-label">INPS</span>
              <div className="mb-4">
                <Controller
                  control={control}
                  name="nps"
                  errors={errors}
                  render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <ReactInputMask
                      className={`px-5 text-sm border transition-all duration-500 rounded-md hover:border-primary focus-within:border-primary w-full h-10 ${
                        error ? 'border-red-400' : 'border-borderColor'
                      }`}
                      mask="99999999999999"
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                    />
                  )}
                />
                {errors?.nps && <p className="text-red-600 text-[12px] mt-1">{errors.nps.message}</p>}
              </div>
              <span className="input-label">Passport raqami</span>
              <div className="mb-4">
                <Controller
                  control={control}
                  name="passport_number"
                  errors={errors}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <ReactInputMask
                      className={`px-5 text-sm border transition-all duration-500 rounded-md hover:border-primary focus-within:border-primary w-full h-10 ${
                        error ? 'border-red-400' : 'border-borderColor'
                      }`}
                      mask="aa 9999999"
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
                {errors?.passport_number && (
                  <p className="text-red-600 text-[12px]">{errors.passport_number.message}</p>
                )}
              </div>
              <span className="input-label">Telefon raqami</span>
              <div className="mb-4">
                <CustomPhoneInput control={control} errors={errors} />
              </div>
              <span className="input-label">Diplom nusxasi</span>
              <div className="mb-4">
                <FileUpload
                  errors={errors}
                  clearErrors={clearErrors}
                  watch={watch}
                  nameFile="diplom"
                  setValue={setValue}
                  shape="input"
                />
              </div>
              <span className="input-label">Obyektivka</span>
              <div>
                <FileUpload
                  errors={errors}
                  clearErrors={clearErrors}
                  watch={watch}
                  nameFile="objective"
                  setValue={setValue}
                  shape="input"
                />
              </div>
            </div>
          </Card>
        </form>
        {isInspector && <ChangesForm setTableKey={setTableKey} tableKey={tableKey} />}
      </div>

      <div className="col-span-6">
        <div>
          <AbsentForm setTableKey={setTableKey} tableKey={tableKey} />
          <PositionIncreaseForm setIsInspector={setIsInspector} setTableKey={setTableKey} tableKey={tableKey} />
          <QuitForm setTableKey={setTableKey} tableKey={tableKey} />
          <Card title="Login" className="overflow-visible mt-4">
            <span className="input-label">Login</span>
            <div className="mb-4">
              <Input widthFull disabled register={register} name="login" />
            </div>
            <span className="input-label">Tuman</span>
            <div className="mb-4">
              <Input widthFull disabled register={register} name="district" />
            </div>
            <span className="input-label">Tashkilot nomi</span>
            <div className="mb-4">
              <Input widthFull disabled register={register} name="organization_name" />
            </div>
            <span className="input-label">Mijoz turi</span>
            <div className="mb-4">
              <Input widthFull disabled register={register} name="client_type_name" />
            </div>
            <span className="input-label">Lavozimi</span>
            <div className="mb-4">
              <Input widthFull disabled register={register} name="role_name" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
