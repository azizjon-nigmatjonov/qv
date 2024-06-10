import { Controller } from 'react-hook-form'
import CDatePicker from './CDatePicker'
import cls from './style.module.scss'

export default function CustomMuiDatePicker({
  label,
  name = '',
  placeholder,
  value,
  validation,
  defaultValue,
  height = '40px',
  width = '100%',
  error,
  register,
  disabled,
  withoutBorder,
  control,
  validate,
  disableFuture,
  fullWidth,
  maxDate,
  consolable,
  inputFormat,
  minDate,
  icon,
  // height,
  // width,
  customOnChange = () => {},
  ...props
}) {
  return (
    <div className={cls.inputCont}>
      <Controller
        name={name}
        control={control}
        rules={validation}
        defaultValue={defaultValue}
        render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { error } }) => (
          <CDatePicker
            icon={icon}
            inputFormat={inputFormat}
            error={error}
            label={label}
            maxDate={maxDate}
            minDate={minDate}
            withoutBorder={withoutBorder}
            disabled={disabled}
            disableFuture={disableFuture}
            fullWidth={fullWidth}
            consolable={consolable}
            onChange={(e) => {
              onChange(e)
              customOnChange(e)
            }}
            value={value}
            height={height}
            {...props}
          />
        )}
      />
    </div>
  )
}
