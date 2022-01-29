import Header from '../layout/header'
import Footer from '../layout/footer'

import EditTestimony from '../pages/editTestimony'
import Error404 from '../pages/error404'
import ErrorLink from '../pages/errorLink'
import Home from '../pages/home'
import Thanks from '../pages/thanks'

export const routes = [
  {
    path: '/',
    pathName: 'home',
    component: Home,
    params: {
      headerLogoLow: false
    }
  },
  {
    path: '/error-link',
    pathName: 'error',
    component: ErrorLink,
    params: {
      headerLogoLow: false
    }
  },
  {
    path: '/accueil',
    pathName: 'home',
    component: Home,
    params: {
      headerLogoLow: false
    }
  },
  {
    path: '/edition-temoignage',
    pathName: 'edit-testimony',
    component: EditTestimony,
    params: {
      headerLogoLow: true
    }
  },
  {
    path: '/temoignage-enregistre',
    pathName: 'thanks',
    component: Thanks,
    params: {
      headerLogoLow: false
    }
  }
]

/**
 * Initialize application
 */
export const initApp = () => {
  const body = document.querySelector('body')

  body.prepend(Header.render())
  body.append(Footer.render())
}

/**
 * Redirect to other routes
 * @param {ObjectJSON} data
 */
export const router = async (data) => {
  // Find the component based on the current path
  const path = parseLocation()

  console.log(path)

  // Get routes parameters
  const params = getRouteParams(path, routes)
  applyParams(params)

  // If there is not matching route, get the "Error404" Component || If there mistake on token, get the "ErrorLink" Component
  const { component = Error404 } = data ? getComponentByPath(path, routes) || {} : { component: ErrorLink }

  // Render the component in the app placeholder
  document.querySelector('#app').innerHTML = ''
  document.querySelector('#app').append(await component.render(data))
}

/**
 * Get route by pathName
 * @param {String} pathName
 * @returns {String}
 */
export const getRoute = (pathName) => {
  const matchRoute = routes.find(route => route.pathName === pathName)
  return matchRoute ? '#' + matchRoute.path : undefined
}

/**
 * Get Routes Params
 * @param {String} path
 * @param {Object} routes
 * @returns {Object}
 */
const getRouteParams = (path, routes) => {
  const result = routes.find(r => r.path.match(new RegExp(`^\\${path}$`, 'gm')))
  return result ? result.params : undefined
}

/**
 * Get Component by Path
 * @param {String} path
 * @param {Object} routes
 * @returns {Object}
 */
const getComponentByPath = (path, routes) => routes.find(r => r.path.match(new RegExp(`^\\${path}$`, 'gm'))) || undefined

/**
 * Get path from location
 * @returns {String}
 */
const parseLocation = () => location.hash.slice(1).toLocaleLowerCase() || '/'

/**
 * Apply params of routes
 * @param {Object} params
 */
const applyParams = (params) => {
  if (params.headerLogoLow !== undefined) Header.logoLow(params.headerLogoLow)
}
