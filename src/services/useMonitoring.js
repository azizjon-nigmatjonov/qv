import { useQuery } from 'react-query'
import { serviceActionTypes } from '../settings/constants'
import { request } from './http-client'

const getMonitoringList = (objectId, params) =>
  request.get(`/object/${objectId}/monitoring`, { params }).then((res) => res.data)

const defaultQueryProps = {
  enabled: false,
}

export const useMonitoring = ({ objectId, getParams, monitoringQueryProps = defaultQueryProps } = {}) => {
  const monitoringList = useQuery(
    [serviceActionTypes.GET_MONITORING, getParams, objectId],
    () => getMonitoringList(objectId, getParams),
    { ...monitoringQueryProps, keepPreviousData: true, enabled: !!objectId }
  )

  return {
    monitoringList,
  }
}
