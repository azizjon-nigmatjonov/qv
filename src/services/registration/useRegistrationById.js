import { useQuery } from 'react-query'
import { serviceActionTypes } from '../../settings/constants'
import { request } from '../http-client'

const getRegistration = (params, isLinear) =>
  request.get(`/registration${isLinear ? '-linear' : ''}/${params.id}`).then((res) => res.data.data)

export const useRegistrationById = ({ id, isLinear, registrationProps }) => {
  const registration = useQuery(
    [serviceActionTypes.GET_REGISTRATION, id],
    () => getRegistration({ id }, isLinear),
    registrationProps
  )
  return {
    registration,
  }
}
