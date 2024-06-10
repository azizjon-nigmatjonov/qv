import { useMutation, useQuery } from 'react-query'
import { serviceActionTypes } from '../../settings/constants'
import { request } from '../http-client'

const getMeasurementsById = (id) => request.get(`/setting/measurement/${id}`).then((res) => res.data)

const deleteMeasurementById = (data) => request.delete(`/setting/measurement/${data.id}`)

const getMeasurements = (params) => request.get('/setting/measurements', { params }).then((res) => res.data)

const postMeasurements = (data) => request.post('/setting/measurement', data)

const putMeasurement = (data) => request.put(`/setting/measurement/${data.id}`, data)

export const useMeasurements = ({
  id,
  getMeasurementsParams,
  deleteMeasurementByIdProps,
  postMeasurementMutationProps,
  putMeasurementProps,
}) => {
  const postMeasurementMutation = useMutation(postMeasurements, postMeasurementMutationProps)
  const deleteMeasurement = useMutation(deleteMeasurementById, deleteMeasurementByIdProps)
  const putMeasurementMutation = useMutation(putMeasurement, putMeasurementProps)

  const getMeasurementsQuery = useQuery([serviceActionTypes.GET_MEASUREMENTS, getMeasurementsParams], () =>
    getMeasurements(getMeasurementsParams)
  )

  const getMeasurementsByIdQuery = useQuery(
    [serviceActionTypes.GET_MEASUREMENTS_BY_ID, id],
    () => getMeasurementsById(id),
    {
      enabled: !!id,
    }
  )

  return {
    getMeasurementsQuery,
    getMeasurementsByIdQuery,
    deleteMeasurement,
    postMeasurementMutation,
    putMeasurementMutation,
  }
}
