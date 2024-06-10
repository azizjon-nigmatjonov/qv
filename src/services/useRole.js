import { useMutation, useQuery } from 'react-query'
import { serviceActionTypes } from '../settings/constants'
import { AuthUrl, request } from './http-client'

const getRoles = (params) => request.get(`${AuthUrl}/role`, { params }).then((res) => res.data.data)
const getRole = ({ id }) => request.get(`${AuthUrl}/role/${id}`).then((res) => res.data.data)
const createRole = (data) => request.post(`${AuthUrl}/role`, data)
const updateRole = (data) => request.put(`${AuthUrl}/role`, data)
const deleteRole = ({ id }) => request.delete(`${AuthUrl}/role/${id}`)

export const useRole = ({
  id,
  client_type_id,
  offset,
  limit,
  createRoleProps,
  updateRoleProps,
  deleteRoleProps,
} = {}) => {
  const roles = useQuery(
    [serviceActionTypes.GET_ROLES, id, client_type_id, offset, limit],
    () => getRoles({ 'client-type-id': client_type_id, offset, limit }),
    { enabled: !!id || !!client_type_id || !!offset }
  )
  const role = useQuery([serviceActionTypes.getRole, id], () => getRole({ id }), {
    enabled: !!id,
  })

  const createRoleMutation = useMutation(createRole, createRoleProps)
  const updateRoleMutation = useMutation(updateRole, updateRoleProps)
  const deleteRoleMutation = useMutation(deleteRole, deleteRoleProps)

  return {
    role,
    roles,
    createRoleMutation,
    updateRoleMutation,
    deleteRoleMutation,
  }
}
