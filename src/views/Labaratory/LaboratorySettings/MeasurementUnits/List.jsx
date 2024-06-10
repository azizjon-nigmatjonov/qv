import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search'

import { AddIcon } from '../../../../assets/icons'
import { BasicLayout, BasicTable, BtnFiled, FilterHeader, Header, Input, Pagination } from '../../../../components'
import EmptyDataImg from '../../../../assets/images/EmptyDataImg.png'
import { useMeasurements } from '../../../../services/labaratory'
export default function MesurementUnitsList() {
  const [offset, setOffset] = useState(1)
  const [limit, setLimit] = useState(10)

  const navigate = useNavigate()

  const handleOnClick = () => {
    navigate('add')
  }

  const { getMeasurementsQuery } = useMeasurements({
    getMeasurementsParams: {
      limit,
      offset,
    },
  })

  const headData = [
    {
      title: '№',
      key: 'order',
    },
    {
      title: 'O’lchov birliklari nomi',
      key: 'name',
    },
  ]

  return (
    <div>
      <Header
        title="Sozlamalar"
        rightElement={
          <BtnFiled onClick={handleOnClick} leftIcon={<AddIcon />}>
            Qo`shish
          </BtnFiled>
        }
      />
      <FilterHeader
        leftElements={[
          <Input
            placeholder="Поиск..."
            height={36}
            name="search"
            type="search"
            addonBefore={<SearchIcon fontSize="medium" className="text-primary" />}
          />,
        ]}
      />
      <div className="sidebar-header-calc">
        <BasicLayout
          rightElement={
            <NavLink to="add">
              <BtnFiled color="blue" leftIcon={<AddIcon />}>
                Qo'shish
              </BtnFiled>
            </NavLink>
          }
          footer={
            <Pagination
              count={getMeasurementsQuery.data?.data?.count}
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
          <BasicTable
            headColumns={headData}
            bodyColumns={getMeasurementsQuery.data?.data?.measurements}
            emptyDataImage={EmptyDataImg}
            rowLink={'/settings/measurement-units'}
            // isLoading={inspectorStats.isLoading}
          />
        </BasicLayout>
      </div>
    </div>
  )
}
