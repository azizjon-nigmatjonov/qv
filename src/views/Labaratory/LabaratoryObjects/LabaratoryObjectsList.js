import { useState } from 'react'
import { BasicTable, Header, BasicLayout, Pagination } from '../../../components'
import { useLocation } from 'react-router-dom'
import { useQuery } from '../../../hooks/useQuery'

function LabaratoryObjectsList() {
  const query = useQuery()

  const [activeTab, setActiveTab] = useState(0)
  const [offset, setOffset] = useState(+query.get('offset') || 1)
  const [limit, setLimit] = useState(+query.get('limit') || 10)

  const { pathname } = useLocation()

  const tabElements = [
    { key: 0, title: 'Laboratoriya shartnomasi', count: 45 },
    { key: 1, title: 'Texnik ko`rik', count: 32 },
  ]

  const headData = [
    {
      title: '№',
      key: 'order',
    },
    {
      title: 'Obyekt nomi',
      key: 'object_name',
    },
    {
      title: 'Buyurtmachi',
      key: 'customer',
    },
    {
      title: 'Manzil',
      key: 'location',
    },
    {
      title: 'Inspektor',
      key: 'inspector',
    },
    {
      title: 'Summa SMR',
      key: 'sum_smr',
    },
    {
      title: `To'lov tarixi`,
      key: 'payment_history',
      // columns: [
      //   {
      //     title: 'Summa',
      //     key: 'money_all',
      //   },
      //   {
      //     title: 'Sana',
      //     key: 'date',
      //   },
      //   {
      //     title: 'Fayl',
      //     key: 'file_upload',
      //   },
      // ],
    },
    {
      title: 'Qoldiq',
      key: 'residual',
    },
  ]

  const bodyData = [
    {
      order: '1',
      object_name: 'obyekt 1',
      customer: 'customer 1',
      location: 'location 1',
      inspector: 'inspector 1',
      sum_smr: '1111',
      payment_history: 'history 1',
      residual: '22',
      id: 123
    },
  ]

  return (
    <div className="h-screen">
      <Header title={`${pathname.startsWith('/objects') ? 'Obyektlar' : ''}`} />
      <div className="sidebar-header-calc">
        <BasicLayout
          footer={
            <Pagination
              count={90}
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
            headColumns={headData}
            bodyColumns={bodyData}
            rowLink={`/objects`}
            isLoading={false}
          />
        </BasicLayout>
      </div>
    </div>
  )
}

export default LabaratoryObjectsList
