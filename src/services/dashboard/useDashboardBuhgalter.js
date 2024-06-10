import { useQuery } from 'react-query'
import { serviceActionTypes } from '../../settings/constants'
import { request } from '../http-client'

const getAnalytics = (params) => request.get('/accountant/dashboard', { params })

const defaultParams = {
  enabled: false,
}

export const useDashboardBuhgalter = ({ list_by, list_by_value, from_date, to_date, getAnalyticsProps }) => {
  const getDashboardDataQuery = useQuery(
    [serviceActionTypes.GET_DASHBOARD_BUHGALTER, list_by, list_by_value, from_date, to_date],
    () => getAnalytics({ list_by, list_by_value, from_date, to_date }),
    getAnalyticsProps
  )

  return {
    getDashboardDataQuery,
  }
}
