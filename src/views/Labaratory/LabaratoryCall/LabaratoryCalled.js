import { BasicLayout, BasicTable, FilterHeader, Header, Input, MuiTabs } from '../../../components'
import SearchIcon from '@mui/icons-material/Search'
import { CustomDatePicker } from '../../../components/CustomDatePicker'
import { hoc } from '../../../utils/hoc'
import { useLabaratoryCalledProps } from './useLabaratoryCalledProps'
import { DatePickerModal } from '../../../components/DatePickerModal/DatePickerModal'

export const LabaratoryCalled = hoc(
  useLabaratoryCalledProps,
  ({
    debouncedEventHandler,
    range,
    setRange,
    canClear,
    setCanClear,
    boxRef,
    activeTab,
    tabElements,
    setActiveTab,
    offset,
    limit,
    headData,
    objects,
    isLoading,
    isOpen,
    handleClose,
    handleCheckDateSubmit,
    handleCalendarModalClose,
    handleCalendarModalOpen,
    date,
    setDate,
  }) => {
    return (
      <>
        <div className="h-screen">
          <Header backLink={-1} />
          <FilterHeader
            leftElements={[
              <Input
                name="search"
                onChange={debouncedEventHandler}
                className="pl-[8px] pr-[8px]"
                height={36}
                addonBefore={<SearchIcon fontSize="medium" className="text-primary" />}
                placeholder="Qidirish..."
              />,
              <CustomDatePicker
                type="range"
                maxDate={new Date()}
                range={range}
                setRange={setRange}
                style={{ width: canClear ? '270px' : '250px' }}
                rightIcon={false}
                months={2}
                direction="column"
                showBtn={false}
                placeholder="Sanani tanlang"
                canClear={canClear}
                setCanClear={setCanClear}
                onRangeFocusChange={() => setCanClear(true)}
                hasQuery
              />,
            ]}
          />
          <div className="h-screen p-4 overflow-x-hidden" ref={boxRef}>
            <BasicLayout header={<MuiTabs activeTab={activeTab} elements={tabElements} setActiveTab={setActiveTab} />}>
              <BasicTable
                tableScroll
                offset={offset}
                limit={limit}
                colTextCenter
                headColumns={headData}
                bodyColumns={objects}
                isLoading={isLoading}
              />
            </BasicLayout>
          </div>
        </div>
        <DatePickerModal
          open={isOpen}
          onClose={handleCalendarModalClose}
          fn={handleCheckDateSubmit}
          range={range}
          setRange={setRange}
          canClear={canClear}
          setCanClear={setCanClear}
          date={date}
          setDate={setDate}
        />
      </>
    )
  }
)
