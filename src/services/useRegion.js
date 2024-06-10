import { useMutation, useQuery } from 'react-query'
import { serviceActionTypes } from '../settings/constants'
import { request } from './http-client'

const getRegionsRequisite = (params) => request.get('/region/requisite', { params }).then((res) => res.data.data)
const getRegions = (params) => request.get('/region', { params }).then((res) => res.data.data)
const getRegionRequisite = ({ id }) => request.get(`/region/requisite/${id}`).then((res) => res.data.data)
const updateRegionRequisite = (data) => request.put('/region/requisite', data)
const updateRegionRequisitePost = (data) => request.post('/region/requisite', data)
const getRegionById = ({ id }) => request.get(`/region/${id}`).then((res) => res.data.data)

export const useRegion = ({
  offset,
  limit,
  id,
  regionProps = { enabled: false },
  regionsParams,
  regionItselfProps = { enabled: false },
  regionIdProps = { enabled: false },
  regionsRequisiteProps = { enabled: false },
  regionRequisiteUpdataProps,
  updateRegionRequisitePostProps,
} = {}) => {
  const regions = useQuery(
    [serviceActionTypes.GET_REGIONS, regionsParams],
    () => getRegions(regionsParams),
    regionProps
  )
  const regionsRequisite = useQuery(
    [serviceActionTypes.GET_REGIONS_REQUISITE],
    () => getRegionsRequisite({ offset, limit }),
    regionsRequisiteProps
  )
  const region = useQuery([serviceActionTypes.GET_REGION, id], () => getRegionRequisite({ id }), regionIdProps)
  const regionItself = useQuery(
    [serviceActionTypes.GET_REGION_ITSELF, id],
    () => getRegionById({ id }),
    regionItselfProps
  )
  const regionRequisiteUpdataMutation = useMutation(updateRegionRequisite, regionRequisiteUpdataProps)
  const regionRequisiteUpdateMutationPost = useMutation(updateRegionRequisitePost, updateRegionRequisitePostProps)
  return {
    regionRequisiteUpdataMutation,
    regionRequisiteUpdateMutationPost,
    regionsRequisite,
    regions,
    region,
    regionItself,
  }
}
