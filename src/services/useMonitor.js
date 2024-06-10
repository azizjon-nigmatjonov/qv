import { useMutation, useQuery } from 'react-query'
import { serviceActionTypes } from '../settings/constants'
import { request } from './http-client'

const getMonitorSettings = (key) =>
  request
    .get(`/monitor-settings`, {
      params: { key },
    })
    .then((res) => res.data.data)

const updateMonitorSettings = (data) => request.patch('/monitor-settings', data)

const defaultQueryProps = {
  enabled: false,
}

export const useMonitor = ({ key, updateMutationProps } = {}) => {
  const monitorSettings = useQuery([serviceActionTypes.GET_MONITOR_SETTINGS, key], () => getMonitorSettings(key), {
    enabled: !!key,
  })

  const updateMutation = useMutation(updateMonitorSettings, updateMutationProps)

  return {
    monitorSettings,
    updateMutation,
  }
}
