import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { FilterHeader } from '../../../../components'
import { CustomDatePicker } from '../../../../components/CustomDatePicker'
import { useQuery } from '../../../../hooks/useQuery'
import { useDashboardBuhgalter } from '../../../../services/dashboard'
import { BUHGALTERIYA_BOSH_ROLE_ID, REPUBLIC_APPARAT_ROLE_ID } from '../../../../settings/constants'
import get30DaysPrior from '../../../../utils/get30DaysPrior'
import DashBoardBuxMainContext from './context'
import UI from './UI'

export default function DashboardBuxgalterMain() {
  const { t } = useTranslation('common')
  const query = useQuery()
  const [canClear, setCanClear] = useState(false)
  const { regionId, roleId } = useSelector((state) => state.auth)
  const [range, setRange] = useState([
    {
      startDate: get30DaysPrior(),
      endDate: new Date(),
      key: 'selection',
    },
  ])
  const labHeadData = [
    {
      title: '№',
      key: 'order',
    },
    {
      title: t('contract.number'),
      key: 'contract_number',
    },
    {
      title: t('object'),
      key: 'object_name',
    },
    {
      title: t('customer'),
      key: 'organization_name',
    },
  ]
  const objectHeadData = [
    {
      title: '№',
      key: 'order',
    },
    {
      title: t('object'),
      key: 'name',
    },
    {
      title: t('cost'),
      key: 'price',
    },
    {
      title: t('Invoys summasi'),
      key: 'paid',
    },
    {
      title: t('start_date'),
      key: 'start_date',
      render: (value) => format(new Date(value), 'dd.MM.yyyy'),
    },
  ]

  const { getDashboardDataQuery } = useDashboardBuhgalter({
    list_by: roleId === BUHGALTERIYA_BOSH_ROLE_ID || roleId === REPUBLIC_APPARAT_ROLE_ID ? 'republic' : 'region',
    from_date:  format(range[0].startDate || get30DaysPrior(), 'yyyy-MM-dd'),
    to_date: format(range[0].endDate || new Date(), 'yyyy-MM-dd'),
    list_by_value: regionId,
    getAnalyticsParams: {
      enabled: !!range[0].startDate && !!range[0].endDate,
    },
  })
  console.log('getDashboardDataQuery 123', getDashboardDataQuery);

  useEffect(() => {
    if (!!query.get('startDate') && !!query.get('endDate')) {
      setRange([
        {
          startDate: new Date(query.get('startDate')),
          endDate: new Date(query.get('endDate')),
          key: 'selection',
        },
      ])
    }
  }, [])
  return (
    <DashBoardBuxMainContext.Provider
      value={{
        labHeadData,
        objectHeadData,
        labData: getDashboardDataQuery?.data?.data?.data?.Contracts,
        objectData: getDashboardDataQuery?.data?.data?.data?.Objects,
        barChartData: getDashboardDataQuery?.data?.data?.data?.Data,
      }}
    >
      <div>
        <FilterHeader
          leftElements={[
            <CustomDatePicker
              type="range"
              maxDate={new Date()}
              range={range}
              setRange={setRange}
              style={{ width: canClear ? '270px' : '250px' }}
              rightIcon={false}
              months={2}
              direction="column"
              hasQuery={true}
              showBtn={false}
              placeholder="Sanani tanlang"
              canClear={canClear}
              setCanClear={setCanClear}
              onRangeFocusChange={() => setCanClear(true)}
            />,
          ]}
        />
        <UI />
      </div>
    </DashBoardBuxMainContext.Provider>
  )
}
