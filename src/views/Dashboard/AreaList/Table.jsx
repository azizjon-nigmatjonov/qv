import { format } from 'date-fns'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { createSearchParams, useNavigate, useOutletContext, useParams, useSearchParams } from 'react-router-dom'
import { useDashboardRepublic } from '../../../services/dashboard'
import { tabName } from './data'
import { INSPEKSIYA_BOSHLIGI_ROLE_ID } from '../../../settings/constants'
import { footerColumns, tableHeadData } from './headData'
import TableContext from './tableContext'
import TableUI from './TableUI'
function statusMake(status, choice) {
  switch (choice) {
    case 'objects':
      switch (status) {
        case 'count':
          return 'registered'
        case 'in_progress_with_new':
          return 'in_process'
        case 're_formalized_object':
          return 're_formalized'
        default:
          return status
      }
    case 'regulations':
      switch (status) {
        case 'count':
          return 'given'
        case 'in_progress':
          return 'in_process'
        default:
          return status
      }
    case 'violations':
      switch (status) {
        case 'inprogress':
          return 'in_process'
        default:
          return status
      }
    default:
      return status
  }
}
export default function RepublicDashboardTable() {
  const [type] = useOutletContext()
  const { analyticSection } = useParams()
  const { isRepublic } = useSelector((state) => state.auth)
  const [searchParams, setSearchParams] = useSearchParams()
  const searchParamsMemo = useMemo(() => Object.fromEntries([...searchParams]), [searchParams])
  const navigate = useNavigate()
  const { regionId, roleId } = useSelector((state) => state.auth)
  const headColumns = useMemo(() => {
    let columns = tableHeadData({ type, sector: analyticSection, userType: searchParamsMemo.user })
    return columns
  }, [type, analyticSection, searchParamsMemo.user])
  const { dashboardRepublicObjectsByLocationQuery, dashboardRepublicUsersByLocationQuery } = useDashboardRepublic({
    dashboardRepublicObjectsByLocationQueryParams: {
      region_id: isRepublic ? searchParamsMemo.regionId : regionId,
      district_id: searchParamsMemo.districtId,
      start_date: searchParamsMemo.startDate || '0001-01-01',
      end_date: searchParamsMemo.endDate || format(new Date(), 'yyyy-MM-dd'),
      choice: analyticSection,
      status: statusMake(searchParamsMemo.status, analyticSection),
      object_type: searchParamsMemo.objectType != 0 ? searchParamsMemo.objectType : undefined,
      state_program: searchParamsMemo.stateProgram,
      sector: searchParamsMemo.sector,
      difficulty_category_id: searchParamsMemo.difficulity,
    },
    dashboardRepublicUsersByLocationQueryParams: {
      region_id: isRepublic ? searchParamsMemo.regionId : regionId,
      district_id: searchParamsMemo.districtId,
      start_date: searchParamsMemo.startDate,
      end_date: !!searchParamsMemo.startDate ? searchParamsMemo.endDate || format(new Date(), 'yyyy-MM-dd') : undefined,
      search: searchParamsMemo.search,
      tab_name: tabName(searchParamsMemo.user),
      object_type: !!searchParamsMemo.objectType ? searchParamsMemo.objectType : undefined,
      state_program: searchParamsMemo.stateProgram,
      sector: searchParamsMemo.sector,
      tab:
        searchParamsMemo?.userStatus && searchParamsMemo?.userStatus !== 'all'
          ? searchParamsMemo?.userStatus
          : undefined,
    },
    dashboardRepublicObjectsByLocationQueryProps: {
      enabled: type === 'objects',
    },
    dashboardRepublicUsersByLocationQueryProps: {
      enabled: type === 'users',
    },
  })

  const footerColumnsData = useMemo(() => {
    if (!(type === 'users' && !!searchParamsMemo.regionId)) {
      const cols =
        type === 'objects'
          ? dashboardRepublicObjectsByLocationQuery.data?.data?.results
          : dashboardRepublicUsersByLocationQuery?.data?.data?.objects
      let columns = footerColumns(cols, searchParamsMemo.user)
      return columns
    }
  }, [
    dashboardRepublicObjectsByLocationQuery.data?.data?.results,
    dashboardRepublicUsersByLocationQuery,
    searchParamsMemo,
    type,
  ])

  function handleRowClick(location_id) {
    if (!searchParamsMemo?.regionId && isRepublic) {
      setSearchParams({ ...searchParamsMemo, regionId: location_id })
    } else if ((!searchParamsMemo?.districtId && searchParamsMemo?.regionId) || !isRepublic) {
      navigate({
        pathname: 'list',
        search: `?${createSearchParams({ ...searchParamsMemo, districtId: location_id })}`,
      })
    }
  }
  return (
    <TableContext.Provider
      value={{
        searchParams: searchParamsMemo,
        setSearchParams,
        type,
        analyticSection,
        headColumns,
        data: type === 'objects' ? dashboardRepublicObjectsByLocationQuery : dashboardRepublicUsersByLocationQuery,
        footerColumns: footerColumnsData,
        handleRowClick,
      }}
    >
      <TableUI />
    </TableContext.Provider>
  )
}
