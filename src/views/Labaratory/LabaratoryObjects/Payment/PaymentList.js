import { useState } from 'react'
import { Header, Tabs, BasicLayout, BasicTable, Pagination, BtnFiled } from '../../../../components'
import { useQuery } from '../../../../hooks/useQuery'
import { DownloadIcon, AddIcon } from '../../../../assets/icons'
import { permissions } from '../../../../settings/permissions'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { BUXGALTER_ROLE_ID } from '../../../../settings/constants'

function PaymentList() {
  const query = useQuery()
  const { roleId } = useSelector((state) => state.auth)
  const [offset, setOffset] = useState(+query.get('offset') || 1)
  const [limit, setLimit] = useState(+query.get('limit') || 10)

  const tabLinks = [
    {
      key: 'main-info',
      title: 'Umumiy ma`lumot',
      path: `/objects/${123}`,
    },
    {
      key: 'payment',
      title: 'To`lov',
      path: `/objects/${123}/payment`,
    },
  ]

  const headData = [
    {
      title: '№',
      key: 'order',
    },
    {
      title: 'Sana',
      key: 'date',
    },
    {
      title: 'Fayl',
      key: 'file',
    },
    {
      title: 'Summa',
      key: 'object_payment',
    },
  ]

  return (
    <>
      <div className="h-screen">
        <Header
          title=""
          backLink="/inspectors"
          centerElement={<Tabs elements={tabLinks} />}
          rightElement={
            BUXGALTER_ROLE_ID === roleId && (
              <NavLink to="add">
                <BtnFiled color="blue" leftIcon={<AddIcon />}>
                  Fayl yuklash
                </BtnFiled>
              </NavLink>
            )
          }
        />
        <div className="sidebar-header-calc">
          <BasicLayout
            footer={
              <Pagination
                count={90}
                pageCount={limit}
                onChange={(pageNumber) => setOffset(pageNumber)}
                currentPage={offset}
                onChangeLimit={(limitNumber) => setLimit(limitNumber)}
                limit={limit}
              />
            }
          >
            <BasicTable
              offset={offset}
              limit={limit}
              headColumns={headData}
              //   bodyColumns={}
              //   rowLink={}
              isLoading={false}
            />
          </BasicLayout>
        </div>
      </div>
    </>
  )
}

export default PaymentList
