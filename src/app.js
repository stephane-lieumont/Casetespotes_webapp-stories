import Header from './scripts/layout/header'
import Footer from './scripts/layout/footer'

import Loader from './scripts/components/loader'

import { getDataByUrl } from './scripts/app.utils'
import { router } from './scripts/routes/router'

/**
 * Initialize application
 */
const initApp = () => {
  const body = document.querySelector('body')
  const appContainer = document.querySelector('#app')

  body.prepend(Header.render())
  body.append(Footer.render())

  appContainer.appendChild(Loader.render())

  const timer = setTimeout(() => {
    Loader.destroyLoader()
    clearTimeout(timer)
    app()
  }, 2500)
}

/**
 * Refresh App DOM
 */
const app = async () => {
  // Get Data Profile
  const data = await getDataByUrl()

  // Route Paths
  router(data)
}

window.addEventListener('hashchange', app)
window.addEventListener('load', initApp)
