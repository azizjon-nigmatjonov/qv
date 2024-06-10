import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import debounce from 'lodash.debounce'
import SearchIcon from '@mui/icons-material/Search'

import { BasicLayout, BasicTable, FilterHeader, Header, Input, MuiTabs, Pagination, StatusTag } from '../../components'
import CountdownTag from '../../components/CountdownTag'
import useRegistration from '../../services/useRegistration'
import useAcceptance from '../../services/useAcceptance'
import { OPERATOR_ROLE_ID, REGISTARTION_ARCHIEVE_STATUS_ID, REGISTRATURA_ROLE_ID } from '../../settings/constants'
import { useQuery } from '../../hooks/useQuery'
import dateFormatter from '../../utils/dateFormatter'
import { setActiveTabAction } from '../../redux/actions/activeTabsActions'
import { setTabCountAction } from '../../redux/actions/countsAction'
import useTimeStamp from '../../services/useTimeStamp'
import useCount from '../../services/useCount'
import TableRowLink from '../../components/TableRowLink/TableRowLink'
import { useGetLinearObjects } from '../../services/linear-objects'

function Registration() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const dispatch = useDispatch()
  const { roleId, regionId, userId } = useSelector((state) => state.auth)
  const { registrationPageTabCount, historyPageTabCount } = useSelector((state) => state.counts)
  const query = useQuery()
  const { register } = useForm()
  const [searchValue, setSearchValue] = useState('')
  const [limit, setLimit] = useState(+query.get('limit') || 10)
  const [offset, setOffset] = useState(+query.get('offset') || 1)
  const [activeTab, setActiveTab] = useState(+query.get('tab') || 0)

  const isOperator = roleId === OPERATOR_ROLE_ID
  const isRegistrator = roleId === REGISTRATURA_ROLE_ID
  const { serverTime } = useTimeStamp({
    serverTimeProps: {
      enabled: pathname?.includes('registration'),
      refetchInterval: 8000,
    },
  })
  const { registrationListCount } = useCount({
    region_id: regionId,
    registrationListCountProps: {
      enabled: true,
    },
  })
  const { registrationList } = useRegistration({
    limit,
    id: 124142,
    offset,
    search: searchValue,
    region_id: regionId,
    is_history: pathname?.includes('history'),
    is_registration: !(activeTab === 1),
    registrationListProps: {
      enabled: !!offset && !isOperator && activeTab <= 1,
    },
  })

  const { getLinearObjectsQuery } = useGetLinearObjects({
    limit,
    offset,
    regionId,
    search: searchValue,
    isHistory: pathname?.includes('history'),
    isRegistration: activeTab === 2,
    getLinearObjectsQueryProps: {
      enabled: !!limit && !!offset && !isOperator && activeTab > 1,
    },
  })

  const { acceptances } = useAcceptance({
    limit,
    offset,
    search: activeTab === 1 ? searchValue : undefined,
    acceptancesProps: {
      enabled: !!offset && isOperator,
    },
  })

  const checkId = (id) => {
    if (pathname?.includes('history')) {
      // uncomment qilib qolishimiz mumkun)
      // if (activeTab === 1) return `${id}/clarification`
      // if (activeTab === 3) return `${id}/clarification-linear`
      if (activeTab === 2 || activeTab === 3) return `linear/${id}`
      return `/history/${id}`
    }
    // if (activeTab === 1) return `${id}/clarification`
    // if (activeTab === 3) return `${id}/clarification-linear`
    else if (activeTab === 2 || activeTab === 3) return `linear/${id}`
    return `/registration/${id}`
  }

  const headData = useMemo(
    () => [
      {
        title: '№',
        key: 'order',
      },
      {
        title: 'Ariza raqami',
        key: ['application_number', 'id'],
        render: (values) => <TableRowLink values={values} fn={checkId} styles="min-w-[200px]" />,
      },
      (activeTab === 1 || activeTab === 3) && {
        title: 'Eski Ariza raqami',
        key: ['old_application_number', 'id'],
        render: (values) => <TableRowLink values={values} fn={checkId} styles="min-w-[200px]" />,
      },
      {
        title: 'Buyurtmachi',
        key: ['customer', 'id'],
        innerKey: 'full_name',
        objectChild: 'full_name',
        render: (values) => (
          <TableRowLink styles="min-w-[200px]" fn={checkId} objectChild="full_name" values={values} />
        ),
      },
      {
        title: 'Obyekt nomi',
        key: ['name_building', 'id'],
        render: (values) => <TableRowLink styles="min-w-[200px]" fn={checkId} values={values} />,
      },
      {
        title: 'STIR yoki PINFL',
        key: ['customer', 'id'],
        innerKey: 'stir-pinfl',
        objectChild: 'tinOrpinfl',
        render: (values) => (
          <TableRowLink styles="min-w-[200px]" fn={checkId} values={values} objectChild="tinOrpinfl" />
        ),
      },
      activeTab < 2 && {
        title: 'Kadastr nomeri',
        key: 'cadastral_number',
      },
      {
        title: 'Kiritilgan vaqti',
        key: ['created_at', 'id'],
        render: (values) => (
          <TableRowLink styles="min-w-[200px]" fn={checkId} values={values}>
            <div>{dateFormatter(format, values[0], 'dd-MM-yyyy', true)}</div>
          </TableRowLink>
        ),
      },
      !pathname.includes('history') && {
        title: 'Tugash vaqti',
        key: ['created_at', 'id', 'deadline'],
        render: (values) => (
          <TableRowLink fn={checkId} values={values}>
            {pathname?.includes('history') ? (
              <span>{dateFormatter(format, values?.[0], 'dd-MM-yyyy', true)}</span>
            ) : (
              <CountdownTag value={values?.[0]} serverTime={serverTime.data?.data} deadlineTime={values?.[2]} />
            )}
          </TableRowLink>
        ),
      },
      {
        title: 'Tashkilot',
        key: ['name_org', 'id'],
        render: (values) => <TableRowLink fn={checkId} values={values} />,
      },
      {
        title: 'Holati',
        key: ['status', 'status_id'],
        render: (val) => <StatusTag title={val[0]} statusId={val[1]} />,
      },
      {
        title: 'Holati',
        key: 'is_accepted',
        render: (val) => <StatusTag title={val ? 'Qabul qilindi' : 'Rad etildi'} color={val ? 'green' : 'red'} />,
      },
      {
        title: "O'zgargan vaqti",
        key: 'updated_at',
        render: (val) => val && dateFormatter(format, val, 'dd-MM-yyyy', true),
      },
    ],
    [activeTab, serverTime.data]
  )

  const acceptanceHeadData = [
    {
      title: '№',
      key: 'order',
    },
    {
      title: 'Ariza raqami',
      key: 'codastor_number',
    },
    {
      title: 'Tugash vaqti',
      key: 'created_at',
      render: (value) =>
        pathname?.includes('history') ? (
          <span>{dateFormatter(format, new Date(value), 'dd-MM-yyyy')}</span>
        ) : (
          <CountdownTag value={value} />
        ),
    },
    {
      title: 'Tashkilot',
      key: 'response',
      render: (val) => <div>{val['building_name']}</div>,
    },
    {
      title: 'Holati',
      key: ['status_name', 'status_id'],
      render: (val) => <StatusTag title={val[0]} statusId={val[1]} />,
    },
  ]

  const tabElements = [
    {
      key: 0,
      title: 'Registratura',
      count: pathname?.includes('history') ? historyPageTabCount[0].count : registrationPageTabCount[0].count,
    },
    {
      key: 1,
      title: 'Qayta rasmiylashtirish',
      count: pathname?.includes('history') ? historyPageTabCount[1].count : registrationPageTabCount[1].count,
    },
    {
      key: 2,
      title: 'Tarmoq obyektlari',
      count: registrationListCount.data?.data?.new_registration_linear_count,
    },
    {
      key: 3,
      title: 'Tarmoq obyektlari qayta rasmiylashtirish',
      count: registrationListCount.data?.data?.new_re_registration_linear_count || '',
    },
  ]
  useEffect(() => {
    dispatch(
      setTabCountAction({
        tabName: pathname?.includes('history') ? 'historyPageTabCount' : 'registrationPageTabCount',
        value: [
          {
            key: 0,
            count: pathname?.includes('history')
              ? registrationListCount?.data?.data?.old_registration_count
              : registrationListCount?.data?.data.new_registration_count,
          },
          {
            key: 1,
            count: pathname?.includes('history')
              ? registrationListCount?.data?.data?.old_re_registration_count
              : registrationListCount?.data?.data?.new_re_registration_count,
          },
        ],
      })
    )
  }, [registrationListCount?.data?.data, pathname, dispatch])
  const changeHandler = (event) => setSearchValue(event.target.value)
  const debouncedEventHandler = useMemo(() => debounce(changeHandler, 300), [])

  useEffect(() => {
    setOffset(+query.get('offset') || 1)
    setLimit(+query.get('limit') || 10)
    setActiveTab(+query.get('tab') || 0)
  }, [query])

  useEffect(() => {
    if (activeTab > 1) getLinearObjectsQuery.refetch()
  }, [activeTab])

  return (
    <div className="h-screen">
      <Header title={pathname?.includes('history') ? 'Tarix' : "Ro'yxatdan o'tish"} />
      <FilterHeader
        leftElements={[
          <Input
            register={register}
            name="search"
            onChange={debouncedEventHandler}
            className="pl-[8px] pr-[8px]"
            height={36}
            addonBefore={<SearchIcon fontSize="medium" className="text-primary" />}
            placeholder="Qidirish..."
          />,
        ]}
      />
      <div className="sidebar-header-filter-calc">
        <BasicLayout
          header={
            isRegistrator && (
              <MuiTabs
                offset={offset}
                limit={limit}
                activeTab={activeTab}
                elements={tabElements}
                setActiveTab={setActiveTab}
              />
            )
          }
          footer={
            <Pagination
              count={
                isRegistrator
                  ? activeTab === 2
                    ? getLinearObjectsQuery.data?.data?.count
                    : registrationList.data?.count
                  : acceptances.data?.count
              }
              pageCount={limit}
              onChange={(pageNumber) => setOffset(pageNumber)}
              currentPage={offset}
              onChangeLimit={(limitNumber) => setLimit(limitNumber)}
              limit={limit}
            />
          }
        >
          {isRegistrator ? (
            <BasicTable
              offset={offset}
              limit={limit}
              headColumns={
                pathname?.includes('history')
                  ? headData.filter((i) => !i.key?.includes('status'))
                  : headData.filter((i) => i.key !== 'is_accepted')
              }
              bodyColumns={
                //should uncommit in future
                activeTab > 1 ? getLinearObjectsQuery.data?.data?.registrations : registrationList.data?.registrations
              }
              desiredRowName="id"
              // clickHandler={(id) =>
              //   id !== REGISTARTION_ARCHIEVE_STATUS_ID
              //     ? activeTab === 1
              //       ? navigate(`${id}`)
              //       : pathname?.includes('history')
              //       ? navigate(`/history/${id}`)
              //       : activeTab > 1
              //       ? navigate(`/registration/linear/${id}`)
              //       : navigate(`/registration/${id}`)
              //     : {}
              // }
              isLoading={registrationList.isLoading}
            />
          ) : (
            <BasicTable
              offset={offset}
              limit={limit}
              headColumns={acceptanceHeadData}
              bodyColumns={acceptances.data?.responses}
              isLoading={acceptances.isLoading}
              rowLink={'acceptance'}
            />
          )}
        </BasicLayout>
      </div>
    </div>
  )
}

export default Registration
