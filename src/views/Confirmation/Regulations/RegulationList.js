import { format } from 'date-fns'
import { useState } from 'react'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import { BasicLayout, BasicTable, Header, Tabs, Tag, Pagination } from '../../../components'
import { useRegulation } from '../../../services'
import { regulationStatuses } from '../../../settings/status'
import { roles } from '../../../settings/constants'
import dateFormatter from '../../../utils/dateFormatter'

export function RegulationList() {
  const { id } = useParams()

  const [offset, setOffset] = useState(1)
  const [limit, setLimit] = useState(10)
  const { roleName } = useSelector((state) => state.auth)
  const permission = roles.find((item) => item.name === roleName)
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
      title: 'Qoidabuzarlik',
      key: 'document_date',
    },
    {
      title: 'Yaratilgan sana',
      key: 'created_at',
      render: (value) => value && dateFormatter(format,new Date(value), 'dd.MM.yyyy'),
    },
    {
      title: 'Inspektor',
      key: 'file',
    },
    {
      title: 'Ma`sul xodimlar',
      key: 'users',
      render: (value) => value?.map((item) => item.name)?.join(','),
    },
    {
      title: 'Holati',
      key: 'regulation_status_id',
      render: (value) => {
        const status = regulationStatuses.find((item) => item.id === value)
        return <Tag color={status.color} value={status.status} />
      },
    },
  ]
  const tabLinks = [
    {
      key: 'instructions',
      title: "Yozma ko'rsatmalar",
      path: '/confirmations',
    },
  ]

  const { regulations } = useRegulation({
    objectId: id,
    regulationParams: {
      limit,
      offset,
      status_id: permission?.getStatusId,
    },
    regulationsQueryProps: {
      enabled: true,
    },
  })

  return (
    <div className="h-screen">
      <Header title="" centerElement={<Tabs elements={tabLinks} />} />
      <div className="sidebar-header-calc">
        <BasicLayout
          footer={
            <Pagination
              count={regulations?.data?.count}
              pageCount={limit}
              onChange={(pageNumber) => setOffset(pageNumber)}
              currentPage={offset}
              onChangeLimit={(limitNumber) => setLimit(limitNumber)}
              limit={limit}
            />
          }
        >
          <BasicTable
            headColumns={headData}
            isLoading={regulations.isLoading}
            bodyColumns={regulations?.data?.regulations}
            rowLink="/confirmations"
          />
        </BasicLayout>
      </div>
    </div>
  )
}
