import { BasicLayout, BasicTable, Header, Pagination } from '../../../components'
import { hoc } from '../../../utils/hoc'
import { useOperatorHistoryProps } from './useOperatorHistoryProps'

export const OperatorHistory = hoc(
  useOperatorHistoryProps,
  ({ headData, count, setOffset, offset, limit, setLimit, bodyData, isLoading }) => {
    return (
      <div className="h-screen">
        <Header title="Arxiv" />
        <div className="sidebar-header-calc">
          <BasicLayout
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
              headColumns={headData}
              bodyColumns={bodyData}
              offset={offset}
              limit={limit}
              isLoading={isLoading}
              rowLink="/history"
            />
          </BasicLayout>
        </div>
      </div>
    )
  }
)
