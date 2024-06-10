import { format } from 'date-fns'
import { useState } from 'react'
import { BasicLayout, BasicTable, Header, Pagination, BtnFiled } from '../../components'
import { AddIcon } from '../../assets/icons'
import { NavLink } from 'react-router-dom'
import dateFormatter from '../../utils/dateFormatter'

export default function Statistics() {
  const headData = [
    {
      title: '№',
      key: 'order',
    },
    {
      title: 'Bajarilgan harakat',
      key: 'description',
    },
    {
      title: 'Sana',
      key: 'created_at',
      render: (value) => value && dateFormatter(format,new Date(value), 'dd.MM.yyyy'),
    },
  ]

  const [offset, setOffset] = useState(1)
  const [limit, setLimit] = useState(10)

  return (
    <div className="h-screen">
      <Header title="Statistika" backLink="/inspectors" />
      <div className="sidebar-header-calc">
        <BasicLayout
          rightElement={
            <NavLink to="add">
              <BtnFiled color="blue" leftIcon={<AddIcon />}>
                Qo’shish
              </BtnFiled>
            </NavLink>
          }
          footer={
            <Pagination
              count={1}
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
          <BasicTable headColumns={headData} bodyColumns={[]} rowLink={''} isLoading={false} />
        </BasicLayout>
      </div>
    </div>
  )
}
