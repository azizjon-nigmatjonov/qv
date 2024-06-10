import { format } from 'date-fns'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { regulationStatuses } from '../../settings/status'
import { useRegulation } from '../../services'
import { Tag, StatusTag } from '../../components'
import CountdownTag from '../../components/CountdownTag'
import { addHours } from '../../utils/addHour'
import {
  ACT_TYPE_ID_ACT_APPROVED,
  ACT_TYPE_ID_EXTENDATION_REVIEWED,
  INSPEKSIYA_BOSHLIGI_ROLE_ID,
  INSPEKSIYA_BOSS_FIRST_ZAM_ROLE_ID,
  INSPEKSIYA_BOSS_ZAM_ROLE_ID,
  INSPEKTOR_BOSH_ROLE_ID,
  INSPEKTOR_YETAKCHI_ROLE_ID,
  REGISTRATURA_ROLE_ID,
  REGULATION_STATUS_ID_IN_APPROVAL,
  SMR_BOSHLIGI_ROLE_ID,
} from '../../settings/constants'
import dateFormatter from '../../utils/dateFormatter'
import useTimeStamp from '../../services/useTimeStamp'
import { useQuery } from '../../hooks/useQuery'
import { permissions } from '../../settings/permissions'
import { useClaim } from '../../services/claim'

export const useByConfirmationsProps = () => {
  const query = useQuery()

  const [activeTab, setActiveTab] = useState(+query.get('tab') || 0)
  const [offset, setOffset] = useState(+query.get('offset') || 1)
  const [limit, setLimit] = useState(10)
  const { roleId, regionId, userId } = useSelector((state) => state.auth)

  const { pathname } = useLocation()

  const statuses = 'new,organization,inspector,checked,process,inspection,connecting'

  const isInspeksiya =
    roleId === INSPEKSIYA_BOSHLIGI_ROLE_ID ||
    roleId === INSPEKSIYA_BOSS_FIRST_ZAM_ROLE_ID ||
    roleId === INSPEKSIYA_BOSS_ZAM_ROLE_ID

  const showObjectsByRegion = roleId === SMR_BOSHLIGI_ROLE_ID || roleId === REGISTRATURA_ROLE_ID || isInspeksiya

  const setDeadline = (date) => {
    return addHours(new Date(date), 8)
  }

  const { serverTime } = useTimeStamp({
    serverTimeProps: {
      enabled: pathname.includes('confirmations'),
      refetchInterval: 8000,
    },
  })

  const { getClaimsListQuery } = useClaim({
    limit,
    offset,
    statuses,
    user_id: userId,
    getClaimsListQueryParams: {
      is_inspection_boss: isInspeksiya,
      region_id: regionId,
    },
    is_inspection_boss: isInspeksiya,
    getClaimsListQueryProps: {
      enabled: isInspeksiya,
    },
  })

  const { regulations } = useRegulation({
    regulationParams: {
      act_status_id: isInspeksiya ? ACT_TYPE_ID_ACT_APPROVED : ACT_TYPE_ID_EXTENDATION_REVIEWED,
      status_id: REGULATION_STATUS_ID_IN_APPROVAL,
      region_id: showObjectsByRegion ? regionId : '',
      limit,
      offset,
    },
    regulationsQueryProps: { enabled: !!ACT_TYPE_ID_EXTENDATION_REVIEWED },
  })

  const tabElements = [
    { key: 0, title: "Yozma ko'rsatmalar", count: regulations.data?.count },
    { key: 1, title: 'Kiritish', count: regulations.data?.count },
    isInspeksiya && { key: 2, title: 'Foydalanishga topshirishga', count: getClaimsListQuery.data?.data?.count },
  ]

  const applicationHeadData = [
    {
      title: '№',
      key: 'order',
    },
    {
      title: 'Ariza raqami',
      key: 'task_id',
    },
    {
      title: 'Kelgan vaqti',
      key: isInspeksiya ? 'updated_at' : 'created_at',
      render: (value) => (
        <span>
          {dateFormatter(format, value, 'dd-MM-yyyy')?.split('-')?.join('.')} <br />
          {value?.split('T')[1]?.split(':')?.slice(0, 2)?.join(':')}
        </span>
      ),
    },
    {
      title: 'Tugash vaqti',
      key: ['updated_at', 'deadline', 'status', 'created_at'],
      render: (values) => {
        return isInspeksiya ? (
          values[2] === 'inspection' || values[2] === 'inspector' ? (
            <CountdownTag
              deadlineTime={
                new Date(
                  new Date(new Date(values[0]).setDate(new Date(values[0]).getDate() + 1)).setHours(
                    new Date(values[0]).getHours() - 5
                  )
                )
              }
              serverTime={serverTime.data?.data}
            />
          ) : values[2] === 'new' || (values[2] === 'inspection' && isInspeksiya) ? (
            <CountdownTag deadlineTime={values[1]} serverTime={serverTime.data?.data} />
          ) : (
            '---'
          )
        ) : (
          '---'
        )
      },
    },
    {
      title: 'Buyurtmachi',
      key: 'customer_name',
      render: (value) => <span>{value}</span>,
    },
    {
      title: 'Holat',
      key: 'status',
      render: (value) => <StatusTag title={value === 'inspection' && isInspeksiya ? 'new' : value} />,
    },
    !permissions[roleId].includes('OPERATOR/APPLICATION/LIST/ADMIN') && {
      title: 'Natijalar',
      key: 'results',
      render: (value) => {
        const values = value?.split('/') ?? '0/4/7'.split('/')
        return (
          <span>
            {values[0]}/<span className="text-emerald-400">{values[1]}/</span>
            <span className="text-rose-500">{values[2]}</span>
          </span>
        )
      },
    },
  ]

  const headData = [
    {
      title: '№',
      key: 'order',
    },
    {
      title: "Ko'rsatma raqami",
      key: 'regulation_number',
    },
    {
      title: 'Qoidabuzarliklar',
      key: 'all_violations',
    },
    {
      title: "Ko'rib chiqish",
      key: ['updated_at', 'deadline'],
      render: (values) => {
        return <CountdownTag serverTime={serverTime.data?.data} deadlineTime={addHours(values[0], 3)} />
      },
      // <CountdownTag value={value} />
    },
    {
      title: 'Yaratilgan sana',
      key: 'created_at',
      render: (value) => value && dateFormatter(format, new Date(value), 'dd.MM.yyyy'),
    },
    {
      title: 'Inspektor',
      key: 'user',
      render: ({ user_name, role_name }) => (
        <div>
          <p className="text-blue-500">{role_name?.[0]?.toUpperCase() + role_name?.toLowerCase().slice(1)}</p>
          <p>{user_name?.[0]?.toUpperCase() + user_name?.toLowerCase().slice(1)}</p>
        </div>
      ),
    },
    {
      title: "O'zgarish",
      key: 'act_status',
      render: (val) => <StatusTag statusId={val.id} title={val.status} />,
    },
    {
      title: "Mas'ul xodimlar",
      key: 'guilty_user',
      render: ({ role_name, user_name }) => (
        <div>
          <p className="text-blue-500">{role_name?.[0]?.toUpperCase() + role_name?.toLowerCase().slice(1)}</p>
          <p>{user_name?.[0]?.toUpperCase() + user_name?.toLowerCase().slice(1)}</p>
        </div>
      ),
    },
    {
      title: 'Holati',
      key: 'regulation_status_id',
      render: (value) => {
        const status = regulationStatuses.find((item) => item.id === value)
        return <Tag color="green" value={status.status} />
      },
    },
  ]

  return {
    activeTab,
    setActiveTab,
    offset,
    setOffset,
    limit,
    setLimit,
    roleId,
    regionId,
    userId,
    pathname,
    isInspeksiya,
    applicationHeadData,
    headData,
    tabElements,
    getClaimsListQuery,
    regulations,
  }
}
