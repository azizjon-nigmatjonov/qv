import { subHours, startOfMonth } from 'date-fns'
import {
  MonthlyBody,
  MonthlyDay,
  MonthlyCalendar,
  MonthlyNav,
  DefaultMonthlyEventItem,
} from '@zach.codes/react-calendar'
import { useState } from 'react'
import { Tag } from '..'
import DarkSelect from '../DarkSelect/DarkSelect'

export function WeekTable() {
  let [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()))

  return (
    <div className="p-4">
      <div className="week-calendar">
        <MonthlyCalendar currentMonth={currentMonth} onCurrentMonthChange={(date) => setCurrentMonth(date)}>
          {/* <MonthlyNav /> */}
          <MonthlyBody
            events={[
              {
                title: (
                  <div>
                    <Tag value="3" color="blue" />
                  </div>
                ),
                date: subHours(new Date(), 2),
              },
              {
                title: (
                  <div>
                    <Tag value="3" color="blue" />
                  </div>
                ),
                date: subHours(new Date(), 1),
              },
            ]}
          >
            <MonthlyDay
              renderDay={(data) =>
                data.map((item, index) => <DefaultMonthlyEventItem key={index} title={item.title} />)
              }
            />
          </MonthlyBody>
        </MonthlyCalendar>
      </div>
    </div>
  )
}
