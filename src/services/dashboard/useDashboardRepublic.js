import { useQuery } from 'react-query'
import { serviceActionTypes } from '../../settings/constants'
import { request } from '../http-client'
const baseAnalyticsUrl = process.env.REACT_APP_URL_ANALYTICS
const getDashboardRepublic = (params) =>
  request.get(baseAnalyticsUrl + '/dashboard-republic', { params }).then((res) => res.data)

const getDashboardObjects = (params) =>
  request.get(baseAnalyticsUrl + '/dashboard-objects', { params }).then((res) => res.data)
const getDashboardRepublicObjectsByLocation = (params) =>
  request.get(baseAnalyticsUrl + '/dashboard-objects-by-location', { params }).then((res) => res.data)
const getDashboardRepublicUsersByLocation = (params) =>
  request.get(baseAnalyticsUrl + '/dashboard-users', { params }).then((res) => res.data)
export const useDashboardRepublic = ({
  getDashboardRepublicQueryParams,
  getDashboardRepublicQueryProps,
  getDashboardObjectsParams,
  dashboardRepublicObjectsByLocationQueryParams,
  dashboardRepublicObjectsByLocationQueryProps = { enabled: false },
  getDashboardObjectsProps = { enabled: false },
  dashboardRepublicUsersByLocationQueryParams,
  dashboardRepublicUsersByLocationQueryProps = { enabled: false },
}) => {
  const getDashboardRepublicQuery = useQuery(
    [serviceActionTypes.GET_DASHBOARD_REPUBLIC, getDashboardRepublicQueryParams],
    () => getDashboardRepublic(getDashboardRepublicQueryParams),
    {
      enabled: !!getDashboardRepublicQueryParams?.start_date && !!getDashboardRepublicQueryParams?.end_date,
    }
  )

  const getDashboardObjectsQuery = useQuery(
    [serviceActionTypes.GET_DASHBOARD_REPUBLIC_OBJECTS, getDashboardObjectsParams],
    () => getDashboardObjects(getDashboardObjectsParams),
    getDashboardObjectsProps
  )

  const dashboardRepublicObjectsByLocationQuery = useQuery(
    [serviceActionTypes.GET_DASHBOARD_REPUBLIC_OBJECTS_BY_LOCATION, dashboardRepublicObjectsByLocationQueryParams],
    () => getDashboardRepublicObjectsByLocation(dashboardRepublicObjectsByLocationQueryParams),
    dashboardRepublicObjectsByLocationQueryProps
  )

  const dashboardRepublicUsersByLocationQuery = useQuery(
    [serviceActionTypes.GET_DASHBOARD_REPUBLIC_OBJECTS_BY_LOCATION, dashboardRepublicUsersByLocationQueryParams],
    () => getDashboardRepublicUsersByLocation(dashboardRepublicUsersByLocationQueryParams),
    dashboardRepublicUsersByLocationQueryProps
  )

  return {
    getDashboardRepublicQuery,
    getDashboardObjectsQuery,
    dashboardRepublicObjectsByLocationQuery,
    dashboardRepublicUsersByLocationQuery,
  }
}
