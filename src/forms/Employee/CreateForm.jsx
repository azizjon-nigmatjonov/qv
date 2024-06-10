import { useEffect, useRef, useState } from 'react'
import { Controller, useWatch } from 'react-hook-form'
import ReactInputMask from 'react-input-mask'
import { useSelector } from 'react-redux'
import { Card, FileUpload, Input, Select } from '../../components'
import CustomPhoneInput from '../../components/CustomPhoneInput'
import { KADRLAR_BOLIMI_BOSHLIGI_ROLE_ID } from '../../settings/constants'

const CreateForm = ({
  register,
  control,
  errors,
  watch,
  setValue,
  clearErrors,
  clients,
  roles,
  regions,
  districts,
  isSuperAdmin = false,
  unregister,
  getValues,
}) => {
  const [isInspector, setIsinspector] = useState(false)
  const clientTypesFiltered = useRef()
  const watchClientType = useWatch({ control, name: 'client_type_id' })
  const { roleId } = useSelector((state) => state.auth)
  const [showAcceptanceField, setShowAcceptanceField] = useState(false)

  useEffect(() => {
    if (watchClientType?.value === 'a3909e81-1d0f-4b57-99df-f41a33d967dd') {
      setShowAcceptanceField(true)
    } else setShowAcceptanceField(false)

    if (watchClientType?.value === 'b5fba0ef-44e3-433c-8d7a-b6294b68becc') {
      setIsinspector(true)
    } else {
      setIsinspector(false)
    }
  }, [watchClientType])

  clientTypesFiltered.current = [
    { name: 'Texnik', id: 'fca20418-5875-4ba0-a815-4f51cb2251f8' },
    { name: 'Mualllif', id: '5ea153b8-7c46-4df9-8968-4b079e53d902' },
  ]

  if (clients?.data?.client_types.filter((client) => client.name !== 'PRORAB').length) {
    clientTypesFiltered.current = [
      ...clientTypesFiltered.current,
      ...clients?.data?.client_types.filter((client) => client.name !== 'PRORAB'),
    ]
  }
  console.log(watchClientType)
  const rolesFiltered = roles?.data?.roles.filter((client) => client.name !== 'PRORAB')
  return (
    <div className="grid grid-cols-12 gap-4">
      <Card title="Shaxsiy malumotlar" className="col-span-6">
        <div className="items-center gap-4">
          <span className="input-label">PINFL</span>
          <div className="mb-4">
            <Controller
              control={control}
              name="pinfl"
              errors={errors}
              render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { error } }) => (
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
            {errors?.pinfl && <p className="text-red-600 text-[12px]">{errors.pinfl.message}</p>}
          </div>

          <span className="input-label">Familiyasi</span>
          <div className="mb-4">
            <Input widthFull name="surname" register={register} errors={errors} />
          </div>
          <span className="input-label">Ismi</span>
          <div className="mb-4">
            <Input widthFull name="name" register={register} errors={errors} />
          </div>
          <span className="input-label">Otasining ismi</span>
          <div className="mb-4">
            <Input widthFull name="middle_name" register={register} errors={errors} />
          </div>
          <span className="input-label">Manzili</span>
          <div className="mb-4">
            <Input widthFull name="address" register={register} errors={errors} />
          </div>
          <span className="input-label">INPS</span>
          <div className="mb-4">
            <Controller
              control={control}
              name="nps"
              errors={errors}
              render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { error } }) => (
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
            {errors?.pinfl && <p className="text-red-600 text-[12px]">{errors.pinfl.message}</p>}
          </div>
          <span className="input-label">Passport raqami</span>
          <div className="mb-4">
            <Controller
              control={control}
              name="passport_number"
              errors={errors}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <ReactInputMask
                  className={`px-5 uppercase text-sm border transition-all duration-500 rounded-md hover:border-primary focus-within:border-primary w-full h-10 ${
                    error ? 'border-red-400' : 'border-borderColor'
                  }`}
                  mask="aa 9999999"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            {errors?.passport_number && <p className="text-red-600 text-[12px]">{errors.passport_number.message}</p>}
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
      <Card title="Login" className="col-span-6 overflow-visible h-fit">
        <>
          <span className="input-label">Login</span>
          <div className="mb-4">
            <Input widthFull name="login" errors={errors} register={register} />
          </div>
          <span className="input-label">Parol</span>
          <div className="mb-4">
            <Input widthFull name="password" errors={errors} register={register} />
          </div>
        </>
        {isSuperAdmin && (
          <>
            <span className="input-label">Viloyat</span>
            <div className="mb-4">
              <Select
                isLoading={regions.isLoading}
                options={regions?.data?.regions?.map((item) => ({
                  label: item.uz_name,
                  value: item.id,
                }))}
                name="region_id"
                control={control}
                errors={errors}
              />
            </div>
          </>
        )}
        <span className="input-label">Tuman</span>
        <div className="mb-4">
          <Select
            isLoading={districts.isLoading}
            options={districts?.data?.districts?.map((item) => ({
              label: item.uz_name,
              value: item.id,
            }))}
            name="district_id"
            disabled={isSuperAdmin ? !watch('region_id') : false}
            control={control}
            errors={errors}
          />
        </div>
        <span className="input-label">Mijoz turi</span>
        <div className="mb-4">
          <Select
            isLoading={clients.isLoading}
            control={control}
            name="client_type_id"
            options={clientTypesFiltered.current?.map((i) => ({
              label: i.name,
              value: i.id,
            }))}
            errors={errors}
          />
        </div>
        <span className="input-label">Lavozim</span>
        <div className="mb-4">
          <Select
            isLoading={roles.isLoading}
            control={control}
            name="role_id"
            disabled={!watch('client_type_id')}
            options={rolesFiltered?.map((i) => ({
              label: i.name,
              value: i.id,
            }))}
            errors={errors}
          />
        </div>
        {showAcceptanceField && (
          <>
            <span className="input-label">Hududiy tashkilot nomi</span>
            <div className="mb-4">
              <Input
                required={showAcceptanceField}
                message="To'ldirilishi shart bo'lgan maydon"
                widthFull
                name="organization_name"
                errors={errors}
                register={register}
              />
            </div>
          </>
        )}
      </Card>
    </div>
  )
}

export default CreateForm
