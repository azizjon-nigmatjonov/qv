import { useContext } from 'react'
import { createSearchParams, useLocation } from 'react-router-dom'
import { BasicLayout, BasicTable, MuiTabs, Pagination } from '../../../components'
import { getSearchParams } from '../../../utils/getSearchParams'
import TableContext from './tableContext'

export default function TableUI() {
  const {
    data,
    limit,
    setLimit,
    offset,
    setOffset,
    headColumns,
    navigate,
    footerColumns,
    analyticSection,
    searchParams,
    setSearchParams,
    handleRowClick,
    tabElements,
    activeTab,
    setActiveTab,
  } = useContext(TableContext)
  const params = getSearchParams(searchParams)
  const { pathname } = useLocation()
  return (
    <BasicLayout
      header={
        pathname.includes('analyst') && (
          <MuiTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            elements={tabElements}
            getParamsFromLocation={false}
          />
        )
      } //if there is going to be tabs in other locations too, you better make a new props which comes from routes component from there you can make better condition, checking params is not good options
      footer={
        <Pagination
          count={data?.data?.count}
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
        colTextCenter
        desiredRowName="id"
        clickHandler={(id) => {
          navigate({
            pathname: id + '/',
          })
        }}
        headColumns={headColumns}
        bodyColumns={data?.data?.objects}
        isLoading={data?.isLoading}
        customMaxHeight={'calc(100vh - 300px)'}
      />
    </BasicLayout>
  )
}
