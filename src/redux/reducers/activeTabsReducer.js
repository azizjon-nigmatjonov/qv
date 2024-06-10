import { SET_ACTIVE_TAB } from "../constants"

const INITIAL_STATE = {
  registrationPageTab: 0,
  historyPageTab: 0,
}

export default function activeTabsReducer(state = INITIAL_STATE, { payload, type }) {
  switch (type) {
    case SET_ACTIVE_TAB:
      return {
        ...state,
        [payload.tabName]: payload.value,
      }
    default:
      return state
  }
}
