import { useMutation, useQuery } from 'react-query'
import { serviceActionTypes } from '../settings/constants'
import { request } from './http-client'

const getAcceptances = (params) => request.get('/acceptance', { params }).then((res) => res.data.data)
const getAcceptance = (id) => request.get(`/acceptance/${id}`).then((res) => res.data.data)
const updateOrganization = (data) => request.patch(`/organizations-actions`, data)
const updateAcceptance = (data) => request.patch(`/acceptance`, data)
const sendToOrganization = (data) => request.post(`/organizations-actions`, data)
const getOrganizations = (params) =>
  request
    .get('/organizations-actions', { params: { acceptance_id: params.id, user_id: params.user_id } })
    .then((res) => res.data.data)

const defaultQueryProps = {
  enabled: false,
}

export default function useAcceptance({
  offset,
  user_id,
  limit,
  search,
  id,
  updateAcceptanceProps,
  organizationsProps = defaultQueryProps,
  acceptancesProps = defaultQueryProps,
  updateOrganizationProps,
  sendToOrganizationProps,
}) {
  const acceptances = useQuery(
    [serviceActionTypes.GET_ACCEPTANCES, offset, search],
    () => getAcceptances({ limit, offset, search }),
    acceptancesProps
  )
  const acceptance = useQuery([serviceActionTypes.GET_ACCEPTANCE, id], () => getAcceptance(id), {
    enabled: !!id,
  })
  const updateOrganizationMutation = useMutation(updateOrganization, updateOrganizationProps)
  const updateAcceptanceMutation = useMutation(updateAcceptance, updateAcceptanceProps)
  const sendToOrganizationMutation = useMutation(sendToOrganization, sendToOrganizationProps)
  const organizations = useQuery(
    [serviceActionTypes.GET_ORGANIZATIONS, id],
    () => getOrganizations({ id, user_id }),
    organizationsProps
  )

  return {
    acceptances,
    acceptance,
    updateOrganizationMutation,
    updateAcceptanceMutation,
    organizations,
    sendToOrganizationMutation,
  }
}
