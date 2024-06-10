import * as React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { AddIcon } from '../../assets/icons'
import { BtnFiled } from '../Buttons/BtnFilled'
import { useNavigate } from 'react-router-dom'

export default function DocumentAddMenuList() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const navigate = useNavigate()
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <BtnFiled id="basic-button" leftIcon={<AddIcon />} onClick={handleClick}>
        Hujjat qo’shish
      </BtnFiled>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem
          onClick={() => {
            navigate('act-lab/add')
          }}
        >
          Акт отбора образцов
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate('protocol/add')
          }}
        >
          Протокол Испытаний
        </MenuItem>
      </Menu>
    </div>
  )
}
