import { Controller, useForm } from 'react-hook-form'
import { AsyncPaginate } from 'react-select-async-paginate'
import { colourStyles } from './styles'

export function AsyncSelectPaginate({
  loadOptions,
  placeholder = '',
  control,
  name,
  disabled = false,
  isMulti,
  errors,
  withBorder = true,
}) {
  const { control: register } = useForm()

  return (
    <>
      <Controller
        name={name}
        control={control || register}
        render={({ field: { value, onChange, onBlur } }) => {
          return (
            <AsyncPaginate
              loadOptions={loadOptions}
              additional={{ page: 1 }}
              styles={colourStyles({ withBorder })}
              onChange={onChange}
              value={value}
              isMulti={isMulti}
              onBlur={onBlur}
              placeholder={placeholder}
              isDisabled={disabled}
            />
          )
        }}
      />
      <div className="text-red-600 transition-all text-[12px]" style={{ height: errors && errors[name] ? 18 : 0 }}>
        {errors && errors[name] ? errors[name].message : ''}
      </div>
    </>
  )
}
