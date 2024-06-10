import { useMutation, useQuery } from 'react-query'
import { serviceActionTypes } from '../settings/constants'
import { request } from './http-client'

const getChecklist = (objectId, params) =>
  request
    .get(`/object/${objectId}/checklist`, {
      params,
    })
    .then((res) => res.data.data)
const getChecklistOne = (id) => request.get(`/checklist/${id}`).then((res) => res.data.data)
const createChecklist = async (data) => request.post('checklist', data)

const defaultQueryProps = {
  enabled: false,
}

export const useChecklist = ({
  id,
  offset = 1,
  limit = 100000,
  createMutationProps,
  checklistQueryProps = defaultQueryProps,
  objectId,
} = {}) => {
  const createMutation = useMutation(createChecklist, createMutationProps)

  const checklistOne = useQuery([serviceActionTypes.GET_CHECKLIST, id], () => getChecklistOne(id), {
    enabled: !!id,
  })

  const checklist = useQuery(
    [serviceActionTypes.GET_CHECKLISTS, offset, limit, objectId],
    () => getChecklist(objectId, { offset, limit }),
    { ...checklistQueryProps, keepPreviousData: true, enabled: !!objectId }
  )

  return {
    checklistOne,
    checklist,
    createMutation,
  }
}
