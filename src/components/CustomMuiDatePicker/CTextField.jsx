// import Select from "react-select";
import cls from './style.module.scss'
import { Controller, useForm } from 'react-hook-form'
import { TextField } from '@mui/material'
import { styled } from '@mui/material/styles'
// import ErrorMessage from "../ErrorText";

const CustomTextField = styled(TextField)(({ theme, primary, color, bordercolor, width, error, disabled }) => ({
  '& label.Mui-focused': {
    fontSize: '14px',
    lineHeight: '24px',
  },
  '& .Mui-disabled .MuiOutlinedInput-notchedOutline': {
    border: '1px solid rgba(0, 0, 0, 0.1) !important',
  },
  '& .MuiOutlinedInput-root.MuiInputBase-root fieldset': {
    border: error ? '1px solid rgba(0, 0, 0, 0.1)' : '',
  },
  '& .MuiOutlinedInput-root.Mui-focused:hover fieldset': {
    border: error ? '1px solid rgba(0, 0, 0, 0.1)' : bordercolor?.main || '2px solid rgba(64, 148, 247, 1)',
  },
  '& .MuiInputLabel-root.Mui-error': {
    color: error ? '#919EAB' : '',
  },
  '& .MuiButtonBase-root.MuiIconButton-root': {
    outline: 'none',
  },
  '& .MuiOutlinedInput-root': {
    backgroundColor: disabled ? '#F4F6FA' : error ? '#FDEEEF' : '#fff',
    borderRadius: '6px',
    '&:hover fieldset': {
      border: error ? '1px solid rgba(0, 0, 0, 0.1)' : bordercolor?.hover || '1px solid rgba(64, 148, 247, 1)',
    },

    '&:focus fieldset': {
      border: error ? '1px solid rgba(0, 0, 0, 0.1)' : bordercolor?.focus || '1px solid rgba(64, 148, 247, 1)',
    },
  },
  color,
  width: width,
}))

export default function CTextField({
  label,
  name = '',
  size = 'small',
  value,
  validation,
  defaultValue = '',
  disabled,
  type,
  height = 40,
  error,
  control,
  width,
  fullWidth = true,
  borderColor,
  padding,
  icon,
  customClick,
  iconText,
  errorText,
  errorFromDatePicker,
  consolable,
  customOnChange = () => {},
  ...props
}) {
  const { control: register } = useForm()
  return (
    <div className={cls.inputCont}>
      <div className={cls.innerInput}>
        <Controller
          name={name}
          control={control || register}
          rules={validation}
          defaultValue={''}
          render={({ field: { onChange, onBlur, value, name, focused, ref }, fieldState: { error, isDirty } }) => {
            return (
              <CustomTextField
                bordercolor={borderColor}
                error={error || errorText || errorFromDatePicker}
                // isDirty={isDirty}
                label={label}
                size={size}
                defaultValue={value}
                type={type}
                value={value}
                width={width}
                fullWidth={fullWidth}
                disabled={disabled}
                style={{ height }}
                /* styles the label component */
                InputLabelProps={{
                  style: {
                    lineHeight: '24px',
                  },
                }}
                /* styles the input component */
                inputProps={{
                  style: {
                    height,
                    padding: padding || '0 14px',
                  },
                }}
                onChange={(e) => {
                  onChange(e)
                  customOnChange(e)
                }}
                {...props}
                // InputProps={{
                //   endAdornment: (
                //     <InputAdornment style={{}}> {icon ? icon : ''} </InputAdornment>
                //   )
                // }}
              />
            )
          }}
        />
        {icon ? (
          <div className={cls.icon} onClick={customClick}>
            {icon}
            {iconText ? <span>{iconText}</span> : ''}
          </div>
        ) : (
          ''
        )}
      </div>

      {errorText ? (
        <div style={{ color: 'red', fontSize: '11px', height: '14px' }}>{errorText ? errorText : ''}</div>
      ) : (
        ''
      )}

      {/* <div className={cls.errorMessageContainer}>
        <ErrorMessage errorMessage={error?.[name]?.message || ""} />
      </div> */}
    </div>
  )
}
