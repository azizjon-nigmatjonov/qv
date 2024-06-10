import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import { QueryClientProvider } from 'react-query'
import { PersistGate } from 'redux-persist/integration/react'

import Routes from './routes'
import Main from './layouts/Main'
import { persistor, store } from './redux/store'
import { queryClient } from './services/http-client'

import './App.scss'
import 'mapbox-gl/dist/mapbox-gl.css'
import '../node_modules/@zach.codes/react-calendar/dist/calendar-tailwind.css'
import useWindowSize from './hooks/useWindowSize'
import MobileMain from './layouts/MobileMain'
import { useLocation } from 'react-router-dom'
import { UserInfo } from './views/UserInfo'

function App() {
  const { width } = useWindowSize()
  const { pathname } = useLocation()
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          {pathname.includes('user-info') ? (
            <UserInfo />
          ) : width < 769 ? (
            <MobileMain>
              <Routes />
            </MobileMain>
          ) : (
            <Main>
              <Routes />
            </Main>
          )}
          <Toaster position="top-center" reverseOrder={false} />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
