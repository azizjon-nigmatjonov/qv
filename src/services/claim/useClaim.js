import { useMutation, useQuery } from 'react-query'
import { serviceActionTypes } from '../../settings/constants'
import { request } from '../http-client'

const getClaimsList = (params) => request.get('/claim', { params }).then((res) => res.data)

const getClaimById = (id) => request.get(`/claim/${id}`).then((res) => res.data)
const getClaimCheckList = (id) => request.get(`/claim/monitoring/${id}`).then((res) => res.data)

const getClaimOrganizationActions = (params) => request.get('/organization-action', { params }).then((res) => res.data)

const sendToMinistry = (data) => request.post('/claim/minstroy', data)
const sendToGasn = (data) => request.post('/claim/gasn', data)
const setClaimObjectPost = (data) => request.post('/claim/object', data)
const setClaimOrgActions = (data) => request.post('/claim/organization-actions', data)
const claimOrgActionComment = (data) => request.post('/claim/org-comment', data)
const claimOrgAction = (data) => request.put('/claim-org-action', data)

const patchClaimInspectionFile = (data) => request.patch('/claim/inspection', data)
const putClaimStatus = (data) => request.put('/claim-status', data)
const putClaimStatusOperator = (data) => request.put('/claim/status', data)

const getClaimOrganizations = (params) => request.get('/organization-review', { params }).then((res) => res.data)

export const useClaim = ({
  limit,
  offset,
  statuses,
  user_id,
  is_archive,
  is_inspection_boss,
  getClaimsListQueryParams,
  getClaimsListQueryProps = { enabled: false },
  getClaimByIdQueryProps = { enabled: false },
  id,
  sendToMinistryMutationProps,
  sendToGasnMutationProps,
  setClaimObjectProps,
  getClaimOrganizationsParams,
  getClaimOrganizationsProps = { enabled: false },
  getClaimOrganizationActionsProps = { enabled: false },
  setClaimOrgActionsProps,
  claimOrgActionsProps,
  getClaimCheckListParams,
  getClaimCheckListProps = { enabled: false },
  putClaimStatusProps,
  putClaimStatusOperatorMutationProps,
  patchClaimInspectionFileMutationProps,
  postClaimOrgCommentMutationProps,
}) => {
  const getClaimsListQuery = useQuery(
    [serviceActionTypes.GET_CLAIM_LIST, getClaimsListQueryParams],
    () => getClaimsList({ ...getClaimsListQueryParams, limit, offset, is_inspection_boss }),
    getClaimsListQueryProps
  )

  const getClaimByIdQuery = useQuery(
    [serviceActionTypes.GET_CLAIM_BY_ID, id],
    () => getClaimById(id),
    getClaimByIdQueryProps
  )

  const getClaimOrganizationsQuery = useQuery(
    [serviceActionTypes.GET_CLAIM_ORGANIZATIONS, getClaimOrganizationsParams],
    () => getClaimOrganizations(getClaimOrganizationsParams),
    getClaimOrganizationsProps
  )
  const getClaimOrganizationActionsQuery = useQuery(
    [serviceActionTypes.GET_CLAIM_ORGANIZATION_ACTIONS, limit, offset, user_id, is_archive],
    () => getClaimOrganizationActions({ limit, offset, user_id, is_archive }),
    getClaimOrganizationActionsProps
  )

  const getClaimCheckListQuery = useQuery(
    [serviceActionTypes.GET_CLAIM_CHECKLIST, getClaimCheckListParams],
    () => getClaimCheckList(getClaimCheckListParams.id),
    getClaimCheckListProps
  )

  const sendToMinistryMutation = useMutation(sendToMinistry, sendToMinistryMutationProps)
  const sendToGasnMutation = useMutation(sendToGasn, sendToGasnMutationProps)
  const setClaimObject = useMutation(setClaimObjectPost, setClaimObjectProps)
  const setClaimOrgActionsMutation = useMutation(setClaimOrgActions, setClaimOrgActionsProps)
  const claimOrgActionsMutation = useMutation(claimOrgAction, claimOrgActionsProps)
  const putClaimStatusMutation = useMutation(putClaimStatus, putClaimStatusProps)
  const putClaimStatusOperatorMutation = useMutation(putClaimStatusOperator, putClaimStatusOperatorMutationProps)
  const patchClaimInspectionFileMutation = useMutation(patchClaimInspectionFile, patchClaimInspectionFileMutationProps)
  const postClaimOrgCommentMutation = useMutation(claimOrgActionComment, postClaimOrgCommentMutationProps)

  return {
    getClaimsListQuery,
    getClaimByIdQuery,
    sendToMinistryMutation,
    sendToGasnMutation,
    getClaimOrganizationsQuery,
    setClaimObject,
    setClaimOrgActionsMutation,
    getClaimOrganizationActionsQuery,
    claimOrgActionsMutation,
    getClaimCheckListQuery,
    putClaimStatusMutation,
    putClaimStatusOperatorMutation,
    patchClaimInspectionFileMutation,
    postClaimOrgCommentMutation,
  }
}
