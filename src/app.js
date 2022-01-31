import Header from './scripts/layout/header'
import Footer from './scripts/layout/footer'

import Loader from './scripts/components/loader'

import { getDataByUrl } from './scripts/app.utils'
import { router } from './scripts/routes/router'

let data

/**
 * Initialize application
 */
const initApp = async () => {
  const $app = document.querySelector('#app')

  $app.prepend(Header.render())
  $app.appendChild(document.createElement('main'))
  $app.appendChild(Loader.render())
  $app.appendChild(Footer.render())
  data = await getDataByUrl()

  const timer = setTimeout(() => {
    Loader.destroyLoader()
    clearTimeout(timer)
    app()
  }, 2500)
}

/**
 * Refresh App DOM
 */
const app = () => {
  // Route Paths
  router(data)
}

window.addEventListener('hashchange', app)
window.addEventListener('load', initApp)
