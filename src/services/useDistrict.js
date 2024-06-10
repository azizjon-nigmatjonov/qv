import { useQuery } from 'react-query'
import { serviceActionTypes } from '../settings/constants'
import { request } from './http-client'

export const getDistricts = (params) => request.get('/district', { params }).then((res) => res.data.data)
const getDistrict = (id) => request.get(`/district/${id}`).then((res) => res.data.data)

export const useDistrict = ({ regionId, id, districtsProps = {} } = {}) => {
  const districts = useQuery(
    [serviceActionTypes.GET_DISTRICTS, regionId],
    () => getDistricts({ region_id: regionId }),
    {
      enabled: !!regionId,
      ...districtsProps,
    }
  )
  const district = useQuery([serviceActionTypes.GET_DISTRICT, id], () => getDistrict(id), {
    enabled: !!id,
  })

  return {
    districts,
    district,
  }
}
