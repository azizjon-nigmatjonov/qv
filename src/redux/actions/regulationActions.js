import { CLEAR_REGULATION_DEADLINE_UPDATING, SET_REGULATION_DEADLINE_UPDATING } from '../constants'

export const setRegulationDeadlineUpdating = (payload) => ({
  type: SET_REGULATION_DEADLINE_UPDATING,
  payload,
})

export const clearRegulationDeadlineUpdating = (payload) => ({
  type: CLEAR_REGULATION_DEADLINE_UPDATING,
  payload,
})
