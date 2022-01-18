import React from 'react'
import ReactDOM from 'react-dom'
import { Helmet } from 'react-helmet'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { runSagas } from './store/index'

const metaImage: string = `https://${
  process.env.VERCEL_URL ?? 'invariant.app'
}/favicon-192x192.png`

ReactDOM.render(
  <React.StrictMode>
    <Helmet>
      <meta property='og:image' content={metaImage} />
      <meta property='twitter:image' content={metaImage} />
    </Helmet>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
runSagas()
