import { hoc } from '../../utils/hoc'
import DarkSelect from '../DarkSelect/DarkSelect'
import { Tag } from '../Tag'
import { CalendarBody, CalendarItem, Spinner, WeekItem } from './interactiveCalendar.style'
import { useInteractiveCalendar } from './useInteractiveCalendarProps'
import { v4 } from 'uuid'

export const InteractiveCalendar = hoc(
  useInteractiveCalendar,
  ({
    days,
    months,
    month,
    setMonth,
    year,
    setYear,
    getYears,
    today,
    handleClick,
    isLoading,
    handleTagColor = () => {},
    eventTypes = [],
    renderEvents = () => {},
  }) => {
    return (
      <div className="p-4 grow bg-[#fff] rounded-lg relative">
        <div className="flex gap-x-3 mb-8">
          <DarkSelect options={getYears()} value={year} setValue={setYear} />
          <DarkSelect options={months} value={month} setValue={setMonth} />
        </div>
        <header>
          <ol className="flex mobile:mb-2 tablet:mb-5">
            <WeekItem className="grow text-center font-semibold text-[#9AA6AC] mobile:text-sm tablet:text-lg">
              Du
            </WeekItem>
            <WeekItem className="grow text-center font-semibold text-[#9AA6AC] mobile:text-sm tablet:text-lg">
              Se
            </WeekItem>
            <WeekItem className="grow text-center font-semibold text-[#9AA6AC] mobile:text-sm tablet:text-lg">
              Cho
            </WeekItem>
            <WeekItem className="grow text-center font-semibold text-[#9AA6AC] mobile:text-sm tablet:text-lg">
              Pay
            </WeekItem>
            <WeekItem className="grow text-center font-semibold text-[#9AA6AC] mobile:text-sm tablet:text-lg">
              Ju
            </WeekItem>
            <WeekItem className="grow text-center font-semibold text-[#F76659] mobile:text-sm tablet:text-lg">
              Sha
            </WeekItem>
            <WeekItem className="grow text-center font-semibold text-[#F76659] mobile:text-sm tablet:text-lg">
              Yak
            </WeekItem>
          </ol>
        </header>
        <main>
          <CalendarBody
            className="grid grid-cols-7 grid-rows-5 border rounded-[12px] overflow-hidden"
            onClick={handleClick}
          >
            {days.map((day) => (
              <CalendarItem
                key={day.key}
                className={`${
                  Array.isArray(day?.events) ? 'gap-y-1' : 'gap-y-2'
                } flex flex-col items-start tablet:h-[137px] p-3 cursor-pointer mobile:h-[67px]`}
                today={today}
                date={day?.date}
                data-date={day?.date}
              >
                <span
                  className={`${
                    day?.date && (day?.date?.getDay() === 6 || day.date?.getDay() === 0) && 'text-[#FA8D7F]'
                  } tablet:t ext-base mobile:text-sm pointer-events-none`}
                >
                  {day?.day}
                </span>
                {day?.events ? (
                  Array.isArray(day?.events) ? (
                    <div className="mobile:flex mobile:gap-x-1 tablet:flex tablet:flex-col tablet:gap-y-1">
                      {renderEvents(day?.events).map((event) => (
                        <>
                          <Tag
                            key={v4()}
                            className={`pointer-events-none mobile:hidden tablet:visible mobile:text-xs tablet:text-xs tablet:px-1 tablet:py-1 mobile:px-1 tablet:w-auto tablet:flex tablet:justify-center tablet:items-center tablet:h-[20px] rounded-full  ${handleTagColor(
                              event
                            )}`}
                            value={event}
                          />
                          <span
                            key={v4()}
                            className={`mobile:visible tablet:hidden mobile:w-[6px] mobile:h-[6px] block shrink-0 ${handleTagColor(
                              event
                            )} block rounded-full`}
                          ></span>
                        </>
                      ))}
                    </div>
                  ) : (
                    <Tag
                      key={v4()}
                      className="pointer-events-none mobile:text-xs tablet:text-[14px] tablet:px-4 tablet:py-1 mobile:px-2"
                      value={day?.events}
                      rounded="big"
                      color="blue"
                    />
                  )
                ) : (
                  ''
                )}
              </CalendarItem>
            ))}
          </CalendarBody>
          <div className="grid grid-cols-2 grid-rows-2 gap-y-6 mt-4 mobile:visible tablet:invisible">
            {eventTypes?.length
              ? eventTypes.map((eventType) => (
                  <div className="flex gap-x-3 items-center" key={v4()}>
                    <span
                      className={`block w-[12px] h-[12px] rounded-full shrink-0`}
                      style={{ backgroundColor: `${eventType.color}` }}
                    ></span>
                    <span className="grow">{eventType.value}</span>
                  </div>
                ))
              : ''}
          </div>
        </main>
        {isLoading && (
          <div
            className="absolute w-full h-full top-0 left-0 bg-[rgba(255,255,255,0.5)] flex items-center justify-center"
            style={{ backdropFilter: 'blur(2px)' }}
          >
            <Spinner className="w-[80px] h-[80px] block rounded-full border-8 border-t-[transparent] border-[#9AA6AC]"></Spinner>
          </div>
        )}
      </div>
    )
  }
)
