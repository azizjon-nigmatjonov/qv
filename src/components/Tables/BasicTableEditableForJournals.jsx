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
import { useCallback, useState } from 'react'
import { useFieldArray } from 'react-hook-form'
import SignComponent from '../SignModal'
import { BtnFiled } from '../Buttons/BtnFilled'
import { Add } from '@mui/icons-material'
import CustomMuiDatePicker from '../CustomMuiDatePicker'
import { Input } from '../Input'
import { format } from 'date-fns'
import dateFormatter from '../../utils/dateFormatter'
import BodyCellForJournal from './BodyCellForJournal'

export function BasicTableEditableForJournals({
  waitForAdding,
  control,
  register,
  setValue,
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
  tableScroll = true,
  onAddAndSubmit,
  switchFn = () => {},
  isLoading = false,
  tableName = '',
}) {
  const borderColorClass = 'border-r border-borderColor'
  const borderColorClassL = 'border-l border-borderColor'
  // const { fields, append } = useFieldArray({
  //   control,
  //   name: `${tableName}.journalBody`,
  // })
  const handleAppend = useCallback(() => {
    // append({ id: fields.length + 1 })
  }, [])

  function colSpanCounter(item) {
    let counter = 0
    if (item.columns?.length > 0) {
      item.columns.forEach((col) => {
        if (col?.children?.length > 0) {
          counter += col.children.length
        } else {
          counter += 1
        }
      })
    } else {
      counter = 1
    }
    return counter
  }
  return (
    <>
      <TableContainer
        className={`${heightFit ? '' : 'h-4/5'} ${
          tableScroll ? '' : 'table-container'
        } border border-borderColor rounded-[6px]`}
        sx={{
          width: '100%',
          transition: '.3s ease',
          maxHeight: heightFit ? '' : 'calc(100vh - 238px)',
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
            },
          }}
          sx={{
            tableLayout: 'auto',
          }}
        >
          <TableHead className="table-head w-full bg-white relative z-30">
            <TableRow>
              {headColumns?.length > 0 &&
                headColumns?.map((item, index) => (
                  <TableCell
                    className={`${index !== headColumns.length - 1 ? borderColorClass : ''} text-center`}
                    colSpan={colSpanCounter(item)}
                    rowSpan={item.columns ? 1 : 3}
                    key={item.key}
                    align={item?.align || 'left'}
                  >
                    <div
                      style={{ width: item.width, whiteSpace: item.width ? 'initial' : 'nowrap' }}
                      className={`flex items-center text-[#1A2024] ${
                        colTextCenter || item?.align === 'center' ? 'justify-center' : ''
                      }`}
                    >
                      {item.title}
                    </div>
                  </TableCell>
                ))}
              {hasActions && <TableCell></TableCell>}
            </TableRow>
            <TableRow>
              {headColumns?.length > 0 &&
                headColumns?.map(
                  (item, index) =>
                    item.columns &&
                    item.columns.map((element) => (
                      <TableCell
                        colSpan={element.children?.length || 1}
                        rowSpan={element.children?.length > 0 ? 1 : 2}
                        className={index !== headColumns.length - 1 ? borderColorClass : ''}
                        key={item.key + element.key}
                        align={item?.align || 'left'}
                      >
                        <div
                          style={{ width: element.width, whiteSpace: element.width ? 'initial' : 'nowrap' }}
                          className={`flex items-center text-[#1A2024] ${
                            colTextCenter || item?.align === 'center' ? 'justify-center' : ''
                          }`}
                        >
                          {element.title}
                        </div>
                      </TableCell>
                    ))
                )}
            </TableRow>
            <TableRow>
              {headColumns?.length > 0 &&
                headColumns?.map(
                  (item, index) =>
                    item.columns &&
                    item.columns.map(
                      (element) =>
                        element.children &&
                        element.children.map((child) => (
                          <TableCell
                            align={item?.align || 'left'}
                            className={index !== headColumns.length - 1 ? borderColorClass : ''}
                            key={item.key + child.key + element.key}
                          >
                            <div
                              style={{ width: child.width, whiteSpace: child.width ? 'initial' : 'nowrap' }}
                              className={`flex items-center text-[#1A2024] ${
                                colTextCenter || item?.align === 'center' ? 'justify-center' : ''
                              }`}
                            >
                              {child.title}
                            </div>
                          </TableCell>
                        ))
                    )
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
                          item?.columns ? (
                            item?.columns?.map((element) => (
                              <TableCell
                                key={index + element.title}
                                className={index2 !== headColumns?.length - 1 ? borderColorClass : ''}
                              >
                                <Skeleton height={40} className="w-full" />
                              </TableCell>
                            ))
                          ) : (
                            <TableCell
                              className={index2 !== headColumns?.length - 1 ? borderColorClass : ''}
                              key={index + item.title}
                            >
                              <Skeleton height={40} className="w-full" />
                            </TableCell>
                          )
                        )}
                      </motion.tr>
                    </AnimatePresence>
                  ))
              : bodyColumns?.length > 0 &&
                bodyColumns?.map((row, rowIndex) => (
                  <AnimatePresence key={row.id}>
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
                      {headColumns?.length > 0 &&
                        headColumns?.map((item, colIndex) =>
                          item?.columns ? (
                            item?.columns?.map((element) =>
                              element?.children?.length > 0 ? (
                                element?.children?.map((child) => (
                                  <BodyCellForJournal
                                    row={row}
                                    item={item}
                                    element={element}
                                    child={child}
                                    key={item?.key + child?.key + element?.key}
                                    colIndex={colIndex}
                                    headColumns={headColumns}
                                    tableName={tableName}
                                    rowIndex={rowIndex}
                                    register={register}
                                    control={control}
                                    setValue={setValue}
                                  />
                                ))
                              ) : (
                                <BodyCellForJournal
                                  row={row}
                                  item={item}
                                  element={element}
                                  key={item.key + element.key}
                                  colIndex={colIndex}
                                  headColumns={headColumns}
                                  tableName={tableName}
                                  rowIndex={rowIndex}
                                  register={register}
                                  control={control}
                                  setValue={setValue}
                                />
                              )
                            )
                          ) : (
                            <BodyCellForJournal
                              row={row}
                              item={item}
                              key={item.key}
                              colIndex={colIndex}
                              headColumns={headColumns}
                              tableName={tableName}
                              rowIndex={rowIndex}
                              register={register}
                              control={control}
                              setValue={setValue}
                            />
                          )
                        )}
                    </motion.tr>
                  </AnimatePresence>
                ))}
          </TableBody>
        </Table>

        {/* {!isLoading && bodyColumns.length === 0 && (
        <div className="h-full  text-center w-full text-[18px] font-[500] opacity-50 py-10">
          <img className="mx-auto mb-5 pointer-events-none" width={200} src={NoDataPng} alt="Ma'lumot topilmadi" />
          <p>Malumotlar mavjud emas</p>
        </div>
      )} */}
      </TableContainer>
      <div className="flex justify-end items-center py-4">
        <BtnFiled
          leftIcon={<Add />}
          type="submit"
          onClick={onAddAndSubmit}
          isLoading={waitForAdding}
          disabled={waitForAdding}
        >
          Qo'shish
        </BtnFiled>
      </div>
    </>
  )
}
