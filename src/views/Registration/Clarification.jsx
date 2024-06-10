import { useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { BasicLayout, BasicTable, Header, Pagination, StatusTag } from '../../components'
import { useRegistrationById } from '../../services/registration'
import useRegistration from '../../services/useRegistration'

const Clarification = () => {
  const { id } = useParams()
  const [limit, setLimit] = useState(10)
  const [offset, setOffset] = useState(1)
  const { pathname } = useLocation()

  const headData = [
    {
      title: '№',
      key: 'order',
    },
    {
      title: 'Ariza raqami',
      key: 'application_number',
    },
    {
      title: 'Eski ariza raqami',
      key: 'old_application_number',
    },
    {
      title: 'Tashkilot',
      key: 'name_org',
    },
    {
      title: 'Holat',
      key: ['status', 'status_id'],
      render: (val) => <StatusTag title={val[0]} statusId={val[1]} />,
    },
  ]

  const { registration } = useRegistrationById({
    id,
    isLinear: pathname.includes('linear'),
    registrationProps: { enabled: !!id },
  })

  const { registrationList } = useRegistration({
    isLinear: pathname.includes('linear'),
    is_history: pathname.includes('history'),
    id,
    offset,
    limit,
    cadastral_number: registration.data?.task?.cadastral_number,
    registrationListProps: {
      enabled: pathname.includes('linear') ? !!registration.data : !!registration.data?.task?.cadastral_number,
    },
  })

  return (
    <div className="h-screen">
      <Header title={registrationList.data?.registrations?.[0]?.application_number || ''} backLink={-1} />
      <div className="sidebar-header-calc">
        <BasicLayout
          footer={
            <Pagination
              limit={limit}
              pageCount={limit}
              currentPage={offset}
              count={registrationList.data?.count}
              onChange={(pageNumber) => setOffset(pageNumber)}
              onChangeLimit={(limitNumber) => setLimit(limitNumber)}
            />
          }
        >
          <BasicTable
            rowLink={
              pathname.includes('history')
                ? '/history'
                : pathname.includes('linear')
                ? '/registration/linear'
                : '/registration'
            }
            isLoading={registrationList.isLoading}
            headColumns={headData}
            bodyColumns={registrationList.data?.registrations}
          />
        </BasicLayout>
      </div>
    </div>
  )
}

export default Clarification
