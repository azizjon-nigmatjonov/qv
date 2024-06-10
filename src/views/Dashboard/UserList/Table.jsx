import { format } from 'date-fns'
import { useMemo, useState } from 'react'
import { useNavigate, useOutletContext, useParams, useSearchParams } from 'react-router-dom'
import { useObject } from '../../../services'
import { useDashboardInspection } from '../../../services/dashboard'
import {
  AUTHOR_SUPERVISOR_ROLE_ID,
  BOSH_PRORAB_ROLE_ID,
  BUYURTMACHI_ROLE_ID,
  ICHKI_NAZORATCHI_ROLE_ID,
  INSPEKTOR_BOSH_ROLE_ID,
  INSPEKTOR_PRASTOY_ROLE_ID,
  INSPEKTOR_YETAKCHI_ROLE_ID,
  LOYIHACHI_ROLE_ID,
  REPUBLIC_APPARAT_ROLE_ID,
  TEXNIK_NAZORATCHI_ROLE_ID,
} from '../../../settings/constants'
import dateFormatter from '../../../utils/dateFormatter'
import TableContext from './tableContext'
import TableUI from './TableUI'
import { tableHeadData } from './usersHeadData'

export default function RepublicDashboardUserTable() {
  const [type] = useOutletContext()
  const { analyticSection } = useParams()
  const [limit, setLimit] = useState(10)
  const [offset, setOffset] = useState(1)
  const [searchParams, setSearchParams] = useSearchParams()
  const searchParamsMemo = useMemo(() => Object.fromEntries([...searchParams]), [searchParams])
  const { regionId, districtId, search, user, userStatus } = searchParamsMemo
  const navigate = useNavigate()
  const headColumns = useMemo(() => {
    let columns = tableHeadData({ userType: searchParamsMemo.user })
    return columns
  }, [searchParamsMemo.user])
  
  const roles = {
    inspectors: [INSPEKTOR_BOSH_ROLE_ID, INSPEKTOR_YETAKCHI_ROLE_ID, INSPEKTOR_PRASTOY_ROLE_ID],
    technical_supervisors: [BUYURTMACHI_ROLE_ID, TEXNIK_NAZORATCHI_ROLE_ID],
    author: [LOYIHACHI_ROLE_ID, AUTHOR_SUPERVISOR_ROLE_ID],
    foreman: [BOSH_PRORAB_ROLE_ID],
    internal_supervisors: [ICHKI_NAZORATCHI_ROLE_ID],
  }
  const { getDashboardInspectionQuery } = useDashboardInspection({
    getDashboardInspectionQueryParams: {
      offset,
      limit,
      search,
      start_date: dateFormatter(format, searchParamsMemo?.startDate, 'yyyy-MM-dd') || '2020-01-01',
      end_date:
        dateFormatter(format, searchParamsMemo?.endDate, 'yyyy-MM-dd') ||
        dateFormatter(format, new Date(), 'yyyy-MM-dd'),
      role_id: `${roles[user]}`,
      region_id: regionId,
      district_id: districtId,
      is_active: analyticSection === 'registered' ? userStatus === '4' : false,
      is_not_active: analyticSection === 'registered' ? userStatus === '5' : false,
      object_type: searchParamsMemo.tabsInner ? searchParamsMemo.tabsInner : undefined,
    },
  })

  return (
    <TableContext.Provider
      value={{
        searchParams: searchParamsMemo,
        setSearchParams,
        type,
        analyticSection,
        headColumns,
        data: getDashboardInspectionQuery,
        navigate,
        limit,
        setLimit,
        offset,
        setOffset,
      }}
    >
      <TableUI />
    </TableContext.Provider>
  )
}
