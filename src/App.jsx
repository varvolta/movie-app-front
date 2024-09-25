import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import store from './store'
import Router from './Router'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <Provider store={store}>
      <Router />
      <Toaster />
    </Provider>
  )
}

export default App
