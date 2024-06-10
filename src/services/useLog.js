import { useMutation, useQuery } from 'react-query'
import { serviceActionTypes } from '../settings/constants'
import { request } from './http-client'

const getLogs = (objectId, params) =>
  request
    .get(`/object/${objectId}/log/category`, {
      params,
    })
    .then((res) => res.data.data)
const getLogOne = (id, params) => request.get(`/object/${id}/object-log`, { params }).then((res) => res.data?.data)
const createLog = (data) => request.patch('/object', data)

const defaultQueryProps = {
  enabled: false,
}

export const useLog = ({
  id,
  getLogParams,
  createMutationProps,
  logsQueryProps = defaultQueryProps,
  objectId,
} = {}) => {
  const createMutation = useMutation(createLog, createMutationProps)

  const log = useQuery([serviceActionTypes.GET_LOG, id, getLogParams], () => getLogOne(id, getLogParams), {
    enabled: !!id,
  })

  const logs = useQuery([serviceActionTypes.GET_LOGS, getLogParams, objectId], () => getLogs(objectId, getLogParams), {
    ...logsQueryProps,
    keepPreviousData: true,
    enabled: !!objectId,
  })

  return {
    logs,
    log,
    createMutation,
  }
}
