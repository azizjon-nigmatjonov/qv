import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { useNavigate } from 'react-router'
import Skeleton from '@mui/material/Skeleton'
import { AnimatePresence, motion } from 'framer-motion'
import Switch from '../Switch'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import NoDataPng from '../../assets/images/no-data.png'
import { Popover } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import ClearIcon from '@mui/icons-material/Clear'
import { useState } from 'react'

export function BasicTableEditable({
  headColumns = [],
  offset = 1,
  limit = 10,
  bodyColumns = [],
  sendIdKey,
  heightFit = false,
  colTextCenter = false,
  deleteFunc,
  rowLink,
  hasActions = false,
  switchFn = () => {},
  isLoading = false,
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
    <TableContainer className={`${heightFit ? '' : 'h-4/5'} table-container border border-borderColor rounded-[6px]`}>
      <Table aria-label="simple table">
        <TableHead className="table-head w-full bg-white">
          <TableRow>
            {headColumns?.map((item, index) => (
              <TableCell
                className={`${index !== headColumns.length - 1 ? borderColorClass : ''} text-center`}
                colSpan={item.columns ? item.columns.length : 1}
                rowSpan={item.columns ? 1 : 2}
                key={item.key}
              >
                <div
                  style={{ width: item.width, whiteSpace: item.width ? 'initial' : 'nowrap' }}
                  className={`flex items-center text-[#1A2024] ${colTextCenter ? 'justify-center' : ''}`}
                >
                  {item.title}
                </div>
              </TableCell>
            ))}
            {hasActions && <TableCell></TableCell>}
          </TableRow>
          <TableRow>
            {headColumns?.map(
              (item, index) =>
                item.columns &&
                item.columns.map((element) => (
                  <TableCell className={index !== headColumns.length - 1 ? borderColorClass : ''} key={element.key}>
                    {element.title}
                  </TableCell>
                ))
            )}
          </TableRow>
        </TableHead>

        <TableBody className="table-body">
          {isLoading
            ? Array(10)
                .fill()
                .map((_, index) => (
                  <AnimatePresence key={index + 'skeleton'}>
                    <motion.tr
                      className="MuiTableRow-root MuiTableRow-head"
                      initial={{ opacity: 0.4 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0.2 }}
                      transition={{ duration: 0.5 }}
                    >
                      {headColumns?.map((item, index2) =>
                        item.columns ? (
                          item.columns.map((element) => (
                            <TableCell
                              key={index + element.title}
                              className={index2 !== headColumns.length - 1 ? borderColorClass : ''}
                            >
                              <Skeleton height={40} className="w-full" />
                            </TableCell>
                          ))
                        ) : (
                          <TableCell
                            className={index2 !== headColumns.length - 1 ? borderColorClass : ''}
                            key={index + item.title}
                          >
                            <Skeleton height={40} className="w-full" />
                          </TableCell>
                        )
                      )}
                    </motion.tr>
                  </AnimatePresence>
                ))
            : bodyColumns?.map((row, rowIndex) => (
                <AnimatePresence key={rowIndex + '-row'}>
                  <motion.tr
                    //onClick={() => (rowLink ? navigate(`${rowLink}/${row.id || row[sendIdKey]}`) : null)}
                    className={`MuiTableRow-root MuiTableRow-head cursor-pointer hover:bg-blue-50 duration-200 ${
                      rowIndex % 2 ? 'bg-white' : 'bg-[#F4F6FA]'
                    }`}
                    initial={{ opacity: 0.4 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0.2 }}
                    transition={{ duration: 0.5 }}
                  >
                    {headColumns?.map((item, colIndex) =>
                      item.columns ? (
                        item.columns.map((element) => (
                          <TableCell
                            key={row.id + element.title}
                            className={`${colIndex !== headColumns.length - 1 ? borderColorClass : ''}`}
                          >
                            <div className="text-center">
                              {element.render
                                ? Array.isArray(element.key)
                                  ? element.render(
                                      element.key.map((data) => {
                                        return row[data]
                                      }),
                                      rowIndex
                                    )
                                  : element.render(row[item.key][element.key] ?? 0)
                                : row[item.key][element.key] ?? 0}
                            </div>
                          </TableCell>
                        ))
                      ) : (
                        <TableCell
                          className={colIndex !== headColumns.length - 1 ? borderColorClass : ''}
                          key={row.id + item.title}
                        >
                          {item.key === 'order' ? (
                            rowIndex + (offset - 1) * limit + 1
                          ) : item.key === 'status' ? (
                            <Switch checked={row[item.key]} onClick={(e) => switchFn(row.id, e)} />
                          ) : item.render ? (
                            Array.isArray(item.key) ? (
                              item.render(
                                item.key.map((data) => row[data]),
                                rowIndex
                              )
                            ) : (
                              item.render(row[item.key], rowIndex)
                            )
                          ) : (
                            row[item.key]
                          )}
                        </TableCell>
                      )
                    )}
                  </motion.tr>
                </AnimatePresence>
              ))}
        </TableBody>
      </Table>
      {!isLoading && bodyColumns.length === 0 && (
        <div className="h-full  text-center w-full text-[18px] font-[500] opacity-50 py-10">
          <img className="mx-auto mb-5 pointer-events-none" width={200} src={NoDataPng} alt="Ma'lumot topilmadi" />
          <p>Malumotlar mavjud emas</p>
        </div>
      )}
    </TableContainer>
  )
}
