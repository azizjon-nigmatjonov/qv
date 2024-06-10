import { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import SearchIcon from '@mui/icons-material/Search'
import {
  BOSH_LABARATORIYA_ROLE_ID,
  BUHGALTERIYA_BOSH_ROLE_ID,
  BUHGALTERIYA_YETAKCHI_ROLE_ID,
  LABARATORIYA_BOSHLIGI_ROLE_ID,
  YETAKCHI_LABARATORIYA_ROLE_ID,
} from '../../../../settings/constants'
import { format } from 'date-fns'
import { useTranslation } from 'react-i18next'
import { useQuery } from '../../../../hooks/useQuery'
import get30DaysPrior from '../../../../utils/get30DaysPrior'
import { useContract } from '../../../../services/labaratory/useContract'
import priceFormatter from '../../../../utils/priceFormatter'
import { CustomDatePicker } from '../../../../components/CustomDatePicker'
import { BasicLayout, BasicTable, FilterHeader, Header, Input, Pagination, Tag } from '../../../../components'
import dateFormatter from '../../../../utils/dateFormatter'

export default function ArchiveListPage() {
  const query = useQuery()
  const { roleId, regionId } = useSelector((state) => state.auth)
  const [search, setSearch] = useState(query.get('search') || '')
  const [offset, setOffset] = useState(+query.get('offset') || 1)
  const [limit, setLimit] = useState(+query.get('limit') || 10)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [canClear, setCanClear] = useState(false)
  const { t } = useTranslation('common')
  const [range, setRange] = useState([
    {
      startDate: get30DaysPrior(),
      endDate: new Date(),
      key: 'selection',
    },
  ])
  const { archiveContractsQuery } = useContract({
    limit,
    offset,
    contract_number: search,
    role_id:
      roleId !== LABARATORIYA_BOSHLIGI_ROLE_ID &&
      roleId !== YETAKCHI_LABARATORIYA_ROLE_ID &&
      roleId !== BOSH_LABARATORIYA_ROLE_ID
        ? roleId
        : undefined,
    region_id: regionId,
    start_date: dateFormatter(format, range?.[0]?.startDate, 'yyyy-MM-dd'),
    end_date: dateFormatter(format, range?.[0]?.endDate, 'yyyy-MM-dd'),

    getArchiveContractsParams: {
      enabled: true && pathname.includes('archive'),
    },
  })

  const headData = [
    {
      title: '№',
      key: 'order',
    },
    {
      title: 'Shartnoma raqami',
      key: 'contract_number',
    },
    {
      title: 'Shartnoma sanasi',
      key: 'contract_date',
      render: (item) => dateFormatter(format, item, 'dd.MM.yyyy'),
    },
    {
      title: 'Tashkilot nomi',
      key: 'org_name',
    },
    {
      title: 'STIR/PINFL',
      key: 'stir',
    },
    {
      title: 'Shartnomaning umumiy miqdori',
      key: 'price',
      render: (item) => priceFormatter(item || 0) + ' so`m',
    },
    {
      title: `To'lov`,
      key: 'payment',
    },
    {
      title: `Qoldiq`,
      key: 'remains',
    },
    {
      title: `Obyekt nomi`,
      key: 'obj_name_address',
    },
    {
      title: 'Tuman',
      key: 'district',
      objectChild: 'uz_name',
      render: (value) => <p>{value}</p>,
    },
    {
      title: 'Holati',
      key: 'status',
      render: (value) => {
        return <Tag color={value ? 'green' : 'red'} value={value ? t('accepted') : t('rejected')} />
      },
    },
    {
      title: 'Natijalar',
      key: 'contract_result',
      render: (value) => {
        const result = value
          ?.split('/')
          .map(
            (item, ind) => `<span style="color: ${ind === 0 ? 'black' : ind === 1 ? 'green' : 'red'}">${item}</span>`
          )
        return <p dangerouslySetInnerHTML={{ __html: result.join('/') }} />
      },
    },
  ]
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
  }, [query])
  return (
    <div className="h-screen">
      <Header title={t('archive')} />
      <FilterHeader
        leftElements={[
          <Input
            placeholder="Поиск..."
            height={36}
            onChange={(e) => setSearch(e.target.value)}
            name="search"
            type="search"
            addonBefore={<SearchIcon fontSize="medium" className="text-primary" />}
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
          />,
        ]}
      />
      <div className="sidebar-header-calc">
        <BasicLayout
          // header={
          //   permissions[roleId]?.includes('LABORATORY/TABS') && (
          //     <MuiTabs
          //       limit={limit}
          //       offset={offset}
          //       activeTab={activeTab}
          //       elements={tabElements}
          //       setActiveTab={setActiveTab}
          //     />
          //   )
          // }
          footer={
            <Pagination
              count={archiveContractsQuery?.data?.data?.count}
              pageCount={limit}
              onChange={(pageNumber) => setOffset(pageNumber)}
              currentPage={offset}
              onChangeLimit={(limitNumber) => setLimit(limitNumber)}
              limit={limit}
            />
          }
        >
          <BasicTable
            offset={offset}
            limit={limit}
            desiredRowName2="status"
            desiredRowName="id"
            clickHandler={(id, status) => navigate(`${pathname}/${id}`)}
            headColumns={headData}
            isLoading={archiveContractsQuery.isLoading}
            bodyColumns={archiveContractsQuery.data?.data?.contracts}
            // rowLink="/labaratory"
          />
        </BasicLayout>
      </div>
    </div>
  )
}
