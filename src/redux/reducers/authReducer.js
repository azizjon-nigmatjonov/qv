import { SET_AUTH_CREDENTIALS, CLEAR_ON_SIGNOUT, SET_ACCESS_TOKEN_ONE_ID } from '../constants'

const INITIAL_STATE = {
  roleName: '',
  userId: '',
  roleId: '',
  regionId: '',
  regionName: '',
  districtId: '',
  userTypeId: '',
  accessTokenOneId: null,
  accessToken: null,
  isRepublic: false,
  certificateCourses: '',
  organizationName: '',
  roleInObject: '',
  fullName: '',
}

export default function authReducer(state = INITIAL_STATE, { payload, type }) {
  switch (type) {
    case SET_AUTH_CREDENTIALS:
      return {
        ...state,
        roleName: payload?.role?.name,
        roleId: payload?.role?.id,
        userId: payload?.user?.id,
        userTypeId: payload?.user?.user_type_id,
        name: payload?.user?.name + ' ' + payload?.user?.middle_name,
        regionId: payload?.user?.region?.id,
        regionName: payload?.user?.region?.uz_name,
        districtId: payload?.user?.district?.id,
        accessToken: payload?.token?.access_token,
        isRepublic: payload?.role?.is_republic,
        certificateCourses: payload?.user?.certificate_courses,
        organizationName: payload?.user?.organization_name,
        roleInObject: payload?.user?.role_in_object,
        fullName: payload?.user?.surname + ' ' + payload?.user?.name + ' ' + payload?.user?.middle_name,
      }
    case SET_ACCESS_TOKEN_ONE_ID:
      return {
        ...state,
        accessTokenOneId: payload.access_token,
      }
    case CLEAR_ON_SIGNOUT:
      return INITIAL_STATE
    default:
      return state
  }
}
