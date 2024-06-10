import { useQuery } from 'react-query'
import { serviceActionTypes } from '../../settings/constants'
import { request } from '../http-client'

const getLinearObjects = (params) => request.get(`/registration-linear-log`, { params }).then((res) => res.data)

export const useGetLinearObjects = ({
  offset,
  limit,
  search,
  regionId,
  isHistory,
  isRegistration,
  getLinearObjectsQueryProps = { enabled: false },
}) => {
  const getLinearObjectsQuery = useQuery(
    [
      serviceActionTypes.GET_LINEAR_OBJECTS,
      { offset, limit, is_history: isHistory, search, region_id: regionId, is_registration: isRegistration },
    ],
    () =>
      getLinearObjects({
        limit,
        offset,
        search,
        region_id: regionId,
        is_history: isHistory,
        is_registration: isRegistration,
      }),
    getLinearObjectsQueryProps
  )

  return {
    getLinearObjectsQuery,
  }
}
