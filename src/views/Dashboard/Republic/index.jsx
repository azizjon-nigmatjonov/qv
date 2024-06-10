import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { FilterHeader, Header } from '../../../components'
import FilterHeaderLeftElements from '../components/FilterHeadLeftElements'
import FilterHeaderRightElements from '../components/FilterHeadRightElements'
import ObjectTypeTabs from '../components/ObjectsTypeTabs'
import { HeadTitle } from '../AreaList/data'
import SmrBossDashboard from '../SmrBoss'
import DashboardRepublicContext from './Context'

export default function RepublicDashboard() {
  const { regionId, isRepublic } = useSelector((state) => state.auth)
  const [searchParams, setSearchParams] = useSearchParams()
  const searchParamsMemo = useMemo(() => Object.fromEntries([...searchParams]), [searchParams])
  const range = useMemo(() => {
    if (searchParamsMemo.startDate && searchParamsMemo.endDate) {
      return [
        {
          key: 'selection',
          startDate: new Date(searchParamsMemo.startDate),
          endDate: new Date(searchParamsMemo.endDate),
        },
      ]
    }
    return [
      {
        endDate: new Date(),
        startDate: '0001-01-01',
        key: 'selection',
      },
    ]
  }, [searchParamsMemo])
  return (
    <div>
      <Header title={<HeadTitle />} centerElement={<ObjectTypeTabs />} />
      <FilterHeader leftElements={[<FilterHeaderLeftElements />]} rigthElements={[<FilterHeaderRightElements />]} />
      <div className="sidebar-header-calc">
        <DashboardRepublicContext.Provider
          value={{
            regionId,
            range,
            districtId: searchParamsMemo.districtId,
            regionIdForDistrict: searchParamsMemo.regionId,
            isRepublic,
          }}
        >
          <SmrBossDashboard context={DashboardRepublicContext} />
        </DashboardRepublicContext.Provider>
      </div>
    </div>
  )
}
