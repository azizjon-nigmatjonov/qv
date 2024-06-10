import { useOutletContext } from 'react-router-dom'
import { BasicLayout, BasicTable, Pagination } from '../../components'

export default function TableOutlet({ isThirdLayer }) {
  const [{ bodyData = {}, limit, offset, setOffset, setLimit, headColumns = [], isLoading, footerColumns }] =
    useOutletContext()
  return (
    <BasicLayout
      footer={
        isThirdLayer && (
          <Pagination
            count={bodyData?.count}
            pageCount={limit}
            onChange={(pageNumber) => setOffset(pageNumber)}
            currentPage={offset}
            onChangeLimit={(limitNumber) => setLimit(limitNumber)}
            limit={limit}
          />
        )
      }
    >
      <BasicTable
        headColumns={headColumns}
        bodyData={bodyData.data}
        footerColumns={footerColumns}
        isLoading={isLoading}
      />
    </BasicLayout>
  )
}
