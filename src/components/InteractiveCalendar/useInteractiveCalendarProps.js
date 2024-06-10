import { useCallback } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  BOSH_TEXNIK_NAZORATCHI_ROLE_ID,
  LOYIHACHI_MUALLIF_ROLE_ID,
  TEXNIK_NAZORATCHI_ROLE_ID,
} from '../../settings/constants'

export const useInteractiveCalendar = ({
  currentYear = 2022,
  setCurrentYear = () => {},
  currentMonth = 12,
  setDay,
  setCurrentMonth = () => {},
  data,
}) => {
  const { roleId } = useSelector((state) => state.auth)

  const today = new Date()
  const yearNow = today.getFullYear()
  const monthNow = today.getMonth()
  const currentWeekDay = today.getDay()

  const [year, setYear] = useState(yearNow)
  const [month, setMonth] = useState(monthNow)

  // const [days, setDays] = useState([])

  const months = [
    {
      value: 0,
      label: 'Yanvar',
    },
    {
      value: 1,
      label: 'Fevral',
    },
    {
      value: 2,
      label: 'Mart',
    },
    {
      value: 3,
      label: 'Aprel',
    },
    {
      value: 4,
      label: 'May',
    },
    {
      value: 5,
      label: 'Iyun',
    },
    {
      value: 6,
      label: 'Iyul',
    },
    {
      value: 7,
      label: 'Avgust',
    },
    {
      value: 8,
      label: 'Sentabr',
    },
    {
      value: 9,
      label: 'Oktabr',
    },
    {
      value: 10,
      label: 'Noyabr',
    },
    {
      value: 11,
      label: 'Dekabr',
    },
  ]

  const daysInMonth = (iMonth, iYear) => 32 - new Date(iYear, iMonth, 32).getDate()
  const firstMonthWeekDay = (year, month) => new Date(year, month, 1).getDay()

  const getYears = (minYear = 2018, maxYear = new Date().getFullYear() + 3) => {
    const years = Array.from(new Array(maxYear - minYear)).map((year) => {
      minYear++
      return { value: minYear, label: minYear }
    })
    return years
  }

  const activeDay = useRef()

  const handleClick = (e) => {
    const element = e.target
    if (element.matches('li')) {
      if (activeDay.current) activeDay.current.style.outline = '1px solid transparent'
      activeDay.current = element
      activeDay.current.style.outline = '1px solid #4094F7'
      activeDay.current.style.outlineOffset = '-2px'

      if (activeDay.current.getAttribute('data-date')) {
        setCurrentYear(new Date(activeDay.current.getAttribute('data-date')).getFullYear())
        setCurrentMonth(new Date(activeDay.current.getAttribute('data-date')).getMonth() + 1)
        setDay(new Date(activeDay.current.getAttribute('data-date')).getDate())
      }
    }
  }

  const renderEvents = (events) => {
    const res = []
    events.forEach((item) => {
      if (!res.includes(item)) res.push(item)
    })
    return res
  }

  const renderCalendar = useCallback(
    (yearNow = new Date().getFullYear(), monthNow = new Date().getFullYear()) => {
      const days = []
      let DAY = 1

      const checkEvent = (data) => {
        return data?.find((item) => {
          const splitted = item?.date?.split('-')

          const incomingDay = +splitted[0]
          const incomingMonth = +splitted[1]
          const incomingYear = +splitted[2]

          const currentDate = new Date(yearNow, monthNow, DAY)

          return (
            currentDate.getDate() === incomingDay &&
            currentDate.getMonth() + 1 === incomingMonth &&
            currentDate.getFullYear() === incomingYear
          )
        })?.events
      }

      for (let i = 0; i < 35; i++) {
        if (i + 1 < firstMonthWeekDay(year, month) || DAY > daysInMonth(month, year)) {
          days.push({ day: '', event: '', key: i + 4, date: '' })
        } else {
          days.push({
            day: DAY,
            events: checkEvent(data),
            key: i + 4,
            date: new Date(year, month, DAY),
          })
          DAY++
        }
      }
      return days
    },
    [data, month, year]
  )

  const days = renderCalendar(year, month)

  useEffect(() => {
    setCurrentMonth(month + 1)
    setCurrentYear(year)
  }, [month, year, setCurrentMonth, setCurrentYear])

  const handleTagColor = (item) => {
    console.log(item)
    if (window.innerWidth < 910) {
      if (item?.toLowerCase()?.includes('inspektor')) {
        return 'bg-[rgb(14,115,246)]'
      } else if (item?.toLowerCase()?.includes('loyihachi') || item?.toLowerCase()?.includes('muallif')) {
        return 'bg-[rgb(162,63,238)]'
      } else if (item?.toLowerCase()?.includes('texnik')) {
        return 'bg-[rgb(248,197,27)]'
      } else if (item?.toLowerCase()?.includes('ichki')) {
        return 'bg-[rgb(26,193,157)]'
      }
    } else {
      if (item?.toLowerCase()?.includes('inspektor')) {
        return 'bg-[rgba(5,83,200,0.16)] text-[#0452C8]'
      } else if (item?.toLowerCase()?.includes('loyihachi') || item?.toLowerCase()?.includes('muallif')) {
        return 'bg-[rgba(196,121,243,0.15)] text-[#A23FEE]'
      } else if (item?.toLowerCase()?.includes('texnik')) {
        return 'bg-[rgba(248,221,78,0.3)] text-[#D29404]'
      } else if (item?.toLowerCase()?.includes('ichki')) {
        return 'bg-[rgba(56,217,185,0.2)] text-[#0D9676]'
      }
    }
  }

  return {
    days,
    year,
    setYear,
    month,
    setMonth,
    months,
    getYears,
    today,
    handleClick,
    renderEvents,
    handleTagColor,
  }
}
