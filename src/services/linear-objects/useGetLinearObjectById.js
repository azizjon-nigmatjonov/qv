import { useQuery } from 'react-query'
import { serviceActionTypes } from '../../settings/constants'
import { request } from '../http-client'

const getLinearObjectById = (id) => request.get(`/registration-linear/${id}`).then((res) => res.data.data)

export const useGetLinearObjectById = ({ id, getLinearObjectByIdQueryProps = { enabled: false } }) => {
  const getLinearObjectByIdQuery = useQuery(
    [serviceActionTypes.GET_LINEAR_OBJECTS_BY_ID, id],
    () => getLinearObjectById(id),
    getLinearObjectByIdQueryProps
  )

  return {
    getLinearObjectByIdQuery,
  }
}
