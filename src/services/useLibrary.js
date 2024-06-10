import { useMutation, useQuery } from 'react-query'
import { serviceActionTypes } from '../settings/constants'
import { request } from './http-client'

const getLibraries = (params) =>
  request.get(`${process.env.REACT_APP_BASE_URL_ADMIN}/object/library`, { params }).then((res) => res.data)
const getLibrary = (id) =>
  request.get(`${process.env.REACT_APP_BASE_URL_ADMIN}/object/library/${id}`).then((res) => res.data.data)
const getLibraryTypes = () => request.get(`${process.env.REACT_APP_BASE_URL_ADMIN}/object/library-type`).then((res) => res.data)
const createLibrary = (data) => request.post(`${process.env.REACT_APP_BASE_URL_ADMIN}/object/library`, data)
const updateLibrary = (data) => request.patch(`${process.env.REACT_APP_BASE_URL_ADMIN}/object/library`, data)
const deleteLibrary = (data) => request.delete(`${process.env.REACT_APP_BASE_URL_ADMIN}/object/library/${data.id}`)

const defaultQueryProps = {
  enabled: false,
}

export const useLibrary = ({
  offset,
  limit,
  search,
  createLibraryProps,
  deleteLibraryProps,
  id,
  department_id,
  type_id = '',
  getTypesProps = defaultQueryProps,
  libraryProps = defaultQueryProps,
} = {}) => {
  const library = useQuery([serviceActionTypes.GET_LIBRARY], () => getLibrary(id), libraryProps)
  const libraries = useQuery(
    [serviceActionTypes.GET_LIBRARIES, offset, limit, search, department_id, type_id],
    () => getLibraries({ offset, limit, search, department_id, type_id }),
    {
      enabled: true,
    }
  )
  const getTypes = useQuery([serviceActionTypes.GET_LIBRARY_TYPES], () => getLibraryTypes(), getTypesProps)
  const createLibraryMutation = useMutation(createLibrary, createLibraryProps)
  const updateLibraryMutation = useMutation(updateLibrary, createLibraryProps)
  const deleteLibraryMutation = useMutation(deleteLibrary, deleteLibraryProps)

  return {
    libraries,
    library,
    createLibraryMutation,
    updateLibraryMutation,
    deleteLibraryMutation,
    getTypes,
  }
}
