import { BasicLayout, BasicTable, Pagination } from '../../../../components'
import { hoc } from '../../../../utils/hoc'
import { useTableProps } from './table.prop'
export const TableUI = hoc(
  useTableProps,
  ({ handleOnClick, headData, bodyData, count, offset, limit, setOffset, setLimit, isLoading }) => {
    return (
      <BasicLayout
        title="Asoslar jadvali"
        footer={
          <Pagination
            count={count}
            pageCount={limit}
            onChange={(pageNumber) => setOffset(pageNumber)}
            currentPage={offset}
            onChangeLimit={(limitNumber) => setLimit(limitNumber)}
            limit={limit}
          />
        }
      >
        <BasicTable
          tableScroll
          offset={offset}
          limit={limit}
          headColumns={headData}
          bodyColumns={bodyData}
          isLoading={isLoading}
        />
      </BasicLayout>
    )
  }
)
