import { useState } from 'react'
import { Calendar } from 'react-date-range'
import { AnimatePresence, motion } from 'framer-motion'
import useOutsideClick from '../../hooks/useOutsideClick'

const CustomDayPicker = ({
  position = 'bottom',
  disabled,
  minDate = undefined,
  maxDate = undefined,
  error,
  date,
  setDate,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleClose = () => setIsOpen(false)
  const handleToggle = () => setIsOpen((p) => !p)

  const rangeInputRef = useOutsideClick(handleClose)

  const formatDate = (date) =>
    `${('0' + date.getDate()).slice(-2)}.${('0' + (date.getMonth() + 1)).slice(-2)}.${date.getFullYear()}`

  return (
    <div ref={rangeInputRef} className="relative h-10 overflow-visible">
      <div
        onClick={() => !disabled && handleToggle()}
        disabled
        type="button"
        className={`absolute bg-transparent top-0 left-0
        w-full h-full border transition-all duration-500 rounded-md py-2 px-4 text-[#303940] text-sm leading-6 ${
          error ? 'border-red-500' : 'hover:border-primary focus-within:border-primary'
        } ${disabled ? 'hover:border-[#e5e7eb] hover:cursor-not-allowed focus-within:border-[#e5e7eb]' : ''}`}
      >
        {formatDate(new Date(date))}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className={`absolute rounded-md bg-white shadow-md ${position === 'top' ? '-top-[310px]' : 'top-10'} z-10`}
          >
            <Calendar
              showPreview={false}
              dragSelectionEnabled={false}
              minDate={minDate}
              maxDate={maxDate}
              onChange={(item) => {
                setDate(item)
                handleClose()
              }}
              date={date}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CustomDayPicker
