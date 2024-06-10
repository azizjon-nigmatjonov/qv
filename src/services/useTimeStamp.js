import { useQuery } from 'react-query'
import { serviceActionTypes } from '../settings/constants'
import { request } from './http-client'

const getServertime = () => request.get(`${process.env.REACT_APP_BASE_URL_ADMIN}/time`).then((res) => res.data)

const defaultQueryProps = {
  enabled: false,
}

const useTimeStamp = ({ serverTimeProps = defaultQueryProps }) => {
  const serverTime = useQuery([serviceActionTypes.GET_SERVER_TIME], getServertime, serverTimeProps)
  return { serverTime }
}

export default useTimeStamp
