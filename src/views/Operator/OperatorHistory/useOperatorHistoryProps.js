import { format } from 'date-fns'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { StatusTag } from '../../../components'
import { useClaim } from '../../../services/claim'
import { TASHKILOTLAR } from '../../../settings/constants'
import { permissions } from '../../../settings/permissions'
import dateFormatter from '../../../utils/dateFormatter'

export const useOperatorHistoryProps = () => {
  const { roleId, userId } = useSelector((state) => state.auth)
  const isUserFromOrganization = TASHKILOTLAR.includes(roleId)
  const [limit, setLimit] = useState(10)
  const [offset, setOffset] = useState(1)

  const statuses = 'failed,ministry,accepted'

  const { getClaimsListQuery, getClaimOrganizationActionsQuery } = useClaim({
    limit,
    offset,
    statuses,
    is_archive: true,
    user_id: userId,
    getClaimsListQueryProps: {
      enabled: !isUserFromOrganization,
    },
    getClaimsListQueryParams: {
      statuses,
    },
    getClaimOrganizationActionsProps: {
      enabled: isUserFromOrganization,
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
      render: (value) => <span>{dateFormatter(format, value, 'dd.MM.yyyy', true)}</span>,
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
    {
      title: "O'zgargan vaqti",
      key: 'updated_at',
      render: (value) => <span>{dateFormatter(format, value, 'dd.MM.yyyy', true)}</span>,
    },
    !permissions[roleId].includes('OPERATOR/APPLICATION/LIST/ADMIN') && {
      title: 'Natijalar',
      key: 'results',
      render: (value) => {
        const values = value?.split('/') ?? '0/0/0'.split('/')
        return (
          <span>
            {values[0]}/<span className="text-emerald-400">{values[1]}/</span>
            <span className="text-rose-500">{values[2]}</span>
          </span>
        )
      },
    },
  ]

  return {
    headData,
    bodyData: isUserFromOrganization
      ? getClaimOrganizationActionsQuery.data?.data?.claims
      : getClaimsListQuery.data?.data?.claims,
    isLoading: getClaimsListQuery.isLoading,
    count: isUserFromOrganization
      ? getClaimOrganizationActionsQuery.data?.data?.count
      : getClaimsListQuery.data?.data?.count,
    limit,
    setLimit,
    offset,
    setOffset,
  }
}
