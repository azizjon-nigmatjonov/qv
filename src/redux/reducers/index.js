import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import { combineReducers } from 'redux'

import authReducer from './authReducer'
import regulationsReducer from './regulationReducers'
// import paginationReducer from './paginationReducer'
import activeTabsReducer from './activeTabsReducer'
import countReducer from './countsReducer'

const authPersistConfig = {
  key: 'auth',
  storage,
}
const regulationPersistConfig = {
  key: 'regulation',
  storage,
}
const activeTabsPersistConfig = {
  key: 'activeTabs',
  storage,
}
// const paginationPersistConfig = {
//   key: 'pagination',
//   storage,
// }

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  regulation: persistReducer(regulationPersistConfig, regulationsReducer),
  // pagination: persistReducer(paginationPersistConfig, paginationReducer),
  activeTabs: persistReducer(activeTabsPersistConfig, activeTabsReducer),
  counts: countReducer,
})

export default rootReducer
