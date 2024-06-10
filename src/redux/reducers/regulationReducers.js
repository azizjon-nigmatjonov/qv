import { CLEAR_REGULATION_DEADLINE_UPDATING, SET_REGULATION_DEADLINE_UPDATING } from '../constants'

const INITIAL_STATE = {
  ids: [],
}

export default function regulationsReducer(state = INITIAL_STATE, { payload, type }) {
  switch (type) {
    case SET_REGULATION_DEADLINE_UPDATING:
      return {
        ...state,
        ids: [...state.ids, ...payload],
      }
    case CLEAR_REGULATION_DEADLINE_UPDATING:
      return {
        ...state,
        ids: state.ids.filter((i) => i !== payload),
      }
    default:
      return state
  }
}
