import { format } from 'date-fns'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { BasicLayout, BasicTable, FilterHeader, Header, Input, Pagination } from '../../components'
import useRegistration from '../../services/useRegistration'
import dateFormatter from '../../utils/dateFormatter'

const SearchEngine = () => {
  const { regionId } = useSelector((state) => state.auth)

  const [offset, setOffset] = useState(1)
  const [limit, setLimit] = useState(10)

  const headData = [
    {
      title: '№',
      key: 'order',
    },
    {
      title: 'Buyurtmachi',
      key: 'name',
    },
    {
      title: 'PINFL va STIR',
      key: 'pinfl',
      render: (val) => <>1234567890</>,
    },
    {
      title: 'Obyekt soni',
      key: 'object_count',
      render: () => <>0987654321</>,
    },
    {
      title: 'Tizimga kiritilgan',
      key: 'created_at',
      render: (val) => <>{dateFormatter(format,new Date(val), 'dd.MM.yyyy')}</>,
    },
  ]

  const { companies } = useRegistration({ region_id: regionId })

  return (
    <div className="h-screen">
      <Header title="Qidiruv" backLink={-1} />
      <FilterHeader leftElements={[<Input height={36} placeholder="Qidirish..." />]} />
      <div className="sidebar-header-calc">
        <BasicLayout
          footer={
            <Pagination
              count={companies?.data?.count}
              pageCount={limit}
              onChange={(pageNumber) => setOffset(pageNumber)}
              currentPage={offset}
              onChangeLimit={(limitNumber) => {
                setLimit(limitNumber)
              }}
              limit={limit}
            />
          }
        >
          <BasicTable headColumns={headData} bodyColumns={companies.data?.companies} isLoading={companies.isLoading} />
        </BasicLayout>
      </div>
    </div>
  )
}

export default SearchEngine
