import { SET_TAB_COUNTS } from '../constants'

const INITIAL_STATE = {
  registrationPageTabCount: [
    {
      key: 0,
      count: 0,
    },
    {
      key: 1,
      count: 0,
    },
  ],
  historyPageTabCount: [
    {
      key: 0,
      count: 0,
    },
    {
      key: 1,
      count: 0,
    },
  ],
}

export default function countReducer(state = INITIAL_STATE, { payload, type }) {
  switch (type) {
    case SET_TAB_COUNTS:
      // let tabCount = payload.value.map((item) => {
      //   return {
      //     key: item.key,
      //     count: item.count,
      //   }
      // })
      return {
        ...state,
        [payload.tabName]: payload.value,
      }
    default:
      return state
  }
}
