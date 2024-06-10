import { useQuery } from 'react-query'
import { serviceActionTypes } from '../../settings/constants'
import { request } from '../http-client'

const getDashboardInspection = (params) =>
  request.get(`${process.env.REACT_APP_URL_ANALYTICS}/dashboard-inspection`, { params })

export const useDashboardInspection = ({ getDashboardInspectionQueryParams }) => {
  const getDashboardInspectionQuery = useQuery(
    [serviceActionTypes.GET_DASHBOARD_INSPECTION, getDashboardInspectionQueryParams],
    () => getDashboardInspection(getDashboardInspectionQueryParams)
  )

  return {
    getDashboardInspectionQuery,
  }
}
