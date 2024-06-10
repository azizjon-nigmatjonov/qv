import { CLEAR_ON_SIGNOUT, SET_ACCESS_TOKEN_ONE_ID, SET_AUTH_CREDENTIALS } from '../constants'

export const logout = () => ({
  type: CLEAR_ON_SIGNOUT,
})

export const setAuthCredentials = (payload) => ({
  type: SET_AUTH_CREDENTIALS,
  payload,
})

export const setAccessTokenOneId = (payload) => ({
  type: SET_ACCESS_TOKEN_ONE_ID,
  payload,
})
