import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom'
import App from './App'

import './i18n'
import './index.css'
import { UserInfo } from './views/UserInfo'

ReactDOM.render(
  <BrowserRouter>
    <React.Fragment>
      <App />
    </React.Fragment>
  </BrowserRouter>,
  document.getElementById('root')
)
