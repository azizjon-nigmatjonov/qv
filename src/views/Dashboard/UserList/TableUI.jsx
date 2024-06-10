import { useContext, useMemo } from 'react'
import { createSearchParams } from 'react-router-dom'
import { BasicLayout, BasicTable, Pagination } from '../../../components'
import TableContext from './tableContext'

export default function TableUI() {
  const {
    type,
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
  } = useContext(TableContext)
  const sourceData = useMemo(() => {
    return data?.data?.data?.data?.objects?.map(item => ({
      ...item,
      objects_count: {
        registered: item?.objects_count
      }
    }))
  }, [data?.data?.data?.data?.objects])
  return (
    <BasicLayout
      footer={
        <Pagination
          count={data?.data?.data?.data?.count}
          onChange={(pageNumber) => setOffset(pageNumber)}
          currentPage={offset}
          onChangeLimit={(limitNumber) => {
            setLimit(limitNumber)
          }}
          limit={limit}
          searchParams={searchParams}
        />
      }
    >
      <BasicTable
        colTextCenter
        limit={limit}
        offset={offset}
        desiredRowName="id"
        desiredRowName2="user_id"
        clickHandler={(id, user_id) => {
          if (searchParams.districtId) {
            navigate({
              pathname: user_id,
              search: `?${createSearchParams(searchParams)}`,
            })
          } else {
            navigate({
              pathname: id,
              search: `?${createSearchParams(searchParams)}`,
            })
          }
        }}
        headColumns={headColumns}
        bodyColumns={sourceData}
        isLoading={data?.isLoading}
      />
    </BasicLayout>
  )
}
