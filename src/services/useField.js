import { useMutation, useQuery } from 'react-query'
import { serviceActionTypes } from '../settings/constants'
import { request } from './http-client'

const getCategories = (params) => request.get(`object/category`, { params }).then((res) => res.data)
const getObjectSector = (params) => request.get(`object/sector`, { params }).then((res) => res.data.data)
const getSectorById = (id) => request.get(`object/sector/${id}`).then((res) => res.data.data)
const getCategoryById = (id) => request.get(`object/category/${id}`).then((res) => res.data.data)
const createMergedList = (params) => request.post(`object/sector-category`, params)
const updateMergedList = (params) => request.patch(`object/sector-category`, params)
const createObjectCategory = (params) => request.post(`object/categori`, params)
const createObjectSector = (params) => request.post(`object/sector`, params)

const defaultQueryProps = {
  enabled: false,
}

export const useField = ({
  createMergedListProps,
  updateMergedListProps,
  createCategoryListProps,
  createSectorProps,
  sectorProps = defaultQueryProps,
  categoryProps = defaultQueryProps,
  sectorByIdProps = defaultQueryProps,
  categoryByIdProps = defaultQueryProps,
  getObjectSectorListParams = {},
  getObjectCategoryListParams = {},
  sector_id,
  category_id,
} = {}) => {
  const getObjectSectorList = useQuery(
    [serviceActionTypes.GET_OBJECT_SECTOR_LIST, getObjectSectorListParams],
    () => getObjectSector(getObjectSectorListParams),
    sectorProps
  )
  const getObjectCategoryList = useQuery(
    [serviceActionTypes.GET_OBJECT_CATEGORY_LIST, getObjectCategoryListParams],
    () => getCategories(getObjectCategoryListParams),
    categoryProps
  )
  const getObjectSectorQuery = useQuery(
    [serviceActionTypes.GET_OBJECT_SECTOR, sector_id],
    () => getSectorById(sector_id),
    sectorByIdProps
  )
  const getObjectCategoryQuery = useQuery(
    [serviceActionTypes.GET_OBJECT_CATEGORY, category_id],
    () => getCategoryById(category_id),
    categoryByIdProps
  )
  const createMergedListMutation = useMutation(createMergedList, createMergedListProps)
  const updateMergedListMutation = useMutation(updateMergedList, updateMergedListProps)
  const createObjectCategoryMutation = useMutation(createObjectCategory, createCategoryListProps)
  const createObjectSectorMutation = useMutation(createObjectSector, createSectorProps)

  return {
    getObjectCategoryList,
    getObjectSectorList,
    getObjectSectorQuery,
    getObjectCategoryQuery,
    createMergedListMutation,
    updateMergedListMutation,
    createObjectCategoryMutation,
    createObjectSectorMutation,
  }
}
