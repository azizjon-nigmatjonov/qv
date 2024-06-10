import { BasicLayout, BasicTable, Header, Pagination } from '../../../components'
import { hoc } from '../../../utils/hoc'
import { useOperatorApplicationProps } from './useOperatorApplicationProps'

export const OperatorApplication = hoc(
  useOperatorApplicationProps,
  ({ limit, setLimit, offset, setOffset, headData, bodyData, isLoading, count, navigate }) => {
    return (
      <div className="h-screen">
        <Header title="Foydalanishga topshirishga kelgan arizalar" titleLength={42} />
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
              desiredRowName="id"
              desiredRowName2="kadastr_number"
              clickHandler={(id, cadastralNumber) => {
                bodyData.find((data) => data?.id === id)?.status === 'connecting'
                  ? navigate(`/applications/${id}/objects/${cadastralNumber}`)
                  : navigate(`/applications/${id}`)
              }}
            />
          </BasicLayout>
        </div>
      </div>
    )
  }
)
