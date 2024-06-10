import { useState } from 'react'
import { useSelector } from 'react-redux'
import { StatusTag } from '../../../components'
import CountdownTag from '../../../components/CountdownTag'
import { useClaim } from '../../../services/claim'
import { permissions } from '../../../settings/permissions'
import useTimeStamp from '../../../services/useTimeStamp'
import {
  INSPEKSIYA_BOSHLIGI_ROLE_ID,
  INSPEKSIYA_BOSS_FIRST_ZAM_ROLE_ID,
  INSPEKSIYA_BOSS_ZAM_ROLE_ID,
  TASHKILOTLAR,
} from '../../../settings/constants'
import { useLocation, useNavigate } from 'react-router-dom'
import dateFormatter from '../../../utils/dateFormatter'
import { format } from 'date-fns'

export const useOperatorApplicationProps = () => {
  const [limit, setLimit] = useState(10)
  const [offset, setOffset] = useState(1)
  const { roleId, userId, regionId } = useSelector((state) => state.auth)
  const isUserFromOrganization = TASHKILOTLAR.includes(roleId)

  const navigate = useNavigate()

  const { pathname } = useLocation()

  const { serverTime } = useTimeStamp({
    serverTimeProps: {
      enabled: true,
      refetchInterval: 8000,
    },
  })

  const headData = [
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
      key: 'created_at',
      render: (value) => (
        <span>
          {dateFormatter(format, value, 'dd-MM-yyyy')?.split('-')?.join('.')} <br />{' '}
          {value?.split('T')[1]?.split(':')?.slice(0, 2)?.join(':')}
        </span>
      ),
    },
    {
      title: 'Tugash vaqti',
      key: ['created_at', 'deadline', 'status'],
      render: (values) => {
        // server time is 5 hours behind
        return values[2] === 'new' ? (
          <CountdownTag deadlineTime={values[1]} serverTime={serverTime.data?.data} />
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
      render: (value) => <StatusTag title={value} />,
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

  const statuses = 'new,organization,inspector,checked,process,inspection,connecting'
  const archiveStatuses = 'accepted,failed,ministry'

  const isInspectionBoss = [
    INSPEKSIYA_BOSHLIGI_ROLE_ID,
    INSPEKSIYA_BOSS_FIRST_ZAM_ROLE_ID,
    INSPEKSIYA_BOSS_ZAM_ROLE_ID,
  ].some((inspection) => inspection === roleId)

  const getClaimsListQueryParams = {
    limit,
    offset,
    is_inspection_boss: isInspectionBoss,
    region_id: regionId,
  }

  if (!isInspectionBoss) getClaimsListQueryParams.statuses = !pathname.includes('history') ? statuses : archiveStatuses

  const { getClaimsListQuery, getClaimOrganizationActionsQuery } = useClaim({
    limit,
    offset,
    statuses,
    user_id: userId,
    getClaimsListQueryParams,
    is_inspection_boss: isInspectionBoss,
    getClaimsListQueryProps: {
      enabled: !isUserFromOrganization,
    },
    getClaimOrganizationActionsProps: {
      enabled: isUserFromOrganization,
    },
  })

  return {
    limit,
    setLimit,
    offset,
    setOffset,
    headData,
    bodyData: isUserFromOrganization
      ? getClaimOrganizationActionsQuery.data?.data?.claims
      : getClaimsListQuery.data?.data?.claims,
    count: isUserFromOrganization
      ? getClaimOrganizationActionsQuery.data?.data?.count
      : getClaimsListQuery.data?.data?.count,
    isLoading: false,
    navigate,
  }
}
