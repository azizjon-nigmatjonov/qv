import { Popover } from '@mui/material'
import ReactSelect from 'react-select'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import { useState } from 'react'

const FilterPopup = ({ title, options, selected, setSelected, placeholder = "Bo'limni tanlang" }) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const popId = open ? 'simple-popover' : undefined

  return (
    <div className="flex justify-between items-center w-full">
      <span>{title}</span>
      <span className="cursor-pointer" onClick={handleClick}>
        <FilterAltIcon htmlColor={selected ? '#000' : '#9AAFCD'} />
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
        <div className="p-4 relative h-[70px] w-[280px]">
          <ReactSelect
            isClearable
            placeholder={`${placeholder}...`}
            styles={{ container: () => ({ position: 'fixed', width: '248px' }) }}
            options={options}
            defaultValue={selected}
            onChange={(e) => {
              setSelected(e)
              handleClose()
            }}
          />
        </div>
      </Popover>
    </div>
  )
}

export default FilterPopup
