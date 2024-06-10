import { useMutation, useQuery } from 'react-query'
import { request } from './http-client'
import { serviceActionTypes } from '../settings/constants'

export const createBlock = (data) => request.post('/block', data).then((res) => res.data)
export const getObjectBlocks = (id) => request.get(`/object/${id}/block`).then((res) => res.data)
export const useBlock = ({ createMutationProps, objectId, getBlocksProps } = {}) => {
  const createMutation = useMutation(createBlock, createMutationProps)
  const getBlocks = useQuery(
    [serviceActionTypes.GET_OBJECT_BLOCKS, objectId],
    () => getObjectBlocks(objectId),
    getBlocksProps
  )
  return {
    getBlocks,
    createMutation,
  }
}
