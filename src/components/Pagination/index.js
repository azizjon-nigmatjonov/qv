import React from 'react'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Popover } from '@mui/material'
import MuiPagination from '@mui/material/Pagination'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useMemo } from 'react'

export function Pagination({
  count = 0,
  currentPage = 1,
  onChange = function () {},
  marginTop = 0,
  onChangeLimit,
  limit = 10,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const searchParamsMemo = useMemo(() => Object.fromEntries([...searchParams]), [searchParams])
  const handleClickPopup = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <div className="flex w-full align-center justify-between" style={{ marginTop }}>
      <div
        className="py-1.5 px-4 text-sm border rounded-md flex items-center text-primary cursor-pointer"
        onClick={handleClickPopup}
      >
        <InsertDriveFileIcon fontSize="small" className="mr-2" />
        <span className="text-black font-medium">{limit} tadan ko'rsatish</span>
        <KeyboardArrowDownIcon className="ml-2" />
      </div>

      <MuiPagination
        count={Math.ceil(count / limit)}
        shape="rounded"
        className="flex"
        page={currentPage}
        onChange={(_, value) => {
          navigate(`?${searchParams ? searchParams + '&' : ''}offset=${value}&limit=${limit}`)
          setSearchParams({ ...searchParamsMemo, offset: value})
          onChange(value)
        }}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <div
          className="w-40 px-3 py-2 hover:bg-gray-50 cursor-pointer text-base font-medium"
          onClick={() => {
            onChangeLimit(10)
            setSearchParams({ ...searchParamsMemo, limit: 10})
            onChange(1)
            handleClose()
          }}
        >
          10
        </div>
        <div
          className="w-40 px-3 py-2 hover:bg-gray-50 cursor-pointer text-base font-medium"
          onClick={() => {
            setSearchParams({ ...searchParamsMemo, limit: 30})
            onChangeLimit(30)
            onChange(1)
            handleClose()
          }}
        >
          30
        </div>
        <div
          className="w-40 px-3 py-2 hover:bg-gray-50 cursor-pointer text-base font-medium"
          onClick={() => {
            setSearchParams({ ...searchParamsMemo, limit: 50})
            onChangeLimit(50)
            onChange(1)
            handleClose()
          }}
        >
          50
        </div>
      </Popover>
    </div>
  )
}
