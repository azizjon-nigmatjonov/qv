import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { useNavigate } from 'react-router'
import { AnimatePresence, motion } from 'framer-motion'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { Popover, TableFooter } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import ClearIcon from '@mui/icons-material/Clear'
import { useState } from 'react'

import NoDataPng from '../../assets/images/no-data.png'
import Switch from '../Switch'
import TableSkleton from './Skleton'

export function BasicTable({
  headColumns = [],
  offset = 1,
  limit = 10,
  bodyColumns = [],
  clickHandler = () => {},
  desiredRowName = '',
  desiredRowName2 = '',
  desiredRowName3 = '',
  desiredRowName4 = '',
  desiredRowName5 = '',
  sendIdKey,
  heightFit = false,
  colTextCenter = false,
  deleteFunc,
  rowLink,
  tableScroll = false,
  hasActions = false,
  switchFn = () => {},
  footerColumns = null,
  isLoading = false,
  emptyDataImage = NoDataPng,
  noPadding = false,
  customMaxHeight = 'calc(100vh - 238px)',
}) {
  const borderColorClass = 'border-r border-borderColor'
  const borderColorClassL = 'border-l border-borderColor'
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState()
  const [rowSelectedRowId, setRowSelectedRowId] = useState('')

  const handlePopoverClick = (event, rowId) => {
    setAnchorEl(event.currentTarget)
    setRowSelectedRowId(rowId)
  }

  const handlePopoverClose = () => setAnchorEl(null)

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <TableContainer
      className={` ${tableScroll ? '' : 'table-container'}  border border-borderColor rounded-[6px] overflow-x-visible`}
      sx={{
        width: '100%',
        transition: '.3s ease',
        maxHeight: heightFit ? '' : customMaxHeight,
        '&::-webkit-scrollbar': {
          display: 'block',
          width: 15,
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: '#e0eeff',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#7F8487',
          borderRadius: '6px',
          transition: 'inherit',
          cursor: 'pointer',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#413F42',
        },
      }}
    >
      <Table
        stickyHeader
        aria-label="sticky table"
        classes={{
          root: {
            border: 'none',
            position: 'relative',
          },
        }}
        sx={{
          tableLayout: 'auto',
        }}
      >
        <TableHead className="table-head w-full bg-white sticky top-0 z-30">
          <TableRow>
            {headColumns?.map(
              (item, index) =>
                item && (
                  <TableCell
                    className={`${index !== headColumns.length - 1 ? borderColorClass : ''} text-center`}
                    colSpan={item.columns ? item.columns.length : 1}
                    rowSpan={item.columns ? 1 : 2}
                    id={item?.key + item?.innerKey + item?.id + item?.objectChild + item?.id}
                    key={item?.key + item?.innerKey + item?.id + item?.objectChild + item?.id}
                  >
                    <div
                      style={{
                        width: item.width,
                        height: item.height || 'unset',
                        whiteSpace: item.width ? 'initial' : 'nowrap',
                      }}
                      className={`flex items-center text-[#1A2024] ${colTextCenter ? 'justify-center' : ''}`}
                    >
                      {item?.title}
                    </div>
                  </TableCell>
                )
            )}
            {hasActions && <TableCell></TableCell>}
          </TableRow>
          <TableRow>
            {headColumns?.map(
              (item, index) =>
                item?.columns &&
                item?.columns.map((element) => (
                  <TableCell
                    className={`${index !== headColumns?.length - 1 ? borderColorClass : ''}`}
                    key={
                      element?.key ??
                      '' + element?.innerKey ??
                      '' + element?.id ??
                      '' + element?.objectChild ??
                      '' + element?.id ??
                      ''
                    }
                  >
                    <div className="text-center">{element?.title}</div>
                  </TableCell>
                ))
            )}
          </TableRow>
        </TableHead>

        <TableBody className="table-body">
          {isLoading ? (
            <TableSkleton headColumns={headColumns} />
          ) : (
            <>
              {bodyColumns?.length > 0 &&
                bodyColumns?.map((row, rowIndex) => (
                  <AnimatePresence key={row?.id || rowIndex + '-row'}>
                    <motion.tr
                      key={row?.id || rowIndex + '-row'}
                      onClick={() =>
                        rowLink && !hasActions
                          ? navigate(`${rowLink}/${row.id || row[sendIdKey]}`)
                          : desiredRowName
                          ? clickHandler(
                              row[desiredRowName],
                              row[desiredRowName2],
                              row[desiredRowName3],
                              row[desiredRowName4],
                              row[desiredRowName5]
                            )
                          : null
                      }
                      className={`MuiTableRow-root MuiTableRow-head cursor-pointer hover:bg-blue-50 duration-200 ${
                        rowIndex % 2 ? 'bg-white' : 'bg-[#F4F6FA]'
                      }`}
                      initial={{ opacity: 0.4 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0.2 }}
                      transition={{ duration: 0.5 }}
                    >
                      {headColumns?.map(
                        (item, colIndex) =>
                          item &&
                          (item.columns ? (
                            item.columns.map((element) => (
                              <TableCell
                                key={row.id + element.title}
                                className={`${colIndex !== headColumns.length - 1 ? borderColorClass : ''} relative`}
                                style={{ padding: noPadding ? 0 : '' }}
                              >
                                <div
                                  className={colTextCenter ? 'text-center' : `w-[${element.width}]`}
                                  style={element?.width && { width: `${element?.width}px` }}
                                >
                                  {element.render
                                    ? Array.isArray(element.key)
                                      ? element.render(
                                          element.key.map((data) => row[data]),
                                          rowIndex
                                        )
                                      : element.render(row?.[item.key]?.[element.key] ?? 0, rowIndex)
                                    : row?.[item.key]?.[element.key] ?? 0}
                                </div>
                              </TableCell>
                            ))
                          ) : (
                            <TableCell
                              className={`${colIndex !== headColumns.length - 1 ? borderColorClass : ''} relative`}
                              style={{ padding: noPadding ? 0 : '' }}
                              key={item?.innerKey ? row.id + item.innerKey : row.id + item.title}
                              width={item?.width}
                            >
                              <div
                                className={colTextCenter ? 'text-center' : `w-[${item.width}]`}
                                style={{ width: item?.width ? `${item?.width}px` : 'auto' }}
                              >
                                {item.key === 'order' ? (
                                  rowIndex + (offset - 1) * limit + 1
                                ) : item.key === 'status' && !item.render ? (
                                  <Switch checked={row?.[item.key]} onClick={(e) => switchFn(row.id, e)} />
                                ) : item.render ? (
                                  Array.isArray(item.key) ? (
                                    item.render(
                                      item.key.map((data) => row[data]),
                                      rowIndex
                                    )
                                  ) : item.objectChild ? (
                                    item.render(row?.[item.key]?.[item.objectChild], rowIndex)
                                  ) : (
                                    item.render(row?.[item.key], rowIndex)
                                  )
                                ) : (
                                  row?.[item?.key] || 0
                                )}
                              </div>
                            </TableCell>
                          ))
                      )}
                      {hasActions && (
                        <TableCell
                          className={`${borderColorClassL} relative`}
                          style={{ padding: noPadding ? 0 : '' }}
                          width={45}
                        >
                          <div className="border rounded-md h-[28px] w-[28px] text-center hover:border-blue-400 duration-300">
                            <div onClick={(e) => handlePopoverClick(e, row.id)} aria-describedby={row.id}>
                              <MoreHorizIcon fontSize="small" />
                            </div>
                            {rowSelectedRowId === row.id && (
                              <div>
                                <Popover
                                  id={id}
                                  open={open}
                                  anchorEl={anchorEl}
                                  onClose={handlePopoverClose}
                                  anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                  }}
                                >
                                  <div className="w-[213px]">
                                    <div
                                      className="flex gap-3 p-3 items-center hover:bg-gray-50 duration-300 cursor-pointer"
                                      onClick={() =>
                                        rowLink ? navigate(`${rowLink}/${row?.id}`) : navigate(`${row?.id}`)
                                      }
                                    >
                                      <div className="w-8 h-8 rounded-md bg-[#E3EFFE] leading-8 text-center">
                                        <EditIcon fontSize="small" htmlColor="#4094F7" />
                                      </div>
                                      <span className="text-sm leading-6">O'zgartirish</span>
                                    </div>
                                    <div
                                      className="flex gap-3 p-3 items-center border-t hover:bg-gray-50 duration-300 cursor-pointer"
                                      onClick={() => {
                                        deleteFunc(row.id)
                                        handlePopoverClose()
                                      }}
                                    >
                                      <div className="w-8 h-8 rounded-md bg-[#FEE8E6] leading-8 text-center">
                                        <ClearIcon fontSize="small" htmlColor="#F76659" />
                                      </div>
                                      <span className="text-sm leading-6">O'chirish</span>
                                    </div>
                                  </div>
                                </Popover>
                              </div>
                            )}
                          </div>
                        </TableCell>
                      )}
                    </motion.tr>
                  </AnimatePresence>
                ))}
            </>
          )}
        </TableBody>
        {
          // footer element
          bodyColumns?.length > 0 && footerColumns?.length > 0 ? (
            <TableFooter className="table-head w-full bg-[#F4F6FA] sticky bottom-0 z-30">
              <TableRow>
                {footerColumns?.map(
                  (item, index) =>
                    item && (
                      <TableCell
                        colSpan={item?.colSpan ? item?.colSpan : item?.columns ? item.columns.length : 1}
                        rowSpan={item?.rowSpan ? item?.rowSpan : item?.columns ? 1 : 2}
                        key={item?.innerKey ? item?.innerKey : item?.key}
                      >
                        <div
                          style={{ width: item.width, whiteSpace: item.width ? 'initial' : 'nowrap' }}
                          className={`flex items-center text-[#1A2024] ${item?.align}`}
                        >
                          {item?.render ? item.render() : item?.title}
                        </div>
                      </TableCell>
                    )
                )}
                {hasActions && <TableCell></TableCell>}
              </TableRow>
              <TableRow>
                {footerColumns?.map(
                  (item, index) =>
                    item?.columns &&
                    item?.columns.map((element) => (
                      <TableCell key={element.key}>
                        <div className="text-center">{element?.render ? element?.render() : item?.title}</div>
                      </TableCell>
                    ))
                )}
              </TableRow>
            </TableFooter>
          ) : (
            ''
          )
        }
      </Table>

      {!isLoading && bodyColumns.length === 0 && (
        <div className="h-full  text-center w-full text-[18px] font-[500] opacity-50 py-10">
          <img className="mx-auto mb-5 pointer-events-none" width={200} src={emptyDataImage} alt="Ma'lumot topilmadi" />
          <p>Malumotlar mavjud emas</p>
        </div>
      )}
    </TableContainer>
  )
}
