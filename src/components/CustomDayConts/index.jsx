import { Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

export default function CustomDayCont({ checked, days, month, isLoading, activeDate, onChange, empty = false }) {
  return (
    <TableContainer className={`table-container border border-borderColor rounded-[6px]`}>
      <Table aria-label="simple table">
        <TableHead className="table-head w-full bg-white">
          <TableRow>
            <TableCell colSpan={days.length} align="center" className={`text-center`}>
              {month}
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody className="table-body">
          {isLoading ? (
            <AnimatePresence>
              <motion.tr
                className="MuiTableRow-root MuiTableRow-head"
                initial={{ opacity: 0.4 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0.2 }}
                transition={{ duration: 0.5 }}
              >
                {days?.map((item, index2) => (
                  <TableCell key={index2}>
                    <Skeleton height={40} className="w-full" />
                  </TableCell>
                ))}
              </motion.tr>
            </AnimatePresence>
          ) : (
            <AnimatePresence>
              <motion.tr
                //onClick={() => (rowLink ? navigate(`${rowLink}/${row.id || row[sendIdKey]}`) : null)}
                className={`MuiTableRow-root MuiTableRow-head cursor-pointer  duration-200 bg-white`}
                initial={{ opacity: 0.4 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0.2 }}
                transition={{ duration: 0.5 }}
              >
                {days?.map((day, index) => (
                  <TableCell
                    key={index}
                    className="hover:bg-blue-50"
                    onClick={() => day <= new Date().getDate() && onChange(day)}
                  >
                    <div className="text-center flex flex-col gap-2 justify-center align-middle">
                      <h1
                        className={`text-xl h-7 w-7 rounded-full ${
                          activeDate === day
                            ? 'bg-blue-600 text-white'
                            : day > new Date().getDate()
                            ? 'text-gray-300'
                            : ''
                        } `}
                      >
                        {day}
                      </h1>
                      <div className="flex justify-center">
                        <span
                          className={`rounded-full w-2 h-2 
                          ${empty && day <= new Date().getDate() && 'bg-red-600'} 
                          ${!empty && day <= new Date().getDate() && 'bg-green-400'} 
                          ${day > new Date().getDate() && 'bg-gray-300'}`}
                        ></span>
                      </div>
                    </div>
                  </TableCell>
                ))}
              </motion.tr>
            </AnimatePresence>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
