import { useQuery } from 'react-query'
import { serviceActionTypes } from '../settings/constants'
import { AuthUrl, request } from './http-client'

const getClients = (params) => request.get(`${AuthUrl}/client-type`, { params }).then((res) => res.data.data)
const getClient = ({ id }) => request.get(`${AuthUrl}/client-type/${id}`).then((res) => res.data.data)

export const useClient = ({ limit, clientsProps, id, is_super_admin, user_type_id = undefined } = {}) => {
  const clients = useQuery(
    [serviceActionTypes.GET_CLIENTS, limit, user_type_id, is_super_admin],
    () => getClients({ limit, user_type_id, is_super_admin }),
    clientsProps
  )
  const client = useQuery([serviceActionTypes.GET_CLIENT, id], () => getClient({ id }), { enabled: !!id })

  return {
    client,
    clients,
  }
}
