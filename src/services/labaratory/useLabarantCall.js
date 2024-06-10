import { useMutation, useQuery } from 'react-query'
import { serviceActionTypes } from '../../settings/constants'
import { request } from '../http-client'

const createLabarant = (data) => request.post('/labarant/call', data)
const changeLabarant = (data) => request.put('/labarant/call', data)
const getLabarant = (params) => request.get('/labarant/called', { params })

export const useLabarantCall = ({
  createLabarantMutationProps = {},
  getLabarantQueryProps = { enabled: false },
  getLabarantQueryParams,
  changeLabarantMutationProps = {},
}) => {
  const createLabarantMutation = useMutation(createLabarant, createLabarantMutationProps)
  const changeLabarantMutation = useMutation(changeLabarant, changeLabarantMutationProps)

  const getLabarantQuery = useQuery(
    [serviceActionTypes.GET_LABARANT_OBJECTS, getLabarantQueryParams],
    () => getLabarant(getLabarantQueryParams),
    getLabarantQueryProps
  )

  return {
    createLabarantMutation,
    changeLabarantMutation,
    getLabarantQuery,
  }
}
