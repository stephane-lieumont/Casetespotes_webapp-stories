import Header from '../layout/header'

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
    path: '/invitation-incorrecte',
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
 * Redirect to other routes
 * @param {ObjectJSON} data
 */
export const router = async (data) => {
  // Find the component based on the current path
  const path = parseLocation()

  // If there is not matching route, get the "Error404" Component || If there mistake on token, get the "ErrorLink" Component
  const { component = Error404 } = data ? getComponentByPath(path, routes) || {} : { component: ErrorLink }

  // Get routes parameters
  applyParams(component.params)

  // Render the component in the app placeholder
  const oldHeigthContainer = document.querySelector('#app main').clientHeight + 'px'
  document.querySelector('#app').replaceChild(await component.render(data), document.querySelector('#app main'))

  // Transition heigth main component
  const newHeigthContainer = document.querySelector('#app main').clientHeight + 'px'
  document.querySelector('#app main').style.height = oldHeigthContainer
  setTimeout(() => {
    document.querySelector('#app main').style.height = newHeigthContainer
  }, 100)
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
  if (params && params.headerLogoLow !== undefined) Header.logoLow(params.headerLogoLow)
}

const constructComponents = (routes) => {
  routes.forEach(route => {
    route.component.name = route.pathName
    route.component.params = route.params
    route.component.path = route.path
  })
}

// add name and parameters to Object component
constructComponents(routes)
