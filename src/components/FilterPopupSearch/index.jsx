import { Popover } from '@mui/material'
import { useState } from 'react'
import { Search } from '@mui/icons-material'

const FilterPopupSearch = ({ title, value, setValue, placeholder = 'Qidirish...' }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [inputValue, setInputValue] = useState('')
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const popId = open ? 'simple-popover' : undefined

  return (
    <div className="flex justify-between gap-4 items-center w-full">
      <span>{title}</span>
      <span className="cursor-pointer" onClick={handleClick}>
        <Search htmlColor={inputValue.length ? '#000' : '#9AAFCD'} />
      </span>
      <Popover
        id={popId}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: '',
        }}
      >
        <div className="p-4 relative w-[280px]">
          <input
            type="text"
            autoFocus={true}
            value={inputValue}
            className="border w-full h-10 px-3 transition-all duration-500 rounded-md hover:border-primary focus-within:border-primary"
            onChange={(e) => {
              setInputValue(e.target.value)
              if (e.target.value.length >= 3) {
                setValue(e.target.value)
              } else {
                setValue('')
              }
            }}
            placeholder={placeholder}
          />
        </div>
      </Popover>
    </div>
  )
}

export default FilterPopupSearch
