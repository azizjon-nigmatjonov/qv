import { BasicLayout, BasicTable, Header, MuiTabs, Pagination } from '../../components'
import WorkIsGoingOn from '../../components/WorkIsGoingOn'
import { hoc } from '../../utils/hoc'
import { useAdministrativeProps } from './administrativeProps'

export const AdministrativeAdmin = hoc(
  useAdministrativeProps,
  ({
    apparat,
    activeTab,
    setActiveTab,
    elements,
    limit,
    setLimit,
    offset,
    setOffset,
    headData,
    bodyData,
    jumpTo,
    count,
    title,
  }) => {
    return (
      <div className="h-screen relative">
        <Header title={title} />
        <div className="header-calc">
          <BasicLayout
            header={<MuiTabs elements={elements} activeTab={activeTab} setActiveTab={setActiveTab} />}
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
              desiredRowName="dxa_response_id"
              desiredRowName2="dxa_linear_response_id"
              desiredRowName3="regulation_id"
              limit={limit}
              offset={offset}
              clickHandler={(dxa_response_id, dxa_linear_response_id, regulation_id) =>
                jumpTo(dxa_response_id, dxa_linear_response_id, regulation_id)
              }
            />
          </BasicLayout>
        </div>
      </div>
    )
  }
)
