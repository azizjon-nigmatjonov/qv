import { useEffect, useMemo, useState } from 'react'
import { DateRange, Calendar } from 'react-date-range'
import { AnimatePresence, motion } from 'framer-motion'

import { BtnFiled } from '../Buttons/BtnFilled'
import useOutsideClick from '../../hooks/useOutsideClick'
import { ArrowDownIcon, CalendarIcon, CalendarOutlinedIcon } from '../../assets/icons'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'

import 'react-date-range/dist/theme/default.css' // theme css file
import 'react-date-range/dist/styles.css' // main css file
import { CalendarToday } from '@mui/icons-material'
import { ru } from 'date-fns/locale'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { format } from 'date-fns'
import get30DaysPrior from '../../utils/get30DaysPrior'
import dateFormatter from '../../utils/dateFormatter'

export function CustomDatePicker({
  range = {},
  setRange = {},
  minDate = undefined,
  maxDate = undefined,
  type,
  form = 'input',
  date,
  error = false,
  disabled = false,
  setDate,
  position = 'bottom',
  rightIcon = true,
  months = 1,
  showBtn = true,
  direction = 'vertical',
  placeholder = '',
  canClear = false,
  setCanClear = () => {},
  onRangeFocusChange,
  hasQuery = false,
  className = '',
  dateFormat = 'dd.MM.yyy',
  showMonthYearPicker = false,
  ...restProps
}) {
  const [searchParams, setSearchParams] = useSearchParams()
  const searchParamsMemo = useMemo(() => Object.fromEntries([...searchParams]), [searchParams])
  const [value, setValue] = useState({
    startDate:
      hasQuery && searchParamsMemo.startDate
        ? new Date(searchParamsMemo.startDate)
        : new Date(new Date().setMonth(new Date().getMonth() - 1)),
    endDate: hasQuery && searchParamsMemo.endDate ? new Date(searchParamsMemo.endDate) : new Date(),
  })
  const [defaultPlaceholder, setDefaultPlaceholder] = useState(placeholder)
  useEffect(() => {
    if (searchParamsMemo.startDate && searchParamsMemo.endDate && hasQuery) {
      setCanClear(true)
      setDefaultPlaceholder(false)
      setRange(() => [
        {
          startDate: new Date(searchParamsMemo.startDate),
          endDate: new Date(searchParamsMemo.endDate),
          key: 'selection',
        },
      ])
    }
  }, [searchParamsMemo, setCanClear, setRange, hasQuery])

  const [isOpen, setIsOpen] = useState(false)

  const handleClose = () => setIsOpen(false)
  const handleToggle = () => setIsOpen((p) => !p)

  const rangeInputRef = useOutsideClick(handleClose)

  const formatDate = (date) =>
    `${('0' + date.getDate()).slice(-2)}.${('0' + (date.getMonth() + 1)).slice(-2)}.${date.getFullYear()}`

  const startDate = range[0]?.startDate
  const endDate = range[0]?.endDate

  useEffect(() => {
    if (new Date(startDate)?.getTime() !== new Date(endDate)?.getTime()) handleClose()
  }, [endDate, startDate])

  return (
    <div ref={rangeInputRef} className={`relative h-10 overflow-visible z-50 ${className}`} {...restProps}>
      <span className="absolute top-1.5 right-2" onClick={handleToggle}>
        {rightIcon ? <CalendarIcon /> : <ArrowDownIcon />}
      </span>
      {!rightIcon && (
        <span className="absolute top-1.5 left-4">
          <CalendarToday color="primary" />
        </span>
      )}
      {form === 'input' && (
        <div
          onClick={() => !disabled && handleToggle()}
          disabled
          type="button"
          className={`absolute bg-transparent top-0 left-0
        w-full h-full border transition-all duration-500 rounded-md ${
          !rightIcon ? 'pl-12 pr-6' : 'px-4'
        } py-2 text-[#303940] text-sm leading-6 ${
            error ? 'border-red-500' : 'hover:border-primary focus-within:border-primary'
          } ${disabled ? 'hover:border-[#e5e7eb] hover:cursor-not-allowed focus-within:border-[#e5e7eb]' : ''} ${
            canClear ? 'pr-12' : ''
          }`}
        >
          {type === 'range'
            ? defaultPlaceholder
              ? defaultPlaceholder
              : `${formatDate(new Date(value?.startDate))} - ${formatDate(new Date(value?.endDate))}`
            : formatDate(new Date(date))}
          {type === 'range' && canClear && (
            <button
              className="absolute right-7 z-10"
              onClick={() => {
                setRange([
                  {
                    key: 'selection',
                  },
                ])
                setValue({})
                setDefaultPlaceholder('Sanani tanlang')
                setCanClear(false)
                if (hasQuery) {
                  let { startDate, endDate, ...params } = searchParamsMemo
                  setSearchParams(params)
                }
              }}
            >
              <CancelOutlinedIcon color="disabled" />
            </button>
          )}
        </div>
      )}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className={`absolute rounded-md bg-white shadow-md ${form === 'modal' ? 'right-0' : ''} ${
              position === 'top' ? '-top-[310px]' : 'top-10'
            } z-10`}
          >
            {type === 'range' ? (
              <DateRange
                minDate={minDate}
                maxDate={maxDate}
                editableDateInputs={false}
                onChange={(item) => {
                  setDefaultPlaceholder(
                    `${formatDate(new Date(item.selection?.startDate))} - ${formatDate(
                      new Date(item.selection?.endDate)
                    )}`
                  )
                  setRange([item.selection])
                  setValue(item.selection)
                  if (hasQuery) {
                    setSearchParams({
                      ...searchParamsMemo,
                      startDate: format(item.selection.startDate, 'yyyy-MM-dd'),
                      endDate: format(item.selection.endDate, 'yyyy-MM-dd'),
                    })
                  }
                }}
                moveRangeOnFirstSelection={false}
                onRangeFocusChange={onRangeFocusChange}
                ranges={range}
                months={months}
                direction={direction}
                locale={ru}
                showDateDisplay={false}
              />
            ) : (
              <Calendar
                dragSelectionEnabled={false}
                showDateDisplay={false}
                showPreview={false}
                minDate={minDate}
                maxDate={maxDate}
                onChange={(item) => {
                  setDate(item)
                  handleClose()
                }}
                date={date || new Date()}
                dateDisplayFormat={dateFormat}
                showMonthAndYearPickers={showMonthYearPicker}
                locale={ru}
                // preview={}
              />
            )}
            {type === 'range' && showBtn && (
              <div className="border-t p-2">
                <BtnFiled
                  className="w-full"
                  onClick={() => {
                    setValue(range[0])
                    handleClose()
                  }}
                >
                  Tanlash
                </BtnFiled>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
