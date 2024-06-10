import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useOutsideClick from '../../hooks/useOutsideClick'

export default function MonthPicker({ date, setDate }) {
  const [open, setOpen] = useState(false)
  const [month, setMonth] = useState(new Date().getFullYear() + 1)
  const [year, setYear] = useState(new Date().getFullYear())

  const monthOptions = [
    { value: 1, label: 'Yanvar' },
    { value: 2, label: 'Fevral' },
    { value: 3, label: 'Mart' },
    { value: 4, label: 'Aprel' },
    { value: 5, label: 'May' },
    { value: 6, label: 'Iyun' },
    { value: 7, label: 'Iyul' },
    { value: 8, label: 'Avgust' },
    { value: 9, label: 'Sentyabr' },
    { value: 10, label: 'Oktyabr' },
    { value: 11, label: 'Noyabr' },
    { value: 12, label: 'Dekabr' },
  ]

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const pickerRef = useOutsideClick(handleClose)

  return (
    <div className="relative" ref={pickerRef}>
      <div className="border rounded-md hover:border-blue-400 py-2 px-4 cursor-pointer" onClick={handleOpen}>
        <CalendarTodayIcon style={{ color: '#007AFF', fontSize: '16px', marginBottom: '4px' }} />
        <span className="ml-2">{`${monthOptions.find((i) => i.value === date.month)['label']} ${date.year}`}</span>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-md border flex flex-col shadow-md absolute w-[400px]"
          >
            <div className="w-full relative flex justify-between p-2 border-b">
              <span
                className="cursor-pointer"
                onClick={() => {
                  if (year > new Date().getFullYear() - 5) {
                    setYear((p) => p - 1)
                  }
                }}
              >
                <ChevronLeftIcon
                  style={{
                    color: year <= new Date().getFullYear() - 5 ? '#d0d0d0' : '',
                  }}
                />
              </span>
              <span className="font-medium">{year}</span>
              <span
                className="cursor-pointer"
                onClick={() => {
                  if (year < new Date().getFullYear()) {
                    setYear((p) => p + 1)
                  }
                }}
              >
                <ChevronRightIcon
                  style={{
                    color: year === new Date().getFullYear() ? '#d0d0d0' : '',
                  }}
                />
              </span>
            </div>
            <div className="grid grid-cols-12 gap-1 p-2 text-center">
              {monthOptions.map((item) => (
                <div
                  onClick={() => {
                    if (new Date().getFullYear() === year) {
                      if (item.value - 1 <= new Date().getMonth()) {
                        setMonth(item.value)
                      }
                    } else {
                      setMonth(item.value)
                    }
                  }}
                  key={item.value}
                  className={`col-span-3 cursor-pointer p-2 rounded-md hover:bg-gray-100 ${
                    month === item.value ? 'bg-gray-200 hover:bg-gray-200 font-medium' : ''
                  } ${
                    item.value - 1 > new Date().getMonth() && new Date().getFullYear() === year
                      ? 'bg-gray-200 hover:bg-gray-200 opacity-50 cursor-default'
                      : ''
                  }`}
                >
                  {item.label}
                </div>
              ))}
            </div>
            <div className="border-t flex justify-end p-2">
              <div
                className="py-2 duration-300 w-full text-center cursor-pointer rounded-md bg-blue-500 font-medium text-white text-sm hover:bg-blue-400"
                onClick={() => {
                  handleClose()
                  setDate({ year, month })
                }}
              >
                Tanlash
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
