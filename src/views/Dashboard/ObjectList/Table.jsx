import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useOutletContext, useParams, useSearchParams } from 'react-router-dom'
import { useObject } from '../../../services'
import { tableHeadData } from './headData'
import TableContext from './tableContext'
import TableUI from './TableUI'

export default function RepublicDashboardObjectTable() {
  const { analyticSection, userId, regionId } = useParams()
  const [limit, setLimit] = useState(10)
  const [offset, setOffset] = useState(1)
  const [activeTab, setActiveTab] = useState(0)
  const [searchParams, setSearchParams] = useSearchParams()
  const searchParamsMemo = useMemo(() => Object.fromEntries([...searchParams]), [searchParams])
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const headColumns = useMemo(() => {
    let columns = tableHeadData
    return columns
  }, [])
  function statusIdTake(status) {
    switch (status) {
      case 'completed':
        return 'be3623e7-78f5-48f6-8135-edf3731a838c'
      case 'in_progress_with_new':
        return 'e4bdf226-dae8-46aa-a152-38c4d19889f5'
      case 'stopped_by_inspector':
        return 'd2fd8089-d7e3-43cc-afe8-9080bf9c0107'
      case 'stopped_by_builder':
        return 'b50a4eaa-9f68-40ae-83ab-e1971c0ea114'
      case 'objectHistoryTab':
        return 'be3623e7-78f5-48f6-8135-edf3731a838c'
      default:
        return undefined
    }
  }
  const { objects } = useObject({
    objectsQueryProps: {
      enabled: true,
    },
    // start_date: format(searchParamsMemo.startDate || new Date('0001-01-01'), 'yyyy-MM-dd'),
    // end_date: format(searchParamsMemo.endDate || new Date(), 'yyyy-MM-dd'),
    offset: offset,
    limit: limit,
    user_id: userId,
    search: searchParamsMemo.search,
    district: !userId ? searchParamsMemo.districtId : undefined,
    region_id: !userId ? searchParamsMemo.regionId || regionId : undefined,
    object_type:
      searchParamsMemo.tabsInner != 0
        ? searchParamsMemo.tabsInner
        : searchParamsMemo.objectType != 0
        ? searchParamsMemo.objectType
        : undefined,
    sector_id: searchParamsMemo.sector,
    sector_ids: searchParamsMemo.sector_ids,
    category_id: searchParamsMemo.stateProgram,
    status_id: statusIdTake(searchParamsMemo.status),
    start_date: searchParamsMemo.startDate,
    end_date: searchParamsMemo.endDate,
    difficulty_category_id: searchParamsMemo.difficulity,
  })
  const tabElements = [
    {
      key: 0,
      title: 'Obyektlar',
    },
    {
      key: 1,
      title: 'Obyektlar tarixi',
    },
  ]
  useEffect(() => {
    if (activeTab === 0) {
      setSearchParams({ ...searchParamsMemo, status: 'objectTab' })
    } else {
      setSearchParams({
        ...searchParamsMemo,
        status: 'objectHistoryTab',
      })
    }
  }, [activeTab, setSearchParams])
  return (
    <TableContext.Provider
      value={{
        searchParams: searchParamsMemo,
        setSearchParams,
        analyticSection,
        headColumns,
        data: objects,
        navigate,
        limit,
        setLimit,
        offset,
        setOffset,
        tabElements,
        activeTab,
        setActiveTab,
      }}
    >
      <TableUI />
    </TableContext.Provider>
  )
}
