import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search'

import { AddIcon } from '../../../../assets/icons'
import { BasicLayout, BasicTable, BtnFiled, FilterHeader, Header, Input, Pagination } from '../../../../components'
import EmptyDataImg from '../../../../assets/images/EmptyDataImg.png'
import { useTestTypes } from '../../../../services/labaratory'
import { useSelector } from 'react-redux'

export default function LaboratoryTestTypesList() {
  const { regionId } = useSelector((state) => state.auth)

  const [offset, setOffset] = useState(1)
  const [limit, setLimit] = useState(10)
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const handleOnClick = () => {
    navigate('add')
  }

  const { getTestTypesQuery } = useTestTypes({
    getTestTypesParams: {
      limit,
      offset,
      search,
      region_id: regionId,
    },
  })

  const headData = [
    {
      title: '№',
      key: 'order',
    },
    {
      title: 'Mahsulot nomi',
      key: 'name',
    },
    {
      title: 'Normativ hujjat nomi',
      key: 'document',
    },
    {
      title: 'O`lchov birligi',
      key: 'measurement_name',
    },
    {
      title: 'Narxi',
      key: 'price',
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
            onChange={(e) => setSearch(e.target.value)}
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
              count={getTestTypesQuery.data?.data?.count}
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
            bodyColumns={getTestTypesQuery.data?.data?.test_types}
            emptyDataImage={EmptyDataImg}
            rowLink={'/laboratory-settings/test-types'}
            // isLoading={inspectorStats.isLoading}
          />
        </BasicLayout>
      </div>
    </div>
  )
}
