import React from 'react'
import { setConfig } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@material-ui/core'

import { store } from './store'
import { theme } from '@static/theme'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import Notifier from '@containers/Notifier/Notifier'
import PagesRouter from './pages/PagesRouter'
import Snackbar from '@components/Snackbar/Snackbar'
import { Helmet } from 'react-helmet'

setConfig({
  reloadHooks: false
})
const App: React.FC = () => {
  const persistor = persistStore(store)

  const metaImage: string = `https://${
    process.env.VITE_VERCEL_URL ?? 'invariant.app'
  }/favicon-192x192.png`

  return (
    <Provider store={store}>
      <Helmet>
        <meta property='og:image' content={metaImage} />
        <meta property='twitter:image' content={metaImage} />
      </Helmet>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <Snackbar maxSnack={99}>
            <Notifier />
            <PagesRouter />
          </Snackbar>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  )
}
export default App
