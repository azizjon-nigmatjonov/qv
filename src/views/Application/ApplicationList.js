import { useState } from 'react'
import { BasicTable, Header, BasicLayout, Pagination } from '../../components'
import { useLocation } from 'react-router-dom'
import { useQuery } from '../../hooks/useQuery'

export function ApplictionList() {
  const query = useQuery()

  const [activeTab, setActiveTab] = useState(0)
  const [offset, setOffset] = useState(+query.get('offset') || 1)
  const [limit, setLimit] = useState(+query.get('limit') || 10)

  const { pathname } = useLocation()
  const headData = [
    {
      title: '№',
      key: 'order',
    },
    {
      title: 'Ariza raqami',
      key: 'applicaiton_number',
    },
    {
      title: 'Firma nomi',
      key: 'name_firm',
    },
    {
      title: 'STIR PINFL',
      key: 'stir_pinfl',
    },
    {
      title: 'Shartnomaning umumiy miqdori',
      key: 'amount_contact',
    },
    {
      title: 'To`lov',
      key: 'payment',
    },
    {
      title: 'Qoldiq',
      key: 'residual',
    },
    {
      title: 'Obyekt nomi',
      key: 'object_name',
    },
    {
      title: 'Tuman',
      key: 'district',
    },
  ]

  const bodyData = [
    {
      order: '1',
      applicaiton_number: 'obyekt 1',
      name_firm: 'customer 1',
      stir_pinfl: 'location 1',
      amount_contact: 'inspector 1',
      sum_smr: '1111',
      payment: 'history 1',
      residual: '22',
      id: 123,
    },
  ]

  return (
    <>
      <div className="h-screen">
        <Header title={`${pathname.startsWith('/application') ? 'Arizalar' : ''}`} />
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
              rowLink={'/application'}
              isLoading={false}
            />
          </BasicLayout>
        </div>
      </div>
    </>
  )
}
