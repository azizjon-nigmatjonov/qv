import { createSearchParams, useSearchParams } from 'react-router-dom'
import { AddIcon } from '../../../assets/icons'
import { BasicLayout, BasicTable, BtnFiled, Header, MuiTabs, Pagination } from '../../../components'
import { hoc } from '../../../utils/hoc'
import { useBasicsProps } from './basics.props'

export const Basics = hoc(
  useBasicsProps,
  ({
    handleOnClick,
    headData,
    bodyData,
    offset,
    limit,
    isLoading,
    tabElements,
    count,
    setLimit,
    setOffset,
    activeTab,
    setActiveTab,
    navigate,
  }) => {
    const [searchParams] = useSearchParams()
    console.log(limit, offset)
    return (
      <div className="h-screen">
        <Header
          title="Asoslar"
          rightElement={
            <BtnFiled onClick={handleOnClick} leftIcon={<AddIcon />}>
              Qo`shish
            </BtnFiled>
          }
        />
        <div className="p-4">
          <BasicLayout
            header={
              <MuiTabs
                elements={tabElements}
                getParamsFromLocation={false}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            }
            footer={
              <Pagination
                count={count}
                pageCount={limit}
                onChange={(pageNumber) => setOffset(pageNumber)}
                currentPage={offset}
                onChangeLimit={(limitNumber) => {
                  setLimit(limitNumber)
                }}
                limit={limit}
              />
            }
          >
            <BasicTable
              tableScroll
              desiredRowName="id"
              clickHandler={(id) => {
                navigate({
                  pathname: id,
                  search: `?type=${searchParams.get('type')}`,
                })
              }}
              offset={offset}
              limit={limit}
              headColumns={headData}
              bodyColumns={bodyData}
              isLoading={isLoading}
            />
          </BasicLayout>
        </div>
      </div>
    )
  }
)
