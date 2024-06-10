import { useQuery } from '../../hooks/useQuery'
import { serviceActionTypes } from '../../settings/constants'
import { request } from '../http-client'

const getLabaratoryInfo = (id) => request.get(`/labaratorys/${id}`).then((res) => res.data.data)

const defaultQueryProps = {
  enabled: false,
}
export default function useLabaratoryInfo({ regionId, labaratoryInfoQueryProps = defaultQueryProps }) {
  const labaratoryInfo = useQuery(
    [serviceActionTypes.GET_LABARATORY_INFO, regionId],
    () => getLabaratoryInfo(regionId),
    labaratoryInfoQueryProps
  )

  return {
    labaratoryInfo,
  }
}
