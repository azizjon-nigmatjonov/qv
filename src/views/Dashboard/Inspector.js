import { NavLink } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search'

import { BasicLayout, BasicTable, Header, Pagination, BtnFiled, FilterHeader, Input, MuiTabs } from '../../components'
import { AddIcon } from '../../assets/icons'
import ReactSelect, { components } from 'react-select'
import { NearMe } from '@mui/icons-material'
import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { REPUBLIC_APPARAT_ROLE_ID } from '../../settings/constants'
import { CustomDatePicker } from '../../components/CustomDatePicker'
import FilterHeaderRightElements from './components/FilterHeadRightElements'
import { getSearchParams } from '../../utils/getSearchParams'

const Control = ({ children, ...props }) => (
  <components.Control {...props}>
    <NearMe color="primary" /> {children}
  </components.Control>
)

const style = {
  control: (base) => ({
    ...base,
    border: 0,
    paddingLeft: '4px',
  }),
}

function DashboardInspectors({
  headData,
  regions,
  districts,
  setRegionIdForDistrict,
  regionIdForDistrict,
  setDistrictId,
  districtId,
  inspectorsData,
  offset,
  setOffset,
  limit,
  setLimit,
  setSearch,
  range,
  setRange,
  title,
  isRegistered,
  activeTab,
  setActiveTab,
  searchParams,
}) {
  const districtRef = useRef(null)
  const { roleId } = useSelector((state) => state.auth)

  const [canClear, setCanClear] = useState(false)

  const tabElements = [
    { key: 0, title: 'Tizimga kirganlar' },
    { key: 1, title: 'Tizimga kirmaganlar' },
  ]
  const params = getSearchParams(searchParams)
  return (
    <div className="h-screen">
      <Header title={title} backLink={-1} />
      <FilterHeader
        leftElements={[
          <Input
            addonBefore={<SearchIcon fontSize="medium" className="text-primary" />}
            placeholder="Qidirish..."
            onChange={(e) => setSearch(e.target.value)}
            name="search"
          />,
          <FilterHeaderRightElements />,
        ]}
      />
      <div className="sidebar-header-calc">
        <BasicLayout
          header={
            isRegistered && (
              <MuiTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                elements={tabElements}
                limit={limit}
                offset={offset}
                getParamsFromLocation={false}
              />
            )
          }
          rightElement={
            <NavLink to="add">
              <BtnFiled color="blue" leftIcon={<AddIcon />}>
                Qo'shish
              </BtnFiled>
            </NavLink>
          }
          footer={
            <Pagination
              count={inspectorsData.data?.data?.data?.count}
              pageCount={limit}
              onChange={(pageNumber) => setOffset(pageNumber)}
              currentPage={offset}
              onChangeLimit={(limitNumber) => {
                setLimit(limitNumber)
              }}
              limit={limit}
              searchParams={params}
            />
          }
        >
          <BasicTable
            offset={offset}
            limit={limit}
            headColumns={headData}
            bodyColumns={inspectorsData.data?.data?.data?.objects}
            rowLink={'/dashboard-republic/inspector'}
            sendIdKey="user_id"
            isLoading={inspectorsData.isLoading}
            colTextCenter={true}
          />
        </BasicLayout>
      </div>
    </div>
  )
}

export default DashboardInspectors
