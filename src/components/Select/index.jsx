import { Controller, useForm } from 'react-hook-form'
import SelectMenu, { components } from 'react-select'
import makeAnimated from 'react-select/animated'
import { colourStyles } from './styles'

const animatedComponents = makeAnimated()

const MultiValueContainer = (props) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        overflow: 'visible',
        whiteSpace: 'normal',
        width: '100%',
      }}
      content={'Customise your multi-value container!'}
    >
      <components.MultiValueContainer {...props} />
    </div>
  )
}

export function Select({
  options,
  placeholder = '',
  name = 'select',
  disabled = false,
  control,
  isMulti = false,
  required = false,
  errors,
  withBorder = true,
  customStyles,
  customOnChange = () => {},
  isLoading,
  ...rest
}) {
  const { control: register } = useForm()
  return (
    <>
      <Controller
        name={name}
        control={control || register}
        rules={{ required }}
        render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => {
          return (
            <SelectMenu
              options={options}
              menuPortalTarget={document.body}
              styles={colourStyles({ withBorder })}
              onChange={(e) => {
                onChange(e)
                customOnChange(e)
              }}
              value={value}
              onBlur={onBlur}
              placeholder={placeholder}
              isDisabled={disabled}
              isMulti={isMulti}
              isClearable={false}
              menuPosition="absolute"
              components={{ animatedComponents, MultiValueContainer }}
              noOptionsMessage={() => (isLoading ? 'Yuklanyabdi...' : 'Obyekt mavjud emas')}
              {...rest}
            />
          )
        }}
      />
      {errors && (
        <div
          className="text-red-600 transition-all text-[12px] mt-1"
          style={{ height: errors && errors[name] ? 18 : 0 }}
        >
          {errors && errors[name] && 'Tanlanishi shart'}
        </div>
      )}
    </>
  )
}
