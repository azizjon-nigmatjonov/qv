import { Checkbox } from '@mui/material'
import { Controller } from 'react-hook-form'

export default function TableCheckbox({ control, defaultValue, label, style, name = '', customOnchange = () => {} }) {
  const id = name

  return (
    <div style={{ ...style, display: 'inline' }}>
      <Controller
        control={control}
        defaultValue={defaultValue}
        name={name}
        render={({ field: { value, onChange, name, ref, checked } }) => {
          return (
            <Checkbox
              style={{
                color: `${value ? '#174AA4' : '#B0BABF'}`,
              }}
              id={id}
              checked={value ?? false}
              onChange={(e) => {
                onChange(e.target.checked)
                customOnchange(e)
              }}
            />
          )
        }}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  )
}
