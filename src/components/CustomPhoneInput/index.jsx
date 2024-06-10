import { uz } from 'date-fns/locale'
import { Controller } from 'react-hook-form'
import PhoneInput from 'react-phone-input-2'

const CustomPhoneInput = ({ control, errors, name='phone' }) => {
  return (
    <>
      <Controller
        control={control}
        errors={errors}
        name={name}
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
              borderColor: errors?.phone ? 'red' : '#E5E9EB',
              height: '38px',
              paddingLeft: 80,
            }}
            buttonStyle={{
              borderColor: errors?.phone ? 'red' : '#E5E9EB',
              padding: '6px 20px 2px 10px',
              width: 'initial',
            }}
            containerStyle={{ height: '38px' }}
            onChange={onChange}
          />
        )}
      />
      {errors?.phone && <span className="text-xs text-red-600">{errors.phone.message}</span>}
    </>
  )
}

export default CustomPhoneInput
