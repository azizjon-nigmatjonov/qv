import { Header, ObjectMonitoring } from '../../../components'
import { InteractiveCalendar } from '../../../components/InteractiveCalendar'
import { hoc } from '../../../utils/hoc'
import { useUserDashboardProps } from './useUserDashboardProps'

export const UsersDashboard = hoc(
  useUserDashboardProps,
  ({
    setYear,
    setMonth,
    setDay,
    month,
    year,
    data,
    isDataLoading,
    objects,
    isObjectsLoading,
    objectsDate,
    isForeman,
    taskId,
    eventTypes,
    pathname,
  }) => {
    return (
      <div>
        <Header
          title={isForeman ? `Obyekt: №${taskId}` : pathname.includes('inspectors') ? '' : 'Bosh sahifa'}
          backLink={pathname.includes('inspectors') ? -1 : false}
        />
        <div className="sidebar-header-calc">
          <div className="gap-x-4 desktop:items-start flex desktop:flex-row mobile:flex-col mobile:items-stretch mobile:gap-y-6">
            <InteractiveCalendar
              setCurrentYear={setYear}
              setCurrentMonth={setMonth}
              currentMonth={month}
              currentYear={year}
              setDay={setDay}
              data={data}
              isLoading={isDataLoading}
              eventTypes={isForeman ? eventTypes : ''}
            />
            <ObjectMonitoring
              className="mobile:max-w-full tablet:max-w-[480px]"
              isLoading={isObjectsLoading}
              objects={objects}
              date={objectsDate}
              isForeman={isForeman}
            />
          </div>
        </div>
      </div>
    )
  }
)
