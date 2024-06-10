import { useMutation, useQuery } from 'react-query'
import { serviceActionTypes } from '../../settings/constants'
import { request } from '../http-client'

const getTestTypes = (params) => request.get(`/setting/test-types`, { params }).then((res) => res.data)
const getTestTypeById = (id) => request.get(`/setting/test-type/${id}`).then((res) => res.data?.data)

const postTestType = (data) => request.post(`/setting/test-type`, data)
const putTestType = (data) => request.put(`/setting/test-type/${data.id}`, data)
const deleteTestType = (data) => request.delete(`/setting/test-type/${data.id}`)

export const useTestTypes = ({
  id,
  getTestTypesParams,
  deleteTestTypeProps,
  getTestTypesProps = { enabled: false },
  postTestTypeMutationProps,
  putTestTypeMutationProps,
}) => {
  const getTestTypesQuery = useQuery(
    [serviceActionTypes.GET_TEST_TYPES, getTestTypesParams],
    () => getTestTypes(getTestTypesParams),
    getTestTypesProps
  )

  const getTestTypeByIdQuery = useQuery([serviceActionTypes.GET_TEST_TYPES_ID, id], () => getTestTypeById(id), {
    enabled: !!id,
  })

  const deleteTestTypeMutation = useMutation(deleteTestType, deleteTestTypeProps)

  const postTestTypeMutation = useMutation(postTestType, postTestTypeMutationProps)

  const putTestTypeMutation = useMutation(putTestType, putTestTypeMutationProps)

  return {
    getTestTypesQuery,
    deleteTestTypeMutation,
    getTestTypeByIdQuery,
    postTestTypeMutation,
    putTestTypeMutation,
  }
}
