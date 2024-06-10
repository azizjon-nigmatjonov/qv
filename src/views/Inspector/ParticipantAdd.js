import { uz } from 'date-fns/locale'
import { Controller, useForm } from 'react-hook-form'
import PhoneInput from 'react-phone-input-2'
import * as yup from 'yup'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { validations } from '../../validations'
import { BtnFiled, Card, Header, Input, Select } from '../../components'
import { useYupValidationResolver } from '../../hooks/useYupValidationResolver'
import { SaveIcon } from '../../assets/icons'
import { useObject } from '../../services'

const ParticipantAdd = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { state } = useLocation()

  const disabledScheme = yup.object({
    name: validations.string,
    middle_name: validations.string,
    surname: validations.string,
    passport_number: validations.string,
    organization_name: validations.string,
    speciality: validations.string,
    phone: validations.string,
  })

  const {
    name,
    surname,
    middle_name,
    organization_name,
    passport_number,
    role_name,
    role_id,
    phone,
    id: user_id,
  } = state?.data

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({
    resolver: useYupValidationResolver(disabledScheme),
    defaultValues: {
      name,
      middle_name,
      surname,
      passport_number,
      organization_name,
      speciality: role_name,
      phone,
      login: '',
      password: '',
    },
  })

  const options = [
    {
      value: '5e4fe86a-adc5-4535-b586-264061cafcb5',
      label: 'Prorab',
      client_type_id: '090b5de7-c9f3-4fcb-926a-9cdb0d090665',
    },
    {
      value: '6126cbeb-b0b8-4059-9758-14ff3c35473f',
      label: 'Texnik nazoratchi',
      client_type_id: 'fca20418-5875-4ba0-a815-4f51cb2251f8',
    },
    {
      value: 'e7777bfa-7416-44e8-b609-99136ec5d3b0',
      label: 'Mualliflik nazorati',
      client_type_id: '5ea153b8-7c46-4df9-8968-4b079e53d902',
    },
  ]

  const { objectParticipantsMutation } = useObject({
    id,
    craeteObjectParticipantsProps: {
      onSuccess: () => {
        navigate(-1)
      },
    },
  })

  const onSubmit = (data) => {
    objectParticipantsMutation.mutate({
      object_id: id,
      role_id,
      status: true,
      user_id,
    })
  }

  return (
    <div className="h-screen">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Header
          title="Qatnashuvchi qo'shish"
          backLink={-1}
          rightElement={
            <BtnFiled leftIcon={<SaveIcon />} type="submit">
              Saqlash
            </BtnFiled>
          }
        />
        <div className="sidebar-header-calc grid grid-cols-12 gap-6">
          <Card title="Umimiy ma'lumot" className="col-span-6 h-fit">
            <span className="input-label">Ism *</span>
            <Input required widthFull errors={errors} disabled={true} register={register} name="name" />
            <span className="input-label mt-4">Sharif *</span>
            <Input required widthFull errors={errors} disabled={true} register={register} name="middle_name" />
            <span className="input-label mt-4">Familiya *</span>
            <Input required widthFull errors={errors} disabled={true} register={register} name="surname" />
            <span className="input-label mt-4">Tashkilot nomi *</span>
            <Input required widthFull errors={errors} disabled={true} register={register} name="organization_name" />
            <span className="input-label mt-4">Pasport seriya *</span>
            <Input required widthFull errors={errors} disabled={true} register={register} name="passport_number" />
            <span className="input-label mt-4">Mutaxassisligi *</span>
            <Input required widthFull errors={errors} disabled={true} register={register} name="speciality" />
            <span className="input-label mt-4">Telefon raqami *</span>
            <Controller
              control={control}
              name="phone"
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <PhoneInput
                  country="uz"
                  disableDropdown={true}
                  disableCountryCode={true}
                  countryCodeEditable={true}
                  renderStringAsFlag={'+998'}
                  defaultMask="(..) ... - .. - .."
                  alwaysDefaultMask={true}
                  value={value}
                  onBlur={onBlur}
                  placeholder="(99) 123 - 45 - 67"
                  localization={uz}
                  inputStyle={{
                    width: '100%',
                    borderColor: '#E5E9EB',
                    height: '38px',
                    paddingLeft: 80,
                  }}
                  buttonStyle={{
                    borderColor: '#E5E9EB',
                    padding: '6px 20px 2px 10px',
                    width: 'initial',
                  }}
                  containerStyle={{ height: '38px' }}
                  onChange={onChange}
                  disabled={true}
                />
              )}
            />
          </Card>
          <Card title="Login" className="col-span-6 h-fit">
            <span className="input-label">Lavozim *</span>
            <Select
              value={role_name}
              control={control}
              name="role_id"
              options={options}
              required
              errors={errors}
              disabled={true}
            />
            <span className="input-label mt-4">Login *</span>
            <Input widthFull errors={errors} disabled={true} register={register} name="login" />
            <span className="input-label mt-4">Parol *</span>
            <Input widthFull errors={errors} disabled={true} register={register} name="password" />
          </Card>
        </div>
      </form>
    </div>
  )
}

export default ParticipantAdd
