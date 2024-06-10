import { ChevronLeft } from '@mui/icons-material'
import { MenuItem, Select, InputLabel, FormControl, InputBase } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useState } from 'react'
import useWindowSize from '../../hooks/useWindowSize'

// export const DarkSelect = ({ options = [], handleChange, value = '2022' }) => {
//   return (
//     <Select value={value} onChange={handleChange} inputProps={{ 'aria-label': 'Without label' }}>
//       {options.length ? (
//         options.map((option, index) => (
//           <MenuItem key={index + option.value} value={option.value}>
//             {option.value}
//           </MenuItem>
//         ))
//       ) : (
//         <span>Ma'lumotlar yo'q</span>
//       )}
//     </Select>
//   )
// }

const CustomSelect = styled(InputBase)(() => ({
  padding: '4px 12px 4px',
  border: 'none',
  borderRadius: '12px',
  backgroundColor: '#F6F8F9',
  fontWeight: '500',
  fontSize: '16px',
}))

export default function DarkSelect({ options = [], value = '', setValue, className }) {
  const windowSize = useWindowSize()

  const handleChange = (e) => setValue(e.target.value)
  return (
    <FormControl sx={{ minWidth: 120 }} size="small">
      <Select
        className={`${className}`}
        input={<CustomSelect />}
        labelId="demo-select-small"
        id="demo-select-small"
        value={value}
        label="value"
        onChange={handleChange}
        IconComponent={() => (
          <span style={{ transform: 'rotate(-90deg)' }}>
            <ChevronLeft htmlColor="#6E7C87" />
          </span>
        )}
        MenuProps={{ PaperProps: { sx: { maxHeight: windowSize < 800 ? 120 : 300, minWidth: 100 } } }}
      >
        {options.length ? (
          options.map((option, index) => (
            <MenuItem key={index + option?.value} value={option?.value}>
              {option?.label}
            </MenuItem>
          ))
        ) : (
          <span>Ma'lumotlar mavjud emas</span>
        )}
      </Select>
    </FormControl>
  )
}
