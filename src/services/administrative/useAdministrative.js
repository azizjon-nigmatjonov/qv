import { useMutation, useQuery } from 'react-query'
import { serviceActionTypes } from '../../settings/constants'
import { request } from '../http-client'

const getAdministrative = (params) => request.get('/administrative-registration', { params }).then((res) => res.data)

const getAdministrativeRegulation = (params) =>
  request.get('/administrative-regulation', { params }).then((res) => res.data)

const updateAdministrative = (data) => request.patch('/administrative-registration', data)
const updateAdministrativeSectorCategory = (data) =>
  request.patch(`${process.env.REACT_APP_BASE_URL_ADMIN}/object/sector-category`, data)

const updateAdministrativeRegulation = (data) => request.patch('/administrative-regulation', data)

export const useAdministrative = ({
  getAdministrativeQueryParams,
  getAdministrativeQueryProps = { enabled: false },
  getAdministrativeRegulationParams,
  getAdministrativeRegulationProps = { enabled: false },
  updateAdministrativeRegulationProps,
}) => {
  const getAdministrativeQuery = useQuery(
    [serviceActionTypes.GET_ADMINISTRATIVE, getAdministrativeQueryParams],
    () => getAdministrative(getAdministrativeQueryParams),
    getAdministrativeQueryProps
  )

  const getAdministrativeRegulationQuery = useQuery(
    [serviceActionTypes.GET_ADMINISTRATIVE_REGULATION, getAdministrativeRegulationParams],
    () => getAdministrativeRegulation(getAdministrativeRegulationParams),
    getAdministrativeRegulationProps
  )

  return {
    getAdministrativeQuery,
    getAdministrativeRegulationQuery,
  }
}

export const useAdministrativeUpdate = ({
  updateAdministrativeMutationProps,
  updateAdministrativeRegulationProps,
  updateAdministrativeSectorCategoryProps,
}) => {
  const updateAdministrativeMutation = useMutation(updateAdministrative, {
    ...updateAdministrativeMutationProps,
  })

  const updateAdministrativeRegulationMutation = useMutation(updateAdministrativeRegulation, {
    ...updateAdministrativeRegulationProps,
  })

  const updateAdministrativeSectorCategoryMutation = useMutation(
    updateAdministrativeSectorCategory,
    updateAdministrativeSectorCategoryProps
  )

  return {
    updateAdministrativeMutation,
    updateAdministrativeRegulationMutation,
    updateAdministrativeSectorCategoryMutation,
  }
}
