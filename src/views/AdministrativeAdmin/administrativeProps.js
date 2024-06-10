import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { StatusTag } from '../../components'
import CountdownTag from '../../components/CountdownTag'
import FilterPopupSearch from '../../components/FilterPopupSearch'
import { useQuery } from '../../hooks/useQuery'
import { useAdministrative } from '../../services/administrative'
import useTimeStamp from '../../services/useTimeStamp'
import { administrativeStatuses } from '../../settings/constants'

export const useAdministrativeProps = ({ apparat }) => {
  const query = useQuery()
  const { isRepublic } = useSelector((state) => state.auth)
  const [searchParams, setSearchParams] = useSearchParams()
  const searchParamsMemo = useMemo(() => Object.fromEntries([...searchParams]), [searchParams])
  const [activeTab, setActiveTab] = useState(+searchParamsMemo.tab || 0)
  const [limit, setLimit] = useState(+searchParamsMemo.limit || 10)
  const [offset, setOffset] = useState(+searchParamsMemo.offset || 1)
  const [regulationNumberSearch, setRegulationNumberSearch] = useState('')

  const navigate = useNavigate()
  const { pathname } = useLocation()

  const { regionId } = useSelector((state) => state.auth)

  const isHistory = pathname.includes('history')

  const title = isHistory ? 'Tarix' : 'Yuridik Byuro'

  const { serverTime } = useTimeStamp({
    serverTimeProps: {
      enabled: pathname?.includes('notifications'),
      refetchInterval: 8000,
    },
  })

  const jumpTo = (responseId, linearId, regulationId) => {
    if (!isHistory && !pathname.includes('yuridik-byuro')) {
      if (activeTab === 0)
        navigate(`registration/history/${linearId || responseId}`, { state: { isLinear: !!linearId } })
      else if (activeTab === 1) navigate(`instructions/${regulationId}`)
    } else {
      if (activeTab === 0)
        navigate(`registration/history/${linearId || responseId}`, { state: { isLinear: !!linearId } })
      else if (activeTab === 1) navigate(`instructions/${regulationId}`)
    }
  }

  const getAdministrativeQueryParams = {
    offset,
    limit,
    region_id: isRepublic ? undefined : regionId,
  }
  const getAdministrativeRegulationParams = {
    offset,
    limit,
    region_id: isRepublic ? undefined : regionId,
    search: regulationNumberSearch,
  }

  if (isHistory || pathname.includes('yuridik-byuro')) {
    getAdministrativeQueryParams.status_id = administrativeStatuses.actionTaken
    getAdministrativeRegulationParams.status_id = administrativeStatuses.actionTaken
  }

  const { getAdministrativeQuery, getAdministrativeRegulationQuery } = useAdministrative({
    getAdministrativeQueryParams,
    getAdministrativeQueryProps: { enabled: activeTab === 0, limit, offset },
    getAdministrativeRegulationProps: { enabled: activeTab === 1, limit, offset },
    getAdministrativeRegulationParams,
  })

  const elements = [
    {
      key: '0',
      title: 'Qurilishi boshlangan obyektlar',
      count: '',
    },
    {
      key: '1',
      title: 'Muddati o’tgan yozma ko’rsatmalar',
      count: '',
    },
  ]

  const headData = [
    {
      key: 'order',
      title: '№',
    },
    {
      key: 'task_id',
      title: 'Ariza raqami',
    },
    {
      key: 'applicant_full_name',
      title: 'Ariza beruvchi',
    },
    {
      key: 'customer_organization_name',
      title: 'Buyurtmachi',
    },
    {
      key: 'customer_stir_org',
      title: 'Buyurtmachi STIRi yoki PINFL',
    },
    {
      key: 'contractor_organization_name',
      title: 'Pudratchi',
    },
    {
      key: 'contractor_stir_org',
      title: 'Pudratchi STIRi',
    },
    {
      key: 'created_at',
      title: 'Kelgan vaqti',
      render: (value) =>
        value && typeof value === 'string'
          ? value?.split(' ')[0].split('-').reverse().join('.') + ' ' + value?.split(' ')[1]
          : '---',
    },
    !isHistory && {
      key: 'deadline',
      title: 'Tugash vaqti',
      render: (value) => (
        <p className="text-center">
          {value ? (
            <CountdownTag isBigDeadline={true} deadlineTime={value} serverTime={serverTime.data?.data} />
          ) : (
            '---'
          )}
        </p>
      ),
    },
    {
      key: 'inspector_id',
      title: 'Inspektor',
      render: (value) => (
        <>
          <span>
            {value?.user_surname} {value?.user_name} {value?.user_middlename}
          </span>
          <p style={{ color: '#0452C8' }}>{value?.phone}</p>
        </>
      ),
    },
    {
      key: ['status_name', 'status_id'],
      title: 'Holati',
      render: (value) => <StatusTag title={value[0]} statusId={value[1]} />,
    },
    {
      key: ['updated_at', 'status_id'],
      title: "O'zgargan vaqti",
      render: (values) => (
        <>
          {values[1] !== administrativeStatuses.new ? (
            values[0]?.split(' ')[0].split('-').reverse().join('.') + ' ' + values[0]?.split(' ')[1]
          ) : (
            <p className="text-center">---</p>
          )}
        </>
      ),
    },
  ]

  const headData2 = [
    {
      key: 'order',
      innerKey: 'order_head_data_2',
      title: '№',
    },
    {
      key: 'task_id',
      innerKey: 'task_id_head_data_2',
      title: 'Ariza raqami',
    },
    {
      key: 'applicant_full_name',
      innerKey: 'applicant_full_name_head_data_2',
      title: 'Ariza beruvchi',
    },
    {
      key: 'customer',
      innerKey: 'customer_customer_head_data_2',
      title: 'Buyurtmachi',
      render: (value) => <span>{value?.organization_name}</span>,
    },
    {
      title: 'Buyurtmachi STIRi yoki PINFL',
      key: 'customer',
      innerKey: 'customer_head_data_2',
      render: (value) => <span>{value?.stir_org || value?.pinfl || ''}</span>,
    },
    {
      key: 'contractor',
      innerKey: 'contractor_head_data_2',
      title: 'Pudratchi',
      render: (value) => <span>{value?.organization_name}</span>,
    },
    {
      key: 'contractor',
      title: 'Pudratchi STIRi',
      render: (value) => <>{value?.stir_org}</>,
    },
    {
      key: 'regulation_number',

      title: (
        <FilterPopupSearch
          title="Yozma ko'rsatma raqami"
          setValue={setRegulationNumberSearch}
          value={regulationNumberSearch}
        />
      ),
    },
    {
      key: 'created_at',
      title: 'Kelgan vaqti',
      render: (value) =>
        value && typeof value === 'string'
          ? value?.split(' ')[0].split('-').reverse().join('.') + ' ' + value?.split(' ')[1]
          : '---',
    },
    !isHistory && {
      key: 'deadline',
      title: 'Tugash vaqti',
      render: (value) => (
        <p className="text-center">
          {value ? (
            <CountdownTag isBigDeadline={true} deadlineTime={value} serverTime={serverTime.data?.data} />
          ) : (
            '---'
          )}
        </p>
      ),
    },
    {
      key: 'inspector',
      title: 'Inspektor',
      render: (value) => (
        <>
          <span>
            {value?.user_surname} {value?.user_name} {value?.user_middlename}
          </span>
          <p style={{ color: '#0452C8' }}>{value?.phone}</p>
        </>
      ),
    },
    {
      key: ['status_name', 'status_id'],
      title: 'Holati',
      render: (value) => <StatusTag title={value[0]} statusId={value[1]} />,
    },
    {
      key: ['updated_at', 'status_id'],
      title: "O'zgargan vaqti",
      render: (values) => (
        <>
          {values[1] !== administrativeStatuses.new ? (
            values[0]?.split(' ')[0].split('-').reverse().join('.') + ' ' + values[0]?.split(' ')[1]
          ) : (
            <p className="text-center">---</p>
          )}
        </>
      ),
    },
  ]
  useEffect(() => {
    setSearchParams({ ...searchParamsMemo, limit: 10, offset: 1, tab: activeTab })
    setLimit(10)
    setOffset(1)
  }, [activeTab, setSearchParams])

  return {
    apparat,
    activeTab,
    setActiveTab,
    elements,
    limit,
    setLimit,
    offset,
    setOffset,
    headData: activeTab === 0 ? headData : headData2,
    bodyData:
      activeTab === 0
        ? getAdministrativeQuery.data?.data?.administrative
        : getAdministrativeRegulationQuery.data?.data?.administrative,
    count:
      activeTab === 0 ? getAdministrativeQuery.data?.data?.count : getAdministrativeRegulationQuery.data?.data?.count,
    navigate,
    jumpTo,
    title,
  }
}
