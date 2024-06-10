import { useContext } from 'react'
import { BasicLayout, BasicTable } from '../../../components'
import TableContext from './tableContext'

export default function TableUI() {
  const { type, data, headColumns, footerColumns, handleRowClick } =
    useContext(TableContext)
  return (
    <BasicLayout
    // footer={
    //   <Pagination
    //     count={data?.count}
    //     pageCount={limit}
    //     onChange={(pageNumber) => setOffset(pageNumber)}
    //     currentPage={offset}
    //     onChangeLimit={(limitNumber) => {
    //       setLimit(limitNumber)
    //     }}
    //     limit={limit}
    //   />
    // }
    >
      <BasicTable
        colTextCenter
        desiredRowName="location_id"
        clickHandler={(id) => handleRowClick(id)}
        headColumns={headColumns}
        bodyColumns={type === 'objects' ? data?.data?.data?.results : data?.data?.data?.objects}
        footerColumns={footerColumns}
        isLoading={data?.isLoading}
      />
    </BasicLayout>
  )
}
