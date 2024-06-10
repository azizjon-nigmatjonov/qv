import { useQuery } from 'react-query'
import { serviceActionTypes } from '../settings/constants'
import { request } from './http-client'

// const getRegistrationListCount = (params) => request.get('/registration-counts', {params}).then((res) => res.data)

const defaultQueryProps = {
  enabled: false,
}

const useCount = ({ region_id, registrationListCountProps = defaultQueryProps }) => {
  const registrationListCount = useQuery(
    [serviceActionTypes.GET_REGISTRATION_COUNT],
    () => {},
    // () => getRegistrationListCount({ region_id }),
    registrationListCountProps
  )
  return { registrationListCount }
}

export default useCount
