import { useMutation, useQuery } from 'react-query'
import { serviceActionTypes } from '../settings/constants'
import { request } from './http-client'

const getRegulationsOne = (id) => request.get(`/object/regulation/${id}`).then((res) => res.data.data)
const getRegulationsByObjectId = (objectId, params) =>
  request.get(`/object/${objectId}/object-regulation`, { params }).then((res) => res.data.data)
const getRegulations = (params) => request.get('/object/regulation', { params }).then((res) => res.data.data)
const getDxaRegulations = (params) => request.get('/object/dxa-regulation', { params }).then((res) => res.data.data)
const createDxaRegulationFile = (id) => request.post(`/object/dxa-regulation/${id}`).then((res) => res.data.data)
const createRegulation = (data) => request.post('/object/regulation', data).then((res) => res.data)
const updateRegulation = (data) => request.patch('/object/regulation/status-log', data).then((res) => res.data)
const updateRegulationDeadline = (data) => request.patch('/object/regulation-deadline', data).then((res) => res.data)
const getRegulationStatus = () => request.get('/object/regulation-status').then((res) => res.data.data)
const getRegulationTypes = () => request.get('/object/regulation-type').then((res) => res.data.data)
const getObjectStatusLog = (regulationId) =>
  request.get(`/object/regulation/${regulationId}/status-log`).then((res) => res.data.data)
const getRegulationByUser = (params) => request.get('/object/regulation', { params }).then((res) => res.data.data)
const getActsByRegulation = (id, params) =>
  request.get(`/object/regulation/${id}/act-status`, { params }).then((res) => res.data)

const defaultQueryProps = {
  enabled: false,
}

export const useRegulation = ({
  id,
  regulationId,
  actsByRegulationProps = defaultQueryProps,
  actsByRegulationParams,
  createMutationProps,
  updateMutationProps,
  regulationStatusQueryProps = defaultQueryProps,
  regulationTypesQueryProps = defaultQueryProps,
  regulationByUserProps = defaultQueryProps,
  updateRegulationDeadlineProps,
  regulationParams,
  regulationProps,
  regulationByUserParams,
  regulationsQueryProps = defaultQueryProps,
  regulationsDxaQueryProps = defaultQueryProps,
  createDxaRegulationFileProps,
  getRegulationsOneProps,
  objectId,
  regulationStatusLogQueryProps = {
    id: null,
  },
} = {}) => {
  const createMutation = useMutation(createRegulation, createMutationProps)
  const regulationDxaFile = useMutation(createDxaRegulationFile, createDxaRegulationFileProps)
  const updateMutation = useMutation(updateRegulation, updateMutationProps)
  const updateRegulationDeadlineMutation = useMutation(updateRegulationDeadline, updateRegulationDeadlineProps)
  const regulationStatus = useQuery([serviceActionTypes.GET_REGULATION_STATUS], getRegulationStatus, {
    ...regulationStatusQueryProps,
  })
  const statusLogs = useQuery(
    [serviceActionTypes.GET_REGULATION_STATUS_LOG],
    () => getObjectStatusLog(regulationStatusLogQueryProps.id),
    {
      enabled: !!regulationStatusLogQueryProps.id,
    }
  )
  const regulationTypes = useQuery([serviceActionTypes.GET_REGULATION_TYPE], getRegulationTypes, {
    ...regulationTypesQueryProps,
  })
  const regulationsByObjectId = useQuery(
    [serviceActionTypes.GET_REGULATIONS, objectId, regulationParams],
    () => getRegulationsByObjectId(objectId, regulationParams),
    !!regulationProps
      ? regulationProps
      : {
          enabled: !!objectId && !!regulationParams?.type_id,
        }
  )
  const regulations = useQuery(
    [serviceActionTypes.GET_REGULATIONS, regulationParams],
    () => getRegulations(regulationParams),
    regulationsQueryProps
  )
  const regulationsDxa = useQuery(
    [serviceActionTypes.GET_REGULATIONS_DXA, regulationParams],
    () => getDxaRegulations({ object_id: objectId }),
    regulationsDxaQueryProps
  )
  const regulation = useQuery([serviceActionTypes.GET_REGULATION, id], () => getRegulationsOne(id), {
    enabled: !!id,
    ...getRegulationsOneProps,
  })
  const regulationByUser = useQuery(
    [serviceActionTypes.GET_REGULATION_BY_USER, regulationByUserParams],
    () => getRegulationByUser(regulationByUserParams),
    regulationByUserProps
  )
  const actsByRegulation = useQuery(
    [serviceActionTypes.GET_REGULATION_BY_ACT_STATUS, regulationId, actsByRegulationParams],
    () => getActsByRegulation(regulationId, actsByRegulationParams),
    actsByRegulationProps
  )

  return {
    regulation,
    createMutation,
    regulationStatus,
    regulationTypes,
    regulations,
    regulationsDxa,
    regulationDxaFile,
    regulationByUser,
    updateMutation,
    regulationsByObjectId,
    updateRegulationDeadlineMutation,
    actsByRegulation,
    statusLogs,
  }
}
