import { useMutation, useQuery } from 'react-query'
import { serviceActionTypes } from '../settings/constants'
import { AuthUrl, request } from './http-client'

const createRotation = (data) => request.post(`${AuthUrl}/rotation`, data).then((res) => res.data.data)
const getRotations = (params) => request.get(`${AuthUrl}/rotation`, { params }).then((res) => res.data.data)
const defaultQueryProps = {
  enabled: false,
}

const useRotation = ({
  inspector_id,
  createRotationProps,
  rotationsProps = defaultQueryProps,
  offset,
  limit,
  search,
  region_id,
  user_id,
}) => {
  const rotations = useQuery(
    [serviceActionTypes.GET_ROTATIONS, offset, limit, search, region_id, user_id],
    () =>
      getRotations({
        offset,
        limit,
        search,
        region_id,
        inspector_id,
        user_id,
      }),
    {
      enabled: rotationsProps.enabled,
    }
  )
  const rotationCreateMutation = useMutation(createRotation, createRotationProps)
  return {
    rotationCreateMutation,
    rotations,
  }
}

export default useRotation
