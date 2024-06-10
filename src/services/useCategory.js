import { useQuery } from 'react-query'
import { serviceActionTypes } from '../settings/constants'
import { request } from './http-client'

const getCategories = (params) => request.get(`/object/log/category`, params).then((res) => res.data.data)
const getCategoryByObjectId = (params) =>
  request.get(`/object/${params.id}/log/category`, { params }).then((res) => res.data.data)

const defaultQueryProps = {
  enabled: false,
}

export const useCategory = ({ getLogParams, logsQueryProps = defaultQueryProps, offset, limit, object_id } = {}) => {
  const categories = useQuery([serviceActionTypes.GET_CATEGORIES, getLogParams], () => getCategories(getLogParams), {
    ...logsQueryProps,
    keepPreviousData: true,
  })

  const categoryByObjectId = useQuery(
    [serviceActionTypes, offset, limit],
    () => getCategoryByObjectId({ offset, limit, id: object_id }),
    {
      enabled: !!object_id,
    }
  )
  return {
    categories,
    categoryByObjectId,
  }
}
