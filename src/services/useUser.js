import { useMutation, useQuery } from 'react-query'
import { defaultProps } from 'react-quill'
import { serviceActionTypes } from '../settings/constants'
import { AuthUrl, request } from './http-client'

const getUser = (id) => request.get(`${AuthUrl}/user/${id}`).then((res) => res.data.data)
const getRotation = (id) => request.get(`${AuthUrl}/rotation`).then((res) => res.data.data)

const getUserLogs = (params) => request.get(`${AuthUrl}/user/dismissal`, { params }).then((res) => res.data.data)

const getCompanies = (params) => request.get(`${AuthUrl}/company`, { params }).then((res) => res.data.data)

const getUserRoleLogs = (params) => request.get(`${AuthUrl}/user/role-log`, { params }).then((res) => res.data.data)

const getUserDiplomLogs = (params) =>
  request.get(`${AuthUrl}/user/diplom-logs`, { params }).then((res) => res.data.data)

const getUsers = (params) => request.get(`${AuthUrl}/user`, { params }).then((res) => res.data?.data)

const createUser = (data) => request.post(`${AuthUrl}/user`, data).then((res) => res.data.data)

const updateUserPassword = (data) => request.put(`${AuthUrl}/forget-password`, data)

const getUserStatuses = () => request.get(`${AuthUrl}/user/status`).then((res) => res.data.data)

const getManagers = (params) => request.get(`${AuthUrl}/user/role-control`, { params }).then((res) => res.data.data)

const getUserStatusesLog = (params) =>
  request.get(`${AuthUrl}/user/status-log`, { params }).then((res) => res.data.data)

const updateUser = (data) => request.put(`${AuthUrl}/user`, data)
const userCreateCode = ({ phone }) => request.post(`${AuthUrl}/create-code?phone=${phone}`).then((res) => res.data)
const userPhoneVerification = (data) => request.post(`${AuthUrl}/phone-verification`, data)

const updateUserStatus = (data) => request.put(`${AuthUrl}/user/status`, data)

const updateUserDismissal = (data) => request.put(`${AuthUrl}/user/dismissal`, data)

const updateUserRole = (data) => request.put(`${AuthUrl}/user/role`, data)

const updateUserActivated = (data) => request.put(`${AuthUrl}/user/activated`, data)

const updateUserDiplom = (data) => request.put(`${AuthUrl}/user/diplom`, data)
const deleteUserPhoto = ({ id }) => request.delete(`${AuthUrl}/user-photo/${id}`)
const getUserByPassport = (params) =>
  request.get(`${AuthUrl}/user-by-passport`, { params }).then((res) => res.data.data)
const checkUserByPassport = (params) =>
  request.get(`${AuthUrl}/user-by-passport`, { params }).then((res) => res.data.data)
const checkUserVerification = (params) =>
  request.get(`${AuthUrl}/verification-user`, { params }).then((res) => res.data)
const deleteUser = (data) => request.post(`${AuthUrl}/logout`, data)

const checkUserPin = (pin) => request.get(`${AuthUrl}/user/pinfl?pinfl=${pin}`)

const registrationUsers = (data) => request.post('registration/users', data)

const defaultQueryProps = {
  enabled: false,
}

export const useUser = ({
  shouldRequestLog = false,
  shouldRequestLogRole = false,
  shouldRequestLogUser = false,
  id,
  pin,
  region_id,
  district_id,
  passport_number,
  verification_passport = '',
  phone,
  user_type_id = undefined,
  usersProps = defaultQueryProps,
  rotationProps = defaultQueryProps,
  userByPassportProps = defaultQueryProps,
  checkUserByPassportProps = defaultQueryProps,
  checkUserVerificationProps = defaultQueryProps,
  role_id,
  offset,
  userCreateCodeProps,
  updateUserPasswordMutationProps,
  userPhoneVerificationProps,
  managersProps = defaultQueryProps,
  userStatusesProps = defaultQueryProps,
  updateUserStatusMutationProps,
  limit,
  search,
  companyProps = {},
  client_type_id,
  statusId,
  deleteUserProps,
  createMutationProps,
  deleteUserPhotoProps,
  shouldUserDiplomLogs,
  checkUserPinProps = defaultQueryProps,
  registrationUsersProps = defaultProps,
} = {}) => {
  const user = useQuery([serviceActionTypes.GET_USER, id], () => getUser(id), {
    enabled: !!id,
  })
  const rotation = useQuery([serviceActionTypes.GET_ROTATION], () => getRotation(), rotationProps)
  const userLogs = useQuery(
    [serviceActionTypes.GET_USER_LOGS, id, offset, limit],
    () => getUserLogs({ employee_id: id, offset, limit }),
    {
      enabled: shouldRequestLogUser,
    }
  )
  const companies = {}
  // useQuery([serviceActionTypes.GET_COMPANIES, companyProps], () => getCompanies({ companyProps }), {
  //   enabled: !!companyProps.region_id,
  // })
  const userRoleLogs = useQuery(
    [serviceActionTypes.GET_USER_ROLE_LOGS, id, offset, limit],
    () => getUserRoleLogs({ employee_id: id, offset, limit }),
    {
      enabled: shouldRequestLogRole,
    }
  )
  const userStatusLogs = useQuery(
    [serviceActionTypes.GET_USER_STATUS_LOGS, id, offset, limit],
    () => getUserStatusesLog({ employee_id: id, offset, limit }),
    {
      enabled: shouldRequestLog,
    }
  )
  const userDiplomLogs = useQuery(
    [serviceActionTypes.GET_USER_DIPLOM_LOGS, id, offset, limit],
    () => getUserDiplomLogs({ employee_id: id, offset, limit }),
    {
      enabled: shouldUserDiplomLogs,
    }
  )
  const userByPassport = useQuery(
    [serviceActionTypes.USER_BY_PASSPORT_NAME],
    () => getUserByPassport({ 'passport-number': passport_number }),
    userByPassportProps
  )
  const userCheckByPassport = useQuery(
    [serviceActionTypes.CHECK_USER_BY_PASSPORT_NAME],
    () => checkUserByPassport({ 'passport-number': passport_number }),
    checkUserByPassportProps
  )
  const userCheckUserVerification = useQuery(
    [serviceActionTypes.CHECK_USER_VERIFICATION, verification_passport, phone],
    () => checkUserVerification({ passport_number: verification_passport, phone: `+998${phone}` }),
    checkUserVerificationProps
  )
  const checkUserPinQuery = useQuery(
    [serviceActionTypes.CHECK_USER_PIN, pin],
    () => checkUserPin(pin),
    checkUserPinProps
  )

  const users = useQuery(
    [serviceActionTypes.GET_USERS, offset, limit, search, role_id, statusId, region_id, client_type_id, user_type_id],
    () =>
      getUsers({
        offset,
        limit,
        search,
        user_type_id,
        'status-id': statusId,
        'role-id': Array.isArray(role_id) ? role_id.join(',') : role_id,
        'region-id': region_id,
        'district-id': district_id,
        'client-type-id': Array.isArray(client_type_id) ? client_type_id.join(',') : client_type_id,
      }),
    usersProps
  )
  const managers = useQuery(
    [serviceActionTypes.GET_MANAGERS, offset, limit, region_id, role_id, search],
    () =>
      getManagers({
        offset,
        limit,
        'region-id': region_id,
        search,
        role_ids: Array.isArray(role_id) ? role_id.join(',') : role_id,
      }),
    managersProps
  )
  const userStatuses = useQuery([serviceActionTypes.GET_USER_STATUSES, id], () => getUserStatuses(), userStatusesProps)
  
  const registrationUsersMutation = useMutation(registrationUsers, registrationUsersProps)
  const createMutation = useMutation(createUser, createMutationProps)
  const updateUserPasswordMutation = useMutation(updateUserPassword, updateUserPasswordMutationProps)
  const updateUserMutation = useMutation(updateUser, createMutationProps)
  const updateUserStatusMutation = useMutation(updateUserStatus, updateUserStatusMutationProps)
  const updateUserDismissalMutation = useMutation(updateUserDismissal, createMutationProps)
  const updateUserRoleMutation = useMutation(updateUserRole, createMutationProps)
  const updateUserActivatedMutation = useMutation(updateUserActivated, createMutationProps)
  const updateUserDiplomMutation = useMutation(updateUserDiplom, createMutationProps)
  const deleteUserPhotoMutation = useMutation(deleteUserPhoto, deleteUserPhotoProps)
  const deleteUserMutation = useMutation(deleteUser, deleteUserProps)
  const userCreateCodeMutation = useMutation(userCreateCode, userCreateCodeProps)
  const userPhoneVerificationMutation = useMutation(userPhoneVerification, userPhoneVerificationProps)

  return {
    user,
    users,
    rotation,
    managers,
    companies,
    userLogs,
    userRoleLogs,
    userStatuses,
    createMutation,
    userDiplomLogs,
    userByPassport,
    userStatusLogs,
    deleteUserMutation,
    updateUserMutation,
    updateUserRoleMutation,
    userCreateCodeMutation,
    deleteUserPhotoMutation,
    updateUserDiplomMutation,
    updateUserStatusMutation,
    updateUserActivatedMutation,
    updateUserDismissalMutation,
    userPhoneVerificationMutation,
    userCheckByPassport,
    updateUserPasswordMutation,
    userCheckUserVerification,
    checkUserPinQuery,
    registrationUsersMutation
  }
}
