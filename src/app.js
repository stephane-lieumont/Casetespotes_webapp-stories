import Header from './scripts/layout/Header'
import Footer from './scripts/layout/Footer'

import Avatar from './scripts/components/Avatar'
import Loader from './scripts/components/Loader'

import { router } from './scripts/routes/router'
import Api from './scripts/api/Api.class'
import { conf } from './scripts/app.conf'
import Demo from './scripts/components/Demo'

/** ADD FAVICON ON HEADER PAGE */
require('./assets/favicon/apple-touch-icon.png')
require('./assets/favicon/favicon-16x16.png')
require('./assets/favicon/favicon-32x32.png')

export let apiPublic
export let data

/**
 * Initialize application
 */
const initApp = async () => {
  const $body = document.querySelector('body')
  const $app = document.querySelector('#app')

  if (conf.demo) $body.prepend(Demo.render())

  $app.prepend(Header.render())
  $app.appendChild(document.createElement('main'))
  $app.appendChild(Loader.render())
  $app.appendChild(Footer.render())

  const url = new URL(window.location.href)
  const token = url.searchParams.get('token')
  const singleId = url.searchParams.get('singleId')
  apiPublic = new Api(singleId, token)

  if (conf.demo) {
    data = await apiPublic.getStoryMock()
  } else {
    try {
      data = await apiPublic.getStory()
    } catch (error) {
      data = null
    }
  }

  const timer = setTimeout(() => {
    Avatar.createAvatarSingle(data, () => {
      document.querySelector('.animation-loader').remove()
      app(apiPublic)
      clearTimeout(timer)
    })
  }, 2500)
}

/**
 * Refresh App DOM
 */
const app = () => {
  // Route Paths
  router()
}

window.addEventListener('hashchange', app)
window.addEventListener('load', initApp)
