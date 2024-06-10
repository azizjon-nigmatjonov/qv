import { NavLink } from 'react-router-dom'
import { AddIcon } from '../../assets/icons'
import { BasicLayout, BasicTable, Header, Pagination, BtnFiled, MuiTabs } from '../../components'
import { hoc } from '../../utils/hoc'
import { useByConfirmationsProps } from './useByConfirmationsProps'

const ByConfirmation = hoc(
  useByConfirmationsProps,
  ({
    activeTab,
    setActiveTab,
    offset,
    setOffset,
    limit,
    setLimit,
    applicationHeadData,
    headData,
    tabElements,
    getClaimsListQuery,
    regulations,
  }) => {
    return (
      <div className="h-screen">
        <Header title="Tasdiqlash bo'yicha" backLink={-1} />
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
                count={activeTab === 2 ? getClaimsListQuery.data?.data?.count : regulations.data?.count}
                pageCount={limit}
                onChange={(pageNumber) => setOffset(pageNumber)}
                currentPage={offset}
                onChangeLimit={(limitNumber) => {
                  setLimit(limitNumber)
                }}
                limit={limit}
              />
            }
            header={<MuiTabs activeTab={activeTab} elements={tabElements} setActiveTab={setActiveTab} />}
          >
            <BasicTable
              headColumns={activeTab === 2 ? applicationHeadData : headData}
              bodyColumns={activeTab === 2 ? getClaimsListQuery.data?.data?.claims : regulations.data?.regulations}
              rowLink={activeTab === 2 ? 'applications' : '/confirmations'}
              isLoading={regulations.isLoading}
            />
          </BasicLayout>
        </div>
      </div>
    )
  }
)

export default ByConfirmation
