import { useEffect, useState } from 'react'
import { BasicTable, Header, BasicLayout, Pagination, FilterHeader, Input, Tag, BtnFiled } from '../../components'
import { NavLink, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useQuery } from '../../hooks/useQuery'
import { permissions } from '../../settings/permissions'
import { useSelector } from 'react-redux'
import SearchIcon from '@mui/icons-material/Search'
import { AddIcon } from '../../assets/icons'
import { useContract } from '../../services/labaratory/useContract'
import WorkIsGoingOn from '../../components/WorkIsGoingOn'
import {
  BOSH_LABARATORIYA_ROLE_ID,
  BUHGALTERIYA_BOSH_ROLE_ID,
  BUHGALTERIYA_YETAKCHI_ROLE_ID,
  INSPEKSIYA_BOSHLIGI_ROLE_ID,
  INSPEKSIYA_BOSS_FIRST_ZAM_ROLE_ID,
  INSPEKSIYA_BOSS_ZAM_ROLE_ID,
  LABARATORIYA_BOSHLIGI_ROLE_ID,
  REPUBLIC_APPARAT_ROLE_ID,
  YETAKCHI_LABARATORIYA_ROLE_ID,
} from '../../settings/constants'
import priceFormatter from '../../utils/priceFormatter'
import { format } from 'date-fns'
import { CustomDatePicker } from '../../components/CustomDatePicker'
import get30DaysPrior from '../../utils/get30DaysPrior'
import { useTranslation } from 'react-i18next'
import dateFormatter from '../../utils/dateFormatter'
import ZoneSelector from '../../components/ZoneSelector'
import { useMemo } from 'react'

export default function Labaratory({ apparat }) {
  const query = useQuery()
  const { roleId, regionId, isRepublic } = useSelector((state) => state.auth)
  const [searchParams, setSearchParams] = useSearchParams()
  const searchParamsMemo = useMemo(() => Object.fromEntries([...searchParams]), [searchParams])
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
  const isBuhgalteriya = roleId === BUHGALTERIYA_BOSH_ROLE_ID || roleId === BUHGALTERIYA_YETAKCHI_ROLE_ID
  const isInspeksiya =
    roleId === INSPEKSIYA_BOSHLIGI_ROLE_ID ||
    roleId === INSPEKSIYA_BOSS_FIRST_ZAM_ROLE_ID ||
    roleId === INSPEKSIYA_BOSS_ZAM_ROLE_ID
  // const tabElements = [
  //   { key: 0, title: 'Laboratoriya shartnomasi', count: 45 },
  //   { key: 1, title: 'Texnik ko`rik', count: 32 },
  // ]
  const { contractListQuery } = useContract({
    limit,
    offset,
    contract_number: search,
    // role_id:
    //   roleId !== LABARATORIYA_BOSHLIGI_ROLE_ID &&
    //   roleId !== YETAKCHI_LABARATORIYA_ROLE_ID &&
    //   roleId !== BOSH_LABARATORIYA_ROLE_ID
    //     ? roleId
    //     : undefined,
    region_id: isRepublic ? searchParamsMemo.regionId : regionId,
    district_id: searchParamsMemo.districtId,
    // start_date: dateFormatter(format, range?.[0]?.startDate, 'yyyy-MM-dd'),
    // end_date: dateFormatter(format, range?.[0]?.endDate, 'yyyy-MM-dd'),
    status_of:
      roleId !== LABARATORIYA_BOSHLIGI_ROLE_ID &&
      roleId !== YETAKCHI_LABARATORIYA_ROLE_ID &&
      roleId !== BOSH_LABARATORIYA_ROLE_ID
        ? 'action'
        : undefined,
    is_inspection: isInspeksiya ? true : undefined,
    getContractListParams: {
      enabled: true && pathname.includes('labaratory'),
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
      render: (item) => (item ? format(new Date(item), 'dd.MM.yyyy') : '---'),
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
      width: 150,
      title: `To'lov`,
      key: 'payment',
      render: (item) => priceFormatter(item || 0) + ' so`m',
    },
    {
      title: `Qoldiq`,
      width: 150,
      key: 'remainder',
      render: (item) => priceFormatter(item || 0) + ' so`m',
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
        return value?.status === 'Yangi' ? (
          <Tag color={'blue'} value={value?.status} />
        ) : value?.status_id === 'e0a3963b-36f4-4e35-8413-df26e9866632' ? (
          <Tag color="yellow" value={value?.status} />
        ) : value?.status_id === 'e5859895-c088-429d-8d90-e9ec49b7222d' ? (
          <Tag color="green" value="Tasdiqlangan" />
        ) : (
          <Tag color="red" value={value?.status} />
        )
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
    <div className="h-screen relative">
      {/* {isApparat && <WorkIsGoingOn />} */}
      <Header
        title={'Labaratoriya'}
        rightElement={
          permissions[roleId].includes('LABARATORY/CONTRACT/CREATE') && (
            <NavLink to="add">
              <BtnFiled leftIcon={<AddIcon />}>Qo`shish</BtnFiled>
            </NavLink>
          )
        }
      />
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
          isBuhgalteriya && (
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
            />
          ),
          <ZoneSelector />,
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
              count={contractListQuery?.data?.data?.count}
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
            clickHandler={(id, status) =>
              navigate(
                `${pathname}${
                  status?.status_id === '94403daf-5350-4088-8cac-09186bbf6965' ? '/confirm' : ''
                }/${id}`
              )
            }
            headColumns={headData}
            isLoading={contractListQuery.isLoading}
            bodyColumns={contractListQuery.data?.data?.contracts}
            // rowLink="/labaratory"
          />
        </BasicLayout>
      </div>
    </div>
  )
}
