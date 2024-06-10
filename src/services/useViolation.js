import { useMutation, useQuery } from 'react-query'
import { serviceActionTypes } from '../settings/constants'
import { request } from './http-client'

const getViolationsOne = (id) => request.get(`/object/violation/${id}`).then((res) => res.data.data)
const createViolation = (data) => request.post('/object/violation', data)
const updateViolation = (data) => request.patch('/object/violation', data)
const getViolationsStatus = () => request.get('/object/violation-status').then((res) => res.data.data)
const getViolationsByRegulationId = (regulationId, params) =>
  request
    .get(`/object/regulation/${regulationId}/violations`, {
      params: { ...params, limit: 100 },
    })
    .then((res) => res.data.data)
const defaultQueryProps = {
  enabled: false,
}
const createViolationAct = (data) => request.post('object/violation/act', data)

const getSnips = (params) => request.get('/snip').then((res) => res.data)

export const useViolation = ({
  id,
  limit,
  question_id,
  createMutationProps,
  updateMutationProps,
  createActMutationProps,
  violationProps = defaultQueryProps,
  violationsStatusQueryProps = defaultQueryProps,
  regulationId,
  regulationParams,
} = {}) => {
  const createMutation = useMutation(createViolation, createMutationProps)
  const updateMutation = useMutation(updateViolation, updateMutationProps)
  const violationsStatus = useQuery([serviceActionTypes.GET_VIOLATIONS_STATUS], getViolationsStatus, {
    ...violationsStatusQueryProps,
  })

  const violation = useQuery([serviceActionTypes.GET_VIOLATION, id], () => getViolationsOne(id), {
    ...violationProps,
  })

  const snips = useQuery([serviceActionTypes.GET_SNIPS, question_id], () => getSnips({ question_id }), {
    enabled: !!question_id,
  })

  const violations = useQuery(
    [serviceActionTypes.GET_VIOLATION, regulationId, regulationParams],
    () => getViolationsByRegulationId(regulationId, regulationParams),
    {
      enabled: !!regulationId,
    }
  )

  const createMutationAct = useMutation(createViolationAct, createActMutationProps)

  return {
    snips,
    violation,
    createMutation,
    violationsStatus,
    violations,
    updateMutation,
    createMutationAct,
  }
}
